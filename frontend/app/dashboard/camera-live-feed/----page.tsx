'use client';
import React, { useEffect, useState } from 'react';
import CameraPlayer from './camera-player';

export default function CamerasPage() {
    const [cameraIds, setCameraIds] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [feedsLoading, setFeedsLoading] = useState(true);
    const [feedsError, setFeedsError] = useState<string | null>(null);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                // Page is visible again → re-fetch feeds
                console.log("🔄 Page became active, refreshing feeds...");
                setFeedsLoading(true);
                fetch("http://localhost:5005/api/cameras")
                    .then((res) => res.json())
                    .then((data) => {
                        setCameraIds(Array.isArray(data) ? data : []);
                        setFeedsError(null);
                    })
                    .catch(() => setFeedsError("Failed to reload feeds"))
                    .finally(() => setFeedsLoading(false));
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () =>
            document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    if (error) return <div>Error loading cameras: {error}</div>;
    if (cameraIds === null) return <div>Loading cameras…</div>;
    if (cameraIds.length === 0) return <div>No cameras found</div>;

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 12,
                padding: 12,
            }}
        >
            {cameraIds.map((id) => (
                // the ws path matches your backend ws route
                <CameraPlayer key={id} wsUrl={`ws://localhost:5005/api/${id}`} width={500} height={360} />
            ))}
        </div>
    );
}