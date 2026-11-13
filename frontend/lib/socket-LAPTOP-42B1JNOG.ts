// lib/socket.js
import { Server } from "socket.io";
import { getAllCameras } from "./controllers/cameraController";
import { getRecentAlert } from "./controllers/alertController";

let io: any;
let intervalId;

export const setupSocket = (server: any) => {
  if (!io) {
    io = new Server(server, {
      path: "/api/socketio",
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket: any) => {
      console.log("⚡ Socket connected:", socket.id);

      // Example event
      socket.on("ping", () => {
        socket.emit("pong");
      });

      // // Custom: emit height alert
      // socket.on("sendAlert", (data: any) => {
      //   io.emit("receiveAlert", data); // broadcast to all
      // });

      // Start broadcasting every 1 second
      intervalId = setInterval(async () => {
        const activeCamera = await getAllCameras({ status: "active" });
        const recentHeightAlert = await getRecentAlert('HEIGHT');
        const recentGatheringAlert = await getRecentAlert('COUNT');
        const recentBendingngAlert = await getRecentAlert('BENDING');
        io.emit("dashboardData", { activeCamera, recentAlert:recentHeightAlert, recentBendingAlert:recentBendingngAlert, recentGatheringAlert: recentGatheringAlert });
        // const data = await getLatestAlerts(); // any custom data you want
        // io.emit('alertUpdate', data);
      }, 10000); // every 1 second
    });
  }

  return io;
};
