// const express = require('express');
// const expressWs = require('express-ws');
// const proxy  = require('rtsp-relay');

// expressWs(express());

// const app = express();
// // 2. Enable WebSocket support
// expressWs(app);

// // 3. Init RTSP relay
// const { proxy: rtspProxy } = proxy(app);

// // 4. WebSocket route for the RTSP stream
// app.ws('/api/stream', rtspProxy({
//   url: 'rtsp://admin:Mztpl123@192.168.1.110:554/stream2?transport=tcp',
//   verbose: false
// }));

// // 5. Serve test page if needed
// app.get('/', (req, res) => res.send('RTSP relay server running'));


// app.listen(5005, () => console.log('RTSP relay running on ws://localhost:5005/api/stream'));



// const express = require('express');
// const expressWs = require('express-ws');
// const proxy = require('rtsp-relay');
// const cors = require('cors');

// expressWs(express()); // initialize express-ws
// const app = express();
// expressWs(app); // enable ws routes

// // ✅ Init RTSP relay
// const { proxy: rtspProxy } = proxy(app);

// // ✅ Allow CORS for frontend
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
// }));

// // Example camera list
// const cameras = {
//     cam1: 'rtsp://admin:Mztpl123@192.168.1.110:554/stream2?transport=tcp',
//     cam2: 'rtsp://admin:Mztpl123@192.168.1.108:554/cam/realmonitor?channel=1&subtype=0',
//     //   cam3: 'rtsp://admin:Mztpl123@192.168.1.112:554/stream2?transport=tcp'
// };

// // ✅ Dynamic WebSocket RTSP relay
// app.ws('/api/:cameraId', (ws, req) => {
//     const cameraId = req.params.cameraId;
//     const url = cameras[cameraId];

//     if (!url) {
//         ws.close();
//         return;
//     }

//     // This is the correct way:
//     rtspProxy({ url, verbose: false })(ws, req);
// });

// // ✅ API endpoint for frontend
// app.get('/api/cameras', (req, res) => {
//     res.json(Object.keys(cameras));
// });

// // Test root
// app.get('/', (req, res) => res.send('RTSP relay server running'));

// app.listen(5005, () => console.log('RTSP relay running on ws://localhost:5005/api/:cameraId'));


// const express = require("express");
// const expressWs = require("express-ws");
// const proxy = require("rtsp-relay");
// const cors = require("cors");
// const mysql = require("mysql2");

// // Initialize app and express-ws
// const app = express();
// expressWs(app);
// const { proxy: rtspProxy } = proxy(app);

// // Middlewares
// app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
// app.use(express.json());

// // ✅ MySQL connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root", // default for XAMPP
//   password: "", // default empty for XAMPP
//   database: "jail" // change to your DB name
// });

// db.connect(err => {
//   if (err) {
//     console.error("Database connection error:", err);
//     return;
//   }
//   console.log("✅ MySQL Connected!");
// });

// // ✅ In-memory camera RTSP list
// const cameras = {
//   cam1: "rtsp://admin:Mztpl123@192.168.1.110:554/stream2?transport=tcp",
//   cam2: "rtsp://admin:Mztpl123@192.168.1.108:554/cam/realmonitor?channel=1&subtype=0"
// };

// // ✅ WebSocket endpoint for RTSP streaming
// app.ws("/api/:cameraId", (ws, req) => {
//   const cameraId = req.params.cameraId;
//   const url = cameras[cameraId];

//   if (!url) {
//     ws.close();
//     return;
//   }
//   rtspProxy({ url, verbose: false })(ws, req);
// });

// // ✅ API to get list of available cameras
// app.get("/api/cameras", (req, res) => {
//   res.json(Object.keys(cameras));
// });

// // ✅ POST API to add camera to DB
// app.post("/cameras", (req, res) => {
//   const body = req.body;
//   const sql = `
//     INSERT INTO camera 
//     (name, location, ipAddress, port, type, protocol, status, userId, createdById, updatedById, heightThreshold, alertThreshold, cameraUrl) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     body.name,
//     body.location,
//     body.ipAddress,
//     body.port,
//     body.type,
//     body.protocol,
//     body.status,
//     body.userId || 1, // dummy user
//     body.userId || 1,
//     body.userId || 1,
//     body.heightThreshold,
//     body.alertThreshold,
//     body.cameraUrl
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Insert error:", err);
//       return res.status(500).json({ success: false, message: "DB insert error" });
//     }

//     // Optionally add camera to in-memory RTSP list for live streaming
//     if (body.cameraId && body.cameraUrl) {
//       cameras[body.cameraId] = body.cameraUrl;
//     }

//     res.json({ success: true, message: "Camera added successfully", id: result.insertId });
//   });
// });

// // ✅ Root test route
// app.get("/", (req, res) => res.send("RTSP + MySQL camera API running"));

// // ✅ Start server
// app.listen(5005, () => {
//   console.log("🚀 Server running on http://localhost:5005");
//   console.log("📡 RTSP relay running on ws://localhost:5005/api/:cameraId");
// });



// ----------------------- new copy -----------------------

const express = require("express");
const expressWs = require("express-ws");
const proxy = require("rtsp-relay");
const cors = require("cors");
const mysql = require("mysql2");

// Initialize app and express-ws
const app = express();
expressWs(app);
const { proxy: rtspProxy } = proxy(app);

// Middlewares
app.use(cors({ origin: "*", methods: ["GET", "POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // default for XAMPP
  password: "", // default empty for XAMPP
  database: "jail" // change to your DB name
});

db.connect(err => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("✅ MySQL Connected!");
});

// ✅ WebSocket endpoint for RTSP streaming
app.ws("/api/:cameraId", (ws, req) => {
  const cameraId = req.params.cameraId;

  // Get camera RTSP URL from DB
  db.query("SELECT cameraUrl FROM camera WHERE id = ?", [cameraId], (err, results) => {
    if (err || results.length === 0) { // ✅ Added check for empty or error
      ws.close();
      return;
    }

    const url = results[0].cameraUrl;
    rtspProxy({ url, verbose: false })(ws, req);
  });
});

// ✅ API to get all cameras from DB
app.get("/api/cameras", (req, res) => {
  db.query("SELECT id, name, location, ipAddress, port, type, protocol, status, cameraUrl FROM camera", (err, results) => {
    if (err) {
      console.error("Fetch cameras error:", err);
      return res.status(500).json({ success: false, message: "DB fetch error" });
    }
    res.json(results || []); // ✅ Added safe empty array fallback
  });
});

// ✅ POST API to add camera to DB
app.post("/cameras", (req, res) => {
  const body = req.body;

  // ✅ Added validation for required fields
  if (!body.name || !body.location || !body.ipAddress || !body.cameraUrl) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO camera 
    (name, location, ipAddress, port, type, protocol, status, userId, createdById, updatedById, heightThreshold, alertThreshold, cameraUrl) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    body.name,
    body.location,
    body.ipAddress,
    body.port,
    body.type,
    body.protocol,
    body.status,
    body.userId || 1, // dummy user
    body.userId || 1,
    body.userId || 1,
    body.heightThreshold,
    body.alertThreshold,
    body.cameraUrl
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ success: false, message: "DB insert error" });
    }

    res.json({ success: true, message: "Camera added successfully", id: result.insertId });
  });
});

// ✅ Root test route
app.get("/", (req, res) => res.send("RTSP + MySQL camera API running"));

// ✅ Start server
app.listen(5005, () => {
  console.log("🚀 Server running on http://localhost:5005");
  console.log("📡 RTSP relay running on ws://localhost:5005/api/:cameraId");
});



