// app/dashboard/page.tsx
"use client";
import Navbar from "@/components/commons/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import "@/styles/dashboard.css";
// import { initiateSocket, getSocket } from "@/lib/socket";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Camera } from "@/lib/app/generated/prisma";
import Link from "next/link";

export default function DashboardPage() {
  const [heightAlerts, setHeightAlerts] = useState([]);
  const [gatheringAlerts, setGatheringAlerts] = useState([]);
  const [camera, setCamera] = useState<Camera[]>([]);
  useEffect(() => {
    // Call API to initialize server once
    fetch("/api/socket");

    const socket = io({
      path: "/api/socketio",
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });

    socket.on("dashboardData", (data: any) => {
      setCamera(data.activeCamera);
      setHeightAlerts(data?.recentAlert);
      setGatheringAlerts(data?.recentGatheringAlert);
      // show notification, update state, etc.
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <ProtectedRoute>
      {/* <!-- Main Dashboard --> */}
      <section className="container mt-4 mb-5 ps-4">
        <h2 className="mb-4 dashboard-title">Surveillance Dashboard</h2>

        {/* <!-- Stats --> */}
        <div className="row g-4 dashboard_top_row">
          <div className="col-md-4">
            <a href="/dashboard/cameras">
              <div className="stat-box text-center h-100">
                <i className="fas fa-video mb-2"></i>
                <h5 style={{ color: "#000" }}>Active Cameras</h5>
                <p className="fs-4 fw-semibold" style={{ color: "#000" }}>
                  {camera && camera.length > 0 ? camera.length : 0}
                </p>
              </div>
            </a>
          </div>
          <div className="col-md-4">
          <Link href="/dashboard/alert?type=c">
            <div className="stat-box text-center h-100">
              <i className="fas fa-exclamation-triangle mb-2"></i>
              <h5 className="text-dark">Gathering Alert</h5>
              <p className="fs-4 fw-semibold mb-2 text-dark">{gatheringAlerts && gatheringAlerts.length>0?gatheringAlerts.length:0}</p>            
            </div>
            </Link>
          </div>

          <div className="col-md-4">
            <div className="stat-box text-center h-100">
              <i className="fas fa-user mb-2"></i>
              <h5>Tracked Prisoners</h5>
              <p className="fs-4 fw-semibold">30</p>

              {/* <!-- Prisoner times --> */}
              {/* <div className="prisoner-times d-flex justify-content-center flex-wrap gap-3 mt-2">
                            <div className="d-flex align-items-center gap-2"
                                onClick="openAlertModal('10:45 AM', 'images/person-crossing.png')"
                                style={{cursor:"pointer"}}>
                                <span className="blinking-dot bg-primary"></span>
                                <span className="text-black fw-semibold trigger_time_text">10:45 AM</span>
                            </div>
                            <div className="d-flex align-items-center gap-2"
                                onClick="openAlertModal('10:20 AM', 'images/person-crossing.png')"
                                style={{cursor:"pointer"}}>
                                <span className="blinking-dot bg-warning"></span>
                                <span className="text-black fw-semibold trigger_time_text">10:20 AM</span>
                            </div>
                            <div className="d-flex align-items-center gap-2"
                                onClick="openAlertModal('09:50 AM', 'images/person-crossing.png')"
                                style={{cursor:"pointer"}}>
                                <span className="blinking-dot bg-danger"></span>
                                <span className="text-black fw-semibold trigger_time_text">09:50 AM</span>
                            </div>
                        </div> */}
            </div>
          </div>
          <div className="col-md-4">
            <Link href="/dashboard/alert?type=h">
              <div className="stat-box text-center h-100">

                <i className="fas fa-ruler-vertical mb-2"></i>
                <h5 className="text-dark">Height Alerts</h5>
                <p className="fs-4 fw-semibold text-dark">
                  {heightAlerts && heightAlerts.length > 0
                    ? heightAlerts.length
                    : 0}
                </p>


                {/* <!-- Height alert times --> */}
                {/* <div className="prisoner-times d-flex justify-content-center flex-wrap gap-3 mt-2">
                            <div className="d-flex align-items-center gap-2"
                                onClick="openAlertModal('11:15 AM', 'images/height-alart-1.png')"
                                style={{cursor:"pointer"}}>
                                <span className="blinking-dot bg-primary"></span>
                                <span className="text-black fw-semibold trigger_time_text">11:15 AM</span>
                            </div>
                            <div className="d-flex align-items-center gap-2"
                                onClick="openAlertModal('10:50 AM', 'images/height-alart-2.jpg')"
                                style={{cursor:"pointer"}}>
                                <span className="blinking-dot bg-warning"></span>
                                <span className="text-black fw-semibold trigger_time_text">10:50 AM</span>
                            </div>
                            <div className="d-flex align-items-center gap-2"
                                onClick="openAlertModal('09:30 AM', 'images/height-alart.png')"
                                style={{cursor:"pointer"}}>
                                <span className="blinking-dot bg-danger"></span>
                                <span className="text-black fw-semibold trigger_time_text">09:30 AM</span>
                            </div>
                        </div> */}
              </div>
            </Link>
          </div>
        </div>

        {/* <!-- Live Feeds --> */}
        <div className="mt-5">
          <h4 className="dashboard-title mb-4">Live Camera Feeds</h4>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card camera-card shadow-sm">
                <div className="card-body p-2">
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/PTiGr8D6uP4?si=iYlWOD0--fXmGSaC"
                    title="Camera 1"
                    allowFullScreen
                  ></iframe>
                  <h6 className="mt-2 text-center">Camera 1</h6>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card camera-card shadow-sm">
                <div className="card-body p-2">
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/QJGvMtYIDu8?si=J8k34eHsn00r3jX9"
                    title="Camera 2"
                    allowFullScreen
                  ></iframe>
                  <h6 className="mt-2 text-center">Camera 2</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
