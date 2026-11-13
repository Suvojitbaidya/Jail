// 'use client';
// import { useEffect, useRef } from 'react';
// import JSMpeg from '@cycjimmy/jsmpeg-player';

// export default function CameraFeed() {
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         new JSMpeg.Player('ws://localhost:5005/api/stream', {
//             canvas: canvasRef.current,
//         });
//     }, []);

//     return <canvas ref={canvasRef} style={{ width: '640px', height: '480px' }} />;
// }
