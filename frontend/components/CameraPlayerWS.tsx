'use client';
import React, { useEffect, useRef } from 'react';

export default function CameraPlayerWS({
  wsUrl,
  width = 500,
  height = 360
}: {
  wsUrl: string;
  width?: number;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!wsUrl) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const ws = new WebSocket(wsUrl);
    ws.binaryType = 'arraybuffer';

    ws.onmessage = (ev) => {
      const blob = new Blob([ev.data], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    };

    return () => ws.close();
  }, [wsUrl, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ background: '#000' }} />;
}
