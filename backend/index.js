const express = require('express');
const expressWs = require('express-ws');
const proxy = require('rtsp-relay');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Promise-based MySQL

// ✅ Init Express + WebSocket support
const app = express();
expressWs(app);
const { proxy: rtspProxy } = proxy(app);

// ✅ Allow CORS for frontend
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

// ✅ MySQL connection pool
const db = mysql.createPool({
    host: "localhost",
    user: "root",       // your MySQL username
    password: "root1234",       // your MySQL password
    database: "jail",   // your database name
});

// ✅ Test DB connection at startup
(async () => {
    try {
        await db.query("SELECT 1");
        console.log("✅ MySQL Connected!");
    } catch (err) {
        console.error("❌ Database connection error:", err);
        process.exit(1); // Exit if DB fails
    }
})();

// ✅ Helper: Get all cameras from DB
async function getCamerasFromDB() {
    const [rows] = await db.query("SELECT id, cameraUrl FROM camera");
    // Convert rows to { "1": "rtsp://...", "2": "rtsp://..." }
    const cameras = {};
    rows.forEach(row => {
        cameras[row.id] = row.cameraUrl;
    });
    return cameras;
}

// ✅ Dynamic WebSocket RTSP relay
app.ws('/api/:cameraId', async (ws, req) => {
    try {
        const cameraId = req.params.cameraId; // ID from URL
        const cameras = await getCamerasFromDB();
        const url = cameras[cameraId];

        if (!url) {
            console.warn(`⚠ Camera ID ${cameraId} not found in DB`);
            ws.close();
            return;
        }

        console.log(`📡 Streaming camera ID ${cameraId}`);
        rtspProxy({ url, verbose: false })(ws, req);

    } catch (err) {
        console.error("❌ Error fetching camera URL:", err);
        ws.close();
    }
});

// ✅ API endpoint for frontend to list cameras
app.get('/api/cameras', async (req, res) => {
    try {
        const cameras = await getCamerasFromDB();
        res.json(Object.keys(cameras)); // Return list of IDs
    } catch (err) {
        console.error("❌ Error fetching camera list:", err);
        res.status(500).json({ error: "Database error" });
    }
});

// ✅ Test root
app.get('/', (req, res) => res.send('RTSP relay server running with DB data'));

// ✅ Start server
app.listen(5005, () => console.log('🚀 RTSP relay running on ws://localhost:5005/api/:cameraId'));
