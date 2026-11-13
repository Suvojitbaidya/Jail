import cv2
import time
import threading
import requests
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
API_URL = os.getenv("API_URL")  # Change to your API endpoint
BASE_DIR = "recordings"
RECONNECT_DELAY = 5          # seconds between reconnect attempts
REFRESH_CAMERA_LIST = 60     # seconds between API checks for new cameras
CHUNK_SECONDS = 300          # e.g. 300 for 5-min chunks, 3600 for 1-hour chunks

active_threads = {}          # {camera_name: threading.Thread}
stop_flags = {}              # {camera_name: threading.Event()}


def sanitize_filename(name):
    """Remove invalid filename characters."""
    return "".join(c for c in name if c.isalnum() or c in (' ', '_', '-')).rstrip()


def get_camera_save_path(name):
    """Return full save path for camera folder inside today's date folder."""
    today_str = datetime.now().strftime("%Y-%m-%d")
    path = os.path.join(BASE_DIR, today_str, sanitize_filename(name))
    os.makedirs(path, exist_ok=True)
    return path


def get_next_chunk_boundary(now, chunk_seconds):
    """Return the next clock-aligned boundary time after 'now'."""
    total_seconds = now.hour * 3600 + now.minute * 60 + now.second
    next_boundary_seconds = ((total_seconds // chunk_seconds) + 1) * chunk_seconds
    next_boundary = now.replace(hour=0, minute=0, second=0, microsecond=0) + timedelta(seconds=next_boundary_seconds)
    return next_boundary


def record_camera_continuous(name, url, stop_event):
    """Continuously record camera in clock-aligned chunks (like 10:32:34 → 10:35:00), with error-safe saving."""
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")

    while not stop_event.is_set():
        print(f"🔌 Connecting to {name}...")
        cap = cv2.VideoCapture(url)

        if not cap.isOpened():
            print(f"❌ Failed to connect to {name}, retrying in {RECONNECT_DELAY}s...")
            cap.release()
            time.sleep(RECONNECT_DELAY)
            continue

        fps = cap.get(cv2.CAP_PROP_FPS)
        if fps <= 0:
            fps = 25.0  # fallback FPS

        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        print(f"✅ Connected to {name}, starting recording...")

        now = datetime.now()
        chunk_end = get_next_chunk_boundary(now, CHUNK_SECONDS)

        save_path = get_camera_save_path(name)
        timestamp = now.strftime("%H_%M_%S")
        file_path = os.path.join(save_path, f"{timestamp}.mp4")
        out = cv2.VideoWriter(file_path, fourcc, fps, (width, height))
        print(f"🎬 Recording to: {file_path}")

        try:
            while not stop_event.is_set():
                ret, frame = cap.read()
                if not ret or frame is None:
                    print(f"⚠️ Lost connection to {name} while recording.")
                    break  # Exit inner loop to reconnect

                out.write(frame)

                if datetime.now() >= chunk_end:
                    out.release()
                    print(f"💾 Saved file: {file_path}")

                    now = datetime.now()
                    chunk_end = get_next_chunk_boundary(now, CHUNK_SECONDS)
                    save_path = get_camera_save_path(name)
                    timestamp = now.strftime("%H_%M_%S")
                    file_path = os.path.join(save_path, f"{timestamp}.mp4")
                    out = cv2.VideoWriter(file_path, fourcc, fps, (width, height))
                    print(f"🎬 Started new chunk: {file_path}")

        except Exception as e:
            print(f"❗ Unexpected error while recording {name}: {e}")

        finally:
            # Always release resources
            try:
                out.release()
                print(f"💾 Finalized video file: {file_path}")
            except Exception:
                print(f"⚠️ Could not finalize video file for {name}.")

            cap.release()
            print(f"🔁 Reconnecting to {name} in {RECONNECT_DELAY}s...")
            time.sleep(RECONNECT_DELAY)


def fetch_cameras():
    """Fetch camera list from API."""
    try:
        response = requests.get(API_URL, timeout=5)
        response.raise_for_status()
        data = response.json()

        cameras = {}
        if data.get("success") and "data" in data:
            for cam in data["data"]:
                name = cam.get("name")
                url = cam.get("cameraUrl")
                if name and url:
                    cameras[name] = url
        return cameras
    except Exception as e:
        print(f"❌ Error fetching camera list: {e}")
        return {}


def refresh_camera_list():
    """Periodically refresh camera list and update threads."""
    global active_threads, stop_flags
    while True:
        cameras = fetch_cameras()

        # Start new camera threads
        for name, url in cameras.items():
            if name not in active_threads:
                print(f"➕ Adding new camera: {name}")
                stop_flags[name] = threading.Event()
                t = threading.Thread(target=record_camera_continuous, args=(name, url, stop_flags[name]))
                t.daemon = True
                active_threads[name] = t
                t.start()

        # Stop threads for removed cameras
        for name in list(active_threads.keys()):
            if name not in cameras:
                print(f"❌ Removing camera: {name}")
                stop_flags[name].set()
                active_threads.pop(name)

        time.sleep(REFRESH_CAMERA_LIST)


def recoding():
    refresh_camera_list()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("🛑 Stopping all recordings...")
        for name, flag in stop_flags.items():
            flag.set()
