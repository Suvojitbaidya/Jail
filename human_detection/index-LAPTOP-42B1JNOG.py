import cv2
import os
import threading
import time
from datetime import datetime
import requests
from dotenv import load_dotenv

from human_counting.human_counting import detect_and_mark_humans
from height_calculation.hight import process_image
from pose_estimation.pose_detection import detect_bending_in_frame

# === CONFIGURATION ===
FRAME_PERIOD = 15.0        # seconds, capture 1 frame per camera every 15s
OUTPUT_FOLDER = "ToBeProcess"
FETCH_INTERVAL_SECONDS = 50  # how often to refresh camera list from API

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# === ENVIRONMENT ===
load_dotenv()
url = os.getenv("API_URL")

# Shared camera list
camera_list = []
camera_lock = threading.Lock()

# Track camera threads
camera_threads = {}
stop_flags = {}

# === Capture a single frame and run tasks ===
def capture_frame(id, stream_url, camera_name, input_height, alert_threshold, location):
    try:
        cap = cv2.VideoCapture(stream_url)

        if not cap.isOpened():
            print(f"[ERROR] Cannot open stream for {camera_name}")
            return

        success, frame = cap.read()
        if success:
            current_date = datetime.now().strftime("%Y-%m-%d")
            date_folder = os.path.join(OUTPUT_FOLDER, current_date)
            os.makedirs(date_folder, exist_ok=True)

            current_time = datetime.now().strftime("%d%m%Y_%H%M%S")
            image_name = f"{camera_name}_{current_time}.jpg"
            image_path = os.path.join(date_folder, image_name)
            cv2.imwrite(image_path, frame)

            # === Run tasks in parallel ===
            tasks = []

            # Human Counting
            t1 = threading.Thread(
                target=detect_and_mark_humans,
                args=(id, frame.copy(), camera_name, alert_threshold)
            )
            tasks.append(t1)

            # Height Calculation (only for "wallside")
            if location == "wallside":
                t2 = threading.Thread(
                    target=process_image,
                    args=(id, image_path, input_height, camera_name)
                )
                tasks.append(t2)

            # Pose Estimation
            t3 = threading.Thread(
                target=detect_bending_in_frame,
                args=(image_path, camera_name, id)
            )
            tasks.append(t3)

            # Start all threads
            for t in tasks:
                t.start()

            # Wait for all to finish
            for t in tasks:
                t.join()

            # os.remove(image_path)  # cleanup after processing
        else:
            print(f"[ERROR] Could not read frame for {camera_name}")

        cap.release()

    except Exception as e:
        print(f"[EXCEPTION] Error processing {camera_name}: {e}")


# === Per-camera worker thread ===
def camera_worker(cam):
    cam_id = cam["id"]
    name = cam.get("name", f"camera_{cam_id}")
    stream_url = cam.get("cameraUrl")
    input_height = cam.get("heightThreshold")
    alert = cam.get("alertThreshold")
    location = cam.get("location")

    while not stop_flags[cam_id]:
        start_time = time.time()

        if stream_url:
            capture_frame(cam_id, stream_url, name, input_height, alert, location)

        elapsed = time.time() - start_time
        sleep_time = max(0.0, FRAME_PERIOD - elapsed)
        time.sleep(sleep_time)


# === Camera thread manager ===
def reconcile_camera_threads():
    with camera_lock:
        current_ids = {c["id"] for c in camera_list if c.get("cameraUrl")}
        existing_ids = set(camera_threads.keys())

        # Start new threads
        for cam in camera_list:
            cam_id = cam.get("id")
            if cam.get("cameraUrl") and cam_id not in existing_ids:
                print(f"[THREAD] Starting worker for camera {cam['name']}")
                stop_flags[cam_id] = False
                t = threading.Thread(target=camera_worker, args=(cam,), daemon=True)
                camera_threads[cam_id] = t
                t.start()

        # Stop threads for removed cameras
        for cam_id in existing_ids - current_ids:
            print(f"[THREAD] Stopping worker for camera {cam_id}")
            stop_flags[cam_id] = True
            camera_threads.pop(cam_id, None)


# === Background thread to update camera list from API ===
def update_camera_list_periodically():
    global camera_list
    while True:
        try:
            response = requests.get(url)
            data = response.json().get("data", [])

            with camera_lock:
                camera_list = data
            print(f"[API] Fetched {len(data)} cameras from API.")

            # Reconcile threads with updated camera list
            reconcile_camera_threads()

        except Exception as e:
            print(f"[API ERROR] Failed to fetch camera list: {e}")

        time.sleep(FETCH_INTERVAL_SECONDS)


# # === Main ===
# if __name__ == "__main__":
#     # Start API updater thread
#     api_thread = threading.Thread(target=update_camera_list_periodically, daemon=True)
#     api_thread.start()

#     print("[SYSTEM] Camera processing started. Each camera will capture 1 frame every 15 seconds.")

#     # Keep the main thread alive
#     while True:
#         time.sleep(60)
