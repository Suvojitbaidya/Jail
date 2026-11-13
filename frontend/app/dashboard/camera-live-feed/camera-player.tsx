'use client';
import React, { useEffect, useRef } from 'react';

type Props = {
    wsUrl: string;
    width?: number | string;  // Allow both number and string
    height?: number | string; // Allow both number and string
    style?: React.CSSProperties; // Optional style prop for additional styling
    className?: string; // Optional className prop for additional styling
};

export default function CameraPlayer({ wsUrl, width = 320, height = 240 }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;

        // dynamically import the lib (runs only in browser)
        (async () => {
            if (!canvasRef.current || !containerRef.current) return;

            try {
                // Convert width/height to numbers for canvas
                let canvasWidth = typeof width === 'string' ? 
                    parseInt(width, 10) || containerRef.current.clientWidth : 
                    width;
                let canvasHeight = typeof height === 'string' ? 
                    parseInt(height, 10) || containerRef.current.clientHeight : 
                    height;

                // Update canvas dimensions
                canvasRef.current.width = canvasWidth;
                canvasRef.current.height = canvasHeight;

                const mod = await import('@cycjimmy/jsmpeg-player');
                const JSMpeg = (mod as any).default || mod;

                playerRef.current = new JSMpeg.Player(wsUrl, {
                    canvas: canvasRef.current,
                    autoplay: true,
                    audio: false,
                    pauseWhenHidden: false,
                });

                (playerRef.current as any).__wsUrl = wsUrl;
            } catch (err) {
                console.error('Failed to init JSMpeg player for', wsUrl, err);
            }
        })();

        return () => {
            cancelled = true;
            if (playerRef.current?.destroy) {
                try { playerRef.current.destroy(); } catch (e) { /* ignore */ }
            }
            playerRef.current = null;
        };
    }, [wsUrl, width, height]);

    return (
        <div 
            ref={containerRef} 
            style={{ 
                background: '#000', 
                display: 'inline-block',
                width: typeof width === 'string' ? width : `${width}px`,
                height: typeof height === 'string' ? height : `${height}px`,
                position: 'relative'
            }}
        >
            <canvas 
                ref={canvasRef} 
                style={{ 
                    display: 'block',
                    width: '100%',
                    height: '100%'
                }} 
            />
        </div>
    );
}