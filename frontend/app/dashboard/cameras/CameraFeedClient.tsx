// app/dashboard/cameras/CameraFeedClient.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import styles from "./CameraFeedClient.module.css";
import CameraPlayer from "../camera-live-feed/camera-player";
import { unknown } from "zod";

type Camera = {
    id: string;
    name: string;
    rtspUrl?: string;
    location?: string;
    status?: string;
    ipAddress?: string;
    port?: number;
    protocol?: string;
    type?: string;
    alertThreshold?: number;
    heightThreshold?: number;
    lastUpdated?: string;
};

export default function CameraFeedClient() {
    // Camera metadata state
    const [cameraList, setCameraList] = useState<Camera[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Live feed state
    const [cameraIds, setCameraIds] = useState<string[]>([]);
    const [feedsLoading, setFeedsLoading] = useState(true);
    const [feedsError, setFeedsError] = useState<string | null>(null);

    // Alert state
    const [alertMessage, setAlertMessage] = useState(
        "System is operating normally. No alerts detected."
    );
    const [isAlertActive, setIsAlertActive] = useState(false);

    // View mode state
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

    // Search state
    const [searchQuery, setSearchQuery] = useState('');

    // Selected cameras state
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Filter cameras based on search query
    const filteredCameras = useMemo(() => {
        return cameraIds
            .map(id => {
                const camera = cameraList.find(c => c.id === id);
                return camera ? camera : { id, name: 'Unnamed Camera' };
            })
            .filter(camera => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                return (
                    camera.name.toLowerCase().includes(query) ||
                    (camera.location && camera.location.toLowerCase().includes(query)) ||
                    (camera.ipAddress && camera.ipAddress.toLowerCase().includes(query)) ||
                    (camera.status && camera.status.toLowerCase().includes(query))
                );
            });
    }, [cameraIds, cameraList, searchQuery]);

    // Toggle camera selection
    const toggleCamera = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Fetch camera metadata from Next.js API
    const fetchCameras = async () => {
        try {
            const res = await fetch("/api/cameras", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error(`Failed to fetch cameras: ${res.status}`);

            const data = await res.json();
            if (data.success) {
                const normalized = data.data.map((cam: any) => ({
                    ...cam,
                    id: String(cam.id), // ensure string ID
                }));
                setCameraList(normalized);
                console.log("✅ Camera data loaded:", normalized);
            }
        } catch (err) {
            console.error("❌ Failed to load cameras:", err);
            setError("Failed to load camera metadata");
            toast.error("Failed to load camera metadata");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCameras();
    }, []);

    // Fetch live feed camera IDs from Node.js API
    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const res = await fetch("http://localhost:5005/api/cameras");
                const data = await res.json();
                setCameraIds(Array.isArray(data) ? data.map((id: any) => String(id)) : []);
                setFeedsError(null);
            } catch (err) {
                console.error("Failed to load live feeds:", err);
                setFeedsError("Failed to load live feeds");
                toast.error("Failed to load live feeds");
            } finally {
                setFeedsLoading(false);
            }
        };

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                fetchFeeds();
            }
        };

        fetchFeeds();
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    // Simulate alerts
    // useEffect(() => {
    //     const alertInterval = setInterval(() => {
    //         if (Math.random() > 0.8) {
    //             const alertMessages = [
    //                 "Motion detected at Camera 3!",
    //                 "Camera 2 connection unstable!",
    //                 "Unauthorized access attempt detected!",
    //                 "System maintenance scheduled for tonight at 2 AM",
    //             ];
    //             const randomAlert =
    //                 alertMessages[Math.floor(Math.random() * alertMessages.length)];
    //             setAlertMessage(randomAlert);
    //             setIsAlertActive(true);
    //             toast(randomAlert, {
    //                 icon: '⚠️',
    //                 duration: 10000
    //             });
    //             setTimeout(() => setIsAlertActive(false), 10000);
    //         }
    //     }, 30000);

    //     return () => clearInterval(alertInterval);
    // }, []);

    const handleDeleteCamera = async (camId: string, camName: string) => {
        const confirmDelete = confirm(`Delete camera ${camName}?`);
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/cameras/${camId}`, { method: "DELETE" });
            const result = await res.json();

            if (result.success) {
                toast.success("Camera deleted successfully");
                setCameraList((prev) => prev.filter((c) => c.id !== camId));
                setSelectedIds((prev) => prev.filter((id) => id !== camId));
                fetchCameras(); // Refresh camera list
                window.location.reload(); // Reload to update live feeds
            } else {
                toast.error("Failed to delete: " + result.error);
            }
        } catch (err) {
            console.error("Delete error:", err);
            toast.error("Something went wrong while deleting");
        }
    };

    const openModal = (camera: Camera) => {
        setSelectedCamera(camera);
        setShowModal(true);
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <div className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger mx-3 my-3 d-flex align-items-center">
            <i className="fas fa-exclamation-circle me-2"></i>
            <div>Error loading cameras: {error}</div>
        </div>
    );

    return (
        <div className="p-4">
            <div className="container-fluid p-4" style={{
                background: "linear-gradient(to top right, #fff, #ffffffff, #fff)",
                borderRadius: "1rem",
                border: "1px solid #cececeff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}>
                {/* Header with Controls */}
                <div className="container-full">
                    <h1 className="display-5 fw-bold text-center mb-5 text-secondary d-flex justify-content-center align-items-center gap-3">
                        <svg
                            className="bi bi-camera2 text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M9.5 2a.5.5 0 0 0-.354.146L7.207 4.086 6.146 2.854A.5.5 0 0 0 5.5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v-2.5a.5.5 0 0 1 1 0V12h2v-2.5a.5.5 0 0 1 1 0V12h1v-1a.5.5 0 0 1 1 0v1h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-2.5z"
                            />
                            <path
                                d="M2 5a.5.5 0 0 0 0 1h1v4H2a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H3V6h1v3a.5.5 0 0 0 1 0V6h.5a.5.5 0 0 0 0-1H3.5v-1H2z"
                            />
                        </svg>
                        Camera Node Dashboard
                    </h1>

                    {/* Alert Banner */}
                    {/* <div className={`alert ${isAlertActive ? 'alert-warning' : 'alert-success'} d-flex align-items-center mb-4 shadow-sm`}>
                    <i className={`fas ${isAlertActive ? 'fa-exclamation-triangle' : 'fa-check-circle'} me-2`}></i>
                    <div className="flex-grow-1">{alertMessage}</div>
                    <span className={`badge ${isAlertActive ? 'bg-danger' : 'bg-success'} ms-2`}>
                        {isAlertActive ? "ALERT" : "NORMAL"}
                    </span>
                </div> */}

                    {/* Search and View Controls */}
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                        <div className="input-group shadow-sm" style={{ maxWidth: '400px' }}>
                            <span className="input-group-text bg-white border-end-0">
                                <i className="fas fa-search text-muted"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0"
                                placeholder="Search cameras..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ borderLeft: 'none' }}
                            />
                            {searchQuery && (
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            )}
                        </div>

                        <div className="btn-group shadow-sm">
                            <button
                                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <i className="fas fa-th-large me-1"></i>
                                Grid
                            </button>
                            <button
                                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                onClick={() => setViewMode('list')}
                            >
                                <i className="fas fa-list me-1"></i>
                                List
                            </button>
                        </div>
                    </div>

                    {/* Grid View */}
                    {viewMode === 'grid' && (
                        <div className="row g-4">
                            {filteredCameras.map((camera) => (
                                <div key={camera.id} className="col-12 col-md-6">
                                    <div className={`card ${styles.card} position-relative overflow-hidden`}>
                                        <div className={styles.cameraFeedContainer}>
                                            {camera?.id ? (
                                                <>
                                                    <CameraPlayer
                                                        wsUrl={`ws://localhost:5005/api/${camera.id}`}
                                                        width="100%"
                                                        height="100%"
                                                    />
                                                </>
                                            ) : (
                                                <div className={`${styles.noCamera} d-flex justify-content-center align-items-center`}>
                                                    <p className="text-muted m-0">No camera found</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Icon container on top right with background */}
                                        <div className={styles.iconContainer} aria-label="edit delete icons">
                                            <Link href={`/dashboard/cameras/${camera.id}`}>
                                                <button className={`${styles.actionBtn} ${styles.editBtn}`} title="Edit">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M11 4h2M6 20h12M16.5 4.5l3 3m-9 9.5l-4 1 1-4 9-9 3 3-9 9z"
                                                        />
                                                    </svg>
                                                </button>
                                            </Link>

                                            <button
                                                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteCamera(camera.id, camera.name);
                                                }}
                                                title="Delete"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            <div className={`${styles.actionBtn} d-flex justify-content-start`}>
                                                <button
                                                    className={`btn btn-sm ${styles.expandBtn}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openModal(camera);
                                                    }}
                                                    title="Expand view"
                                                >
                                                    <i className="fas fa-expand"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="card-body d-flex flex-column justify-content-between p-4">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <span className="fs-5 fw-semibold text-dark">{camera.name}</span>
                                                    <span className={`badge ${camera.status === 'active' ? 'bg-success' : 'bg-danger'} text-white py-2 px-3 shadow-sm d-flex align-items-center gap-1 fw-semibold`}>
                                                        <svg
                                                            width="20"
                                                            height="20"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle cx="12" cy="12" r="8" />
                                                        </svg>
                                                        {camera.status ? camera.status.toUpperCase() : 'UNKNOWN'}
                                                    </span>
                                                </div>

                                                <div className="text-secondary" style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="fw-semibold" style={{ width: "9rem" }}>Camera Type:</span>
                                                        <span>{camera.type || "IPC"}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="fw-semibold" style={{ width: "9rem" }}>Location:</span>
                                                        <span>{camera.location || "Unknown"}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="fw-semibold" style={{ width: "9rem" }}>IP Address:</span>
                                                        <span>{camera.ipAddress || "192.168.1.110:554"}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="fw-semibold" style={{ width: "9rem" }}>Alert Threshold:</span>
                                                        <span>{camera.alertThreshold || 2}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="fw-semibold" style={{ width: "9rem" }}>Height Threshold:</span>
                                                        <span>{camera.heightThreshold || 2}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* List View */}
                    {viewMode === 'list' && (
                        <div className="table-responsive rounded-3 shadow-sm">
                            <table className="table table-hover align-middle mb-0">
                                <thead className={`${styles.tableHeader}`}>
                                    <tr>
                                        <th style={{ width: '30%' }}>Camera</th>
                                        <th>Status</th>
                                        <th>Location</th>
                                        <th>Connection</th>
                                        <th>Alerts</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCameras.map((camera) => (
                                        <tr key={camera.id} className={styles.tableRow} onClick={() => openModal(camera)}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className={`${styles.listThumbnail} me-3`}>
                                                        <CameraPlayer
                                                            wsUrl={`ws://localhost:5005/api/${camera.id}`}
                                                            width="100%"
                                                            height="100%"
                                                        />
                                                    </div>
                                                    <div>
                                                        <strong>{camera.name}</strong>
                                                        {camera.type && <div className="text-muted small">{camera.type}</div>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge ${camera.status === 'active' ? 'bg-success' : 'bg-danger'} py-1`}>
                                                    {camera.status ? camera.status.toUpperCase() : 'UNKNOWN'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <i className="fas fa-map-marker-alt me-2 text-muted"></i>
                                                    {camera.location ? camera.location.charAt(0).toUpperCase() + camera.location.slice(1) : 'Unknown'}
                                                </div>
                                            </td>
                                            <td>
                                                {camera.ipAddress && (
                                                    <div className="text-muted small">
                                                        <i className="fas fa-network-wired me-1"></i>
                                                        {camera.protocol} @ {camera.ipAddress}:{camera.port}
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                {camera.alertThreshold && (
                                                    <div className="d-flex align-items-center">
                                                        <div className={`${styles.alertMeter} me-2`}>
                                                            <div
                                                                className={styles.alertMeterFill}
                                                                style={{ width: `${Math.min(100, camera.alertThreshold)}%` }}
                                                            ></div>
                                                        </div>
                                                        <span>{camera.alertThreshold}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Link
                                                        href={`/dashboard/cameras/${camera.id}`}
                                                        className={`btn btn-sm ${styles.bg_dark} ${styles.actionBtn} ${styles.editBtn}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <button
                                                        className={`btn btn-sm ${styles.actionBtn} ${styles.deleteBtn} ${styles.bg_dark}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteCamera(camera.id, camera.name);
                                                        }}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* No Results Message */}
                    {filteredCameras.length === 0 && !loading && (
                        <div className="text-center py-5 my-5">
                            <div className={`${styles.noResultsIcon} mb-4`}>
                                <i className="fas fa-video-slash"></i>
                            </div>
                            <h4 className="mb-2">No cameras found</h4>
                            <p className="text-muted mb-4">
                                {searchQuery ? 'No cameras match your search' : 'No cameras are currently available'}
                            </p>
                            {searchQuery && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setSearchQuery('')}
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    )}

                    {/* Modal */}
                    {showModal && selectedCamera && (
                        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                            <div className="modal-dialog modal-xl modal-dialog-centered">
                                <div className="modal-content border-0 shadow-lg">
                                    <div className="modal-header bg-dark text-white">
                                        <h5 className="modal-title d-flex align-items-center">
                                            <span
                                                className={`${styles.statusIndicator} ${selectedCamera.status === "inactive" ? styles.statusInactive : styles.statusActive
                                                    } me-2`}
                                            ></span>
                                            {selectedCamera.name}
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close btn-close-white"
                                            onClick={() => setShowModal(false)}
                                        ></button>
                                    </div>
                                    <div className="modal-body p-0" style={{ minHeight: '70vh' }}>
                                        <CameraPlayer
                                            wsUrl={`ws://localhost:5005/api/${selectedCamera.id}`}
                                            width="100%"
                                            height="100%"
                                            style={{ minHeight: '70vh' }}
                                        />
                                    </div>
                                    <div className="modal-footer bg-light">
                                        <div className="d-flex justify-content-between w-100 align-items-center">
                                            <div className="d-flex flex-wrap gap-3">
                                                {selectedCamera.ipAddress && (
                                                    <div className="d-flex align-items-center">
                                                        <i className="fas fa-network-wired me-2 text-muted"></i>
                                                        <span className="small">
                                                            {selectedCamera.ipAddress}:{selectedCamera.port}
                                                        </span>
                                                    </div>
                                                )}
                                                {selectedCamera.location && (
                                                    <div className="d-flex align-items-center">
                                                        <i className="fas fa-map-marker-alt me-2 text-muted"></i>
                                                        <span className="small">
                                                            {selectedCamera.location.charAt(0).toUpperCase() + selectedCamera.location.slice(1)}
                                                        </span>
                                                    </div>
                                                )}
                                                {selectedCamera.alertThreshold && (
                                                    <div className="d-flex align-items-center">
                                                        <i className="fas fa-bell me-2 text-muted"></i>
                                                        <span className="small">
                                                            Alert Threshold: {selectedCamera.alertThreshold}
                                                        </span>
                                                    </div>
                                                )}
                                                {selectedCamera.alertThreshold && (
                                                    <div className="d-flex align-items-center">
                                                        <i className="fas fa-bell me-2 text-muted"></i>
                                                        <span className="small">
                                                            Height Threshold: {selectedCamera.heightThreshold || 0}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="d-flex gap-2">
                                                <Link
                                                    href={`/dashboard/cameras/${selectedCamera.id}`}
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    <i className="fas fa-edit me-1"></i> Edit Camera
                                                </Link>
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}