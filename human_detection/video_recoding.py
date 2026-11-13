import os
import datetime
import threading
import time
import cv2



BASE_SAVE_DIR = "recordings"
CHUNK_DURATION = 60  # seconds (3600 = 1 hour)

def get_next_boundary(seconds_interval):
    now = datetime.datetime.now().replace(microsecond=0)
    seconds_past = now.minute * 60 + now.second
    delta = seconds_interval - (seconds_past % seconds_interval)
    if delta == seconds_interval:
        delta = 0
    return now + datetime.timedelta(seconds=delta)

def record_camera_opencv(camera_name, url):
    while True:
        now = datetime.datetime.now()
        date_folder = now.strftime("%Y-%m-%d")
        start_time_str = now.strftime("%H.%M")
        end_time_dt = get_next_boundary(CHUNK_DURATION)
        end_time_str = end_time_dt.strftime("%H.%M")

        # Create save folder
        save_folder = os.path.join(BASE_SAVE_DIR, date_folder, camera_name)
        os.makedirs(save_folder, exist_ok=True)

        # File path
        file_path = os.path.join(save_folder, f"{start_time_str} - {end_time_str}.mp4")

        # Calculate duration for this chunk
        duration_sec = (end_time_dt - now).total_seconds()

        # Open RTSP stream
        cap = cv2.VideoCapture(url)
        if not cap.isOpened():
            print(f"[ERROR] Could not open stream for {camera_name}")
            time.sleep(5)  # retry after 5 sec
            continue

        fps = cap.get(cv2.CAP_PROP_FPS)
        if fps <= 0:
            fps = 25  # fallback

        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        # Create VideoWriter
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # mp4 output
        out = cv2.VideoWriter(file_path, fourcc, fps, (width, height))

        print(f"[INFO] {camera_name} → {file_path} (for {duration_sec:.0f} sec)")

        start_time = time.time()
        while time.time() - start_time < duration_sec:
            ret, frame = cap.read()
            if not ret:
                print(f"[WARNING] Stream lost for {camera_name}, retrying...")
                break
            out.write(frame)

        cap.release()
        out.release()
        print(f"[INFO] Finished {camera_name} chunk. Next starts {end_time_dt}")

def start_recording():
    threads = []
    for name, url in CAMERAS.items():
        t = threading.Thread(target=record_camera_opencv, args=(name, url), daemon=True)
        threads.append(t)
        t.start()

    while True:
        time.sleep(1)

if __name__ == "__main__":
    start_recording()
