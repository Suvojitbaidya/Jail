"use client";
import styles from "./CameraSidebar.module.css";
import React, { useEffect, useState } from "react";
import CameraPlayer from "../camera-live-feed/camera-player";

type Camera = {
  id: string;
  name: string;
  rtspUrl?: string;
  status?: string;
  location?: string;
};

export default function CameraSidebar({
  cameras,
  selectedIds,
  toggleCamera,
  toggleAll,
}: {
  cameras: Camera[];
  selectedIds: string[];
  toggleCamera: (id: string) => void;
  toggleAll: () => void;
}) {
  const allSelected = selectedIds.length === cameras.length;
  const [cameraIds, setCameraIds] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5005/api/cameras"); // change host if needed
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // backend returns array of ids (eg: ["cam1","cam2"])
        setCameraIds(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Failed to fetch cameras", err);
        setError(String(err));
        setCameraIds([]);
      }
    })();
  }, []);

  if (error) return <div>Error loading cameras: {error}</div>;
  if (cameraIds === null) return <div>Loading cameras…</div>;
  if (cameraIds.length === 0) return <div>No cameras found</div>;

  return (
    <div className={styles.sidebar}>
      {/* Sidebar Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Camera Controls</h3>
        <button
          className={`${styles.toggleAll} ${
            allSelected ? styles.toggleAllActive : ""
          }`}
          onClick={toggleAll}
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>
      </div>

      {/* Camera List */}
      <div className={styles.cameraList}>
        {cameras.map((cam) => (
          <div
            key={cam.id}
            className={`${styles.cameraItem} ${
              selectedIds.includes(cam.id) ? styles.cameraItemSelected : ""
            }`}
            onClick={() => toggleCamera(cam.id)}
          >
            <div className={styles.cameraHeader}>
              <span className={styles.cameraName}>{cam.name}</span>
              <span
                className={`${styles.statusBadge} ${
                  cam.status === "inactive"
                    ? styles.statusInactive
                    : styles.statusActive
                }`}
              >
                {cam.status || "active"}
              </span>
            </div>
            <div className={styles.location}>
              <i className={`fas fa-map-marker-alt ${styles.locationIcon}`}></i>
              <span>{cam.location === "wallside" ? "Wall Side" : "Normal"}</span>
            </div>

            {/* ✅ Live Camera Grid Preview when selected */}
            {selectedIds.includes(cam.id) && (
              <div className={styles.previewContainer}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: 12,
                    padding: 12,
                  }}
                >
                  {cameraIds.map((id) => (
                    <CameraPlayer
                      key={id}
                      wsUrl={`ws://localhost:5005/api/${id}`}
                      width={500}
                      height={150}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Toggle Switch */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "0.5rem",
              }}
            >
              <label
                className={styles.switch}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(cam.id)}
                  onChange={() => toggleCamera(cam.id)}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
