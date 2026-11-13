// app/dashboard/page.tsx
"use client";
import Navbar from "@/components/commons/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Camera } from "@/lib/app/generated/prisma";
import Link from "next/link";
import { FaVideo, FaExclamationTriangle, FaRulerVertical, FaChartLine, FaEye } from "react-icons/fa";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const [heightAlerts, setHeightAlerts] = useState([]);
  const [gatheringAlerts, setGatheringAlerts] = useState([]);
  const [camera, setCamera] = useState<Camera[]>([]);
  
  useEffect(() => {
    fetch("/api/socket");
    const socket = io({ path: "/api/socketio" });

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });

    socket.on("dashboardData", (data: any) => {
      setCamera(data.activeCamera);
      setHeightAlerts(data?.recentAlert);
      setGatheringAlerts(data?.recentGatheringAlert);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ProtectedRoute>
      <div className={styles.dashboardContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>Surveillance Dashboard</h1>
          <div className={styles.statsSummary}>
            <span>{camera?.length || 0} Active Cameras</span>
            <span>{gatheringAlerts?.length || 0} Alerts Today</span>
          </div>
        </header>

        <div className={styles.statsGrid}>
          {/* Camera Stat Card */}
          <Link href="/dashboard/cameras" className={styles.statCard}>
            <div className={styles.cardIcon}>
              <FaVideo size={24} />
            </div>
            <div className={styles.cardContent}>
              <h3>Active Cameras</h3>
              <p className={styles.statValue}>{camera?.length || 0}</p>
              <span className={styles.cardLink}>View all cameras</span>
            </div>
          </Link>

          {/* Gathering Alert Card */}
          <Link href="/dashboard/alert?type=c" className={`${styles.statCard} ${styles.alertCard}`}>
            <div className={styles.cardIcon}>
              <FaExclamationTriangle size={24} />
            </div>
            <div className={styles.cardContent}>
              <h3>Gathering Alerts</h3>
              <p className={styles.statValue}>{gatheringAlerts?.length || 0}</p>
              <span className={styles.cardLink}>View alerts</span>
            </div>
          </Link>

          {/* Bending Alert Card */}
          <Link href="/dashboard/alert?type=b" className={`${styles.statCard} ${styles.warningCard}`}>
            <div className={styles.cardIcon}>
              <FaChartLine size={24} />
            </div>
            <div className={styles.cardContent}>
              <h3>Bending Alerts</h3>
              <p className={styles.statValue}>{gatheringAlerts?.length || 0}</p>
              <span className={styles.cardLink}>View alerts</span>
            </div>
          </Link>

          {/* Height Alert Card */}
          <Link href="/dashboard/alert?type=h" className={`${styles.statCard} ${styles.dangerCard}`}>
            <div className={styles.cardIcon}>
              <FaRulerVertical size={24} />
            </div>
            <div className={styles.cardContent}>
              <h3>Height Alerts</h3>
              <p className={styles.statValue}>{heightAlerts?.length || 0}</p>
              <span className={styles.cardLink}>View alerts</span>
            </div>
          </Link>
        </div>

        {/* <section className={styles.liveFeeds}>
          <div className={styles.sectionHeader}>
            <h2>
              <FaEye className={styles.sectionIcon} /> Live Camera Feeds
            </h2>
          </div>
          
          <div className={styles.cameraGrid}>
            <div className={styles.cameraCard}>
              <div className={styles.cameraFrame}>
                <iframe
                  src="https://www.youtube.com/embed/PTiGr8D6uP4?si=iYlWOD0--fXmGSaC"
                  title="Camera 1"
                  allowFullScreen
                ></iframe>
              </div>
              <div className={styles.cameraInfo}>
                <span>Camera 1</span>
                <div className={styles.statusIndicator}></div>
              </div>
            </div>
            
            <div className={styles.cameraCard}>
              <div className={styles.cameraFrame}>
                <iframe
                  src="https://www.youtube.com/embed/QJGvMtYIDu8?si=J8k34eHsn00r3jX9"
                  title="Camera 2"
                  allowFullScreen
                ></iframe>
              </div>
              <div className={styles.cameraInfo}>
                <span>Camera 2</span>
                <div className={styles.statusIndicator}></div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </ProtectedRoute>
  );
}