import cv2
import os
import threading
import time
from datetime import datetime,timedelta
import yt_dlp
import requests
from dotenv import load_dotenv

from human_counting.human_counting import detect_and_mark_humans
from height_calculation.hight import process_image
from pose_estimation.pose_detection import detect_bending_in_frame

# Load environment variables
load_dotenv()
url = os.getenv("API_URL")

lock = threading.Lock()

# === CONFIGURABLE PARAMETERS ===
FETCH_INTERVAL_SECONDS = 50  # Fetch API every 50 seconds
RUN_DURATION_MINUTES = 10
CAPTURE_DELAY = 2
CYCLE_DELAY = 41
OUTPUT_FOLDER = "ToBeProcess"

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Shared camera list and lock
camera_list = []
camera_lock = threading.Lock()

# === Fetch stream URL using yt-dlp ===
# def get_youtube_stream_url(youtube_link):
#     ydl_opts = {
#         "format": "best",
#         "quiet": True,
#     }
#     with yt_dlp.YoutubeDL(ydl_opts) as ydl:
#         info_dict = ydl.extract_info(youtube_link, download=False)
#         return info_dict["url"]

# === Capture a single frame and run tasks concurrently ===
def capture_frame(id, youtube_link, camera_name, timestamp, input_height, alert_threshold, location):
    with lock:
        try:
            # stream_url = get_youtube_stream_url(youtube_link)
            cap = cv2.VideoCapture(youtube_link)

            if not cap.isOpened():
                print(f"Error: Cannot open stream for {youtube_link}")
                return

            cap.set(cv2.CAP_PROP_POS_MSEC, timestamp * 1000)
            success, frame = cap.read()

            if success:
                current_date = datetime.now().strftime("%Y-%m-%d")
                date_folder = os.path.join(OUTPUT_FOLDER, current_date)
                os.makedirs(date_folder, exist_ok=True)

                current_time = datetime.now().strftime("%d%m%Y_%H%M%S")
                image_name = f"{camera_name}_{current_time}.jpg"
                image_path = os.path.join(date_folder, image_name)
                cv2.imwrite(image_path, frame)

                # === Run the 3 main tasks concurrently ===
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

                os.remove(image_path)  # Clean up the image after processing
            else:
                print(f"Error: Could not read frame for {camera_name}")
            cap.release()

        except Exception as e:
            print(f"Error processing {camera_name}: {e}")

# === Background thread to update camera list ===
def update_camera_list_periodically():
    global camera_list
    while True:
        try:
            response = requests.get(url)
            data = response.json().get("data", [])

            with camera_lock:
                camera_list = data
            print(f"[API] Fetched {len(data)} cameras from API.")
        except Exception as e:
            print(f"[API ERROR] Failed to fetch camera list: {e}")
        time.sleep(FETCH_INTERVAL_SECONDS)

# === Main processing loop ===
def process_videos():
    camera_last_reset = {}
    threads =[]
    while True:
        with camera_lock:
            cameras = list(camera_list)  # Thread-safe copy

        current_time = datetime.now()

        for camera in cameras:
            youtube_link = camera.get("cameraUrl")
            camera_name = camera.get("name")
            input_height = camera.get("heightThreshold")
            alert_threshold = camera.get("alertThreshold")
            location = camera.get("location")
            id = camera.get("id")

            if not youtube_link:
                continue

            last_reset_time = camera_last_reset.get(camera_name)
            if last_reset_time is None or (current_time - last_reset_time).seconds >= 300:
                camera_last_reset[camera_name] = current_time
                capture_timestamp = 0
            else:
                capture_timestamp = (current_time - last_reset_time).seconds

            thread = threading.Thread(
                target=capture_frame,
                args=(id, youtube_link, camera_name, capture_timestamp, input_height, alert_threshold, location)
            )
            thread.start()

            time.sleep(CAPTURE_DELAY)

        time.sleep(CYCLE_DELAY)
