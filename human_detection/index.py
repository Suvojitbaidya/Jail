import cv2
import os
import threading
import time
from datetime import datetime, timedelta
import yt_dlp
import requests
from dotenv import load_dotenv

from human_counting.DB_test import detect_and_mark_humans
from height_calculation.hight import process_image

# Load environment variables
load_dotenv()
url = os.getenv("API_URL")

# === CONFIGURABLE PARAMETERS ===
FETCH_INTERVAL_SECONDS = 50  # Fetch API every 5 minutes
RUN_DURATION_MINUTES = 10      # Total run time (can be changed easily later)
CAPTURE_DELAY = 2             # Delay between camera captures
CYCLE_DELAY = 41              # Delay between each full camera cycle
OUTPUT_FOLDER = "ToBeProcess"

# Create output folder
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Shared camera list and lock
camera_list = []
camera_lock = threading.Lock()

# === Fetch stream URL using yt-dlp ===
def get_youtube_stream_url(youtube_link):
    ydl_opts = {
        "format": "best",
        "quiet": True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(youtube_link, download=False)
        return info_dict["url"]

# === Capture a single frame ===
def capture_frame(id, youtube_link, camera_name, timestamp, input_height, alert_threshold, location):
    with lock:
        try:
            stream_url = get_youtube_stream_url(youtube_link)
            cap = cv2.VideoCapture(stream_url)

            if not cap.isOpened():
                print(f"Error: Cannot open YouTube stream for {youtube_link}")
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

                # Human detection
                human_count, _ = detect_and_mark_humans(id, frame, camera_name, alert_threshold)
                print(f"[{camera_name}] Humans Detected: {human_count}")

                # Height detection
                if location == "wallside":
                    print("Height calculating...")
                    process_image(id, image_path, input_height, camera_name)
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
    start_time = datetime.now()
    end_time = start_time + timedelta(minutes=RUN_DURATION_MINUTES)

    while datetime.now() < end_time:
        with camera_lock:
            cameras = list(camera_list)  # Thread-safe copy

        for camera in cameras:
            youtube_link = camera.get("cameraUrl")
            camera_name = camera.get("name")
            input_height = camera.get("heightThreshold")
            alert_threshold = camera.get("alertThreshold")
            location = camera.get("location")
            id = camera.get("id")

            if not youtube_link:
                continue

            elapsed_time = (datetime.now() - start_time).seconds
            capture_timestamp = (elapsed_time // 60) * 60

            thread = threading.Thread(
                target=capture_frame,
                args=(id, youtube_link, camera_name, capture_timestamp, input_height, alert_threshold, location)
            )
            thread.start()

            time.sleep(CAPTURE_DELAY)

        time.sleep(CYCLE_DELAY)

    print(f"Processing completed. Auto-stopped after {RUN_DURATION_MINUTES} minutes.")

# === Entry Point ===
if __name__ == "__main__":
    lock = threading.Lock()  # Frame capture lock

    # Start background API fetcher
    threading.Thread(target=update_camera_list_periodically, daemon=True).start()

    # Start main video processor
    process_videos()