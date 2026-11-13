import { setupSocket } from "@/lib/socket";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("🔌 Setting up Socket.IO server...");
    setupSocket(res.socket.server);
    res.socket.server.io = true;
  }

  res.end();
}
