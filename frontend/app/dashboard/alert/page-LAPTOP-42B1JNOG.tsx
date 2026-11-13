"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { Camera } from "@/lib/app/generated/prisma";
import io from "socket.io-client";
import "./Alert.css";
import { useSearchParams } from "next/navigation";
import {
  FaEye,
  FaUsers,
  FaRulerVertical,
  FaUser,
  FaTimes,
  FaExclamationTriangle,
  FaChartLine,
  FaClock,
  FaIdBadge
} from "react-icons/fa";

interface AlertData {
  id: number;
  cameraId: number;
  noOfPeople: number;
  url: string;
  camera?: {
    name: string;
  };
  timestamp?: string;
}

export default function AlertPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [heightAlerts, setHeightAlerts] = useState<AlertData[]>([]);
  const [gatheringAlerts, setGatheringAlerts] = useState<AlertData[]>([]);
  const [bendingAlerts, setBendingAlerts] = useState<AlertData[]>([]);
  const [activeTab, setActiveTab] = useState<'height' | 'gathering' | 'bending'>('height');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams?.get('type');
    if (type === 'h') setActiveTab('height');
    if (type === 'c') setActiveTab('gathering');
    if (type === 'b') setActiveTab('bending');
  }, [searchParams]);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/socket");
    const socket = io({ path: "/api/socketio" });

    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    socket.on("dashboardData", (data: any) => {

      console.log("Received dashboard data:", data);

      setHeightAlerts(data?.recentAlert?.map(addTimestamps) || []);
      setGatheringAlerts(data?.recentGatheringAlert?.map(addTimestamps) || []);
      setBendingAlerts(data?.recentBendingAlert?.map(addTimestamps) || []);
      setIsLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1); // reset page on tab change
  }, [activeTab]);

  const addTimestamps = (alert: AlertData): AlertData => ({
    ...alert,
    timestamp: new Date().toLocaleTimeString()
  });

  const renderAlertTable = (alerts: AlertData[], alertType: string) => {
    const totalPages = Math.ceil(alerts.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentAlerts = alerts.slice(startIdx, startIdx + itemsPerPage);

    if (isLoading) {
      return (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading alerts...</p>
        </div>
      );
    }

    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th><FaIdBadge className="header-icon" /> ID</th>
              <th><FaUser className="header-icon" /> Camera</th>
              <th><FaUsers className="header-icon" /> Count</th>
              <th><FaClock className="header-icon" /> Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAlerts.map((alert) => (
              <tr key={alert.id}>
                <td>#{alert.id}</td>
                <td className="camera-cell">
                  <FaUser className="icon" />
                  <span>{alert.camera?.name || 'Unknown'}</span>
                </td>
                <td>
                  <span className={`count-badge ${alert.noOfPeople > 5 ? 'warning' : ''}`}>
                    {alert.noOfPeople}
                  </span>
                </td>
                <td>{alert.timestamp || '--:--'}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => openModal(`/api/media/${getPrefixForAlertType(alertType)}_${alert.url}`)}
                  >
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))}
            {currentAlerts.length === 0 && !isLoading && (
              <tr className="empty-row">
                <td colSpan={5}>
                  <div className="empty-state">
                    <FaExclamationTriangle className="empty-icon" />
                    <p>No {alertType.toLowerCase()} alerts detected</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };


  const getPrefixForAlertType = (alertType: string) => {
    switch (alertType.toLowerCase()) {
      case 'height': return '2';
      case 'gathering': return '1';
      case 'bending': return '5';
      default: return '1';
    }
  };

  return (
    <ProtectedRoute>
      <main className="alert-dashboard my-4">
        <header className="dashboard-header">
          <h1>
            {/* <FaChartLine className="header-icon" /> */}
            Security Alerts
          </h1>
          <p className="subtitle">Real-time monitoring dashboard</p>
        </header>

        <div className="dashboard-content">
          <div className="alert-tabs">
            <button
              className={`tab ${activeTab === 'gathering' ? 'active' : ''}`}
              onClick={() => setActiveTab('gathering')}
            >
              <FaUsers className="tab-icon" />
              Gathering
              {gatheringAlerts.length > 0 && (
                <span className="alert-badge">{gatheringAlerts.length}</span>
              )}
            </button>
            <button
              className={`tab ${activeTab === 'height' ? 'active' : ''}`}
              onClick={() => setActiveTab('height')}
            >
              <FaRulerVertical className="tab-icon" />
              Height
              {heightAlerts.length > 0 && (
                <span className="alert-badge">{heightAlerts.length}</span>
              )}
            </button>
            <button
              className={`tab ${activeTab === 'bending' ? 'active' : ''}`}
              onClick={() => setActiveTab('bending')}
            >
              <FaChartLine className="tab-icon" />
              Bending
              {bendingAlerts.length > 0 && (
                <span className="alert-badge">{bendingAlerts.length}</span>
              )}
            </button>
          </div>

          <div className="alert-content">
            {activeTab === 'height' && renderAlertTable(heightAlerts, 'Height')}
            {activeTab === 'gathering' && renderAlertTable(gatheringAlerts, 'Gathering')}
            {activeTab === 'bending' && renderAlertTable(bendingAlerts, 'Bending')}
          </div>
        </div>

        {selectedImage && (
          <div className="image-modal" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>
                <FaTimes />
              </button>
              <img src={selectedImage} alt="Alert snapshot" />
              <div className="modal-footer">
                <span className="alert-type">
                  {activeTab === 'height' && <><FaRulerVertical /> Height Alert</>}
                  {activeTab === 'gathering' && <><FaUsers /> Gathering Alert</>}
                  {activeTab === 'bending' && <><FaChartLine /> Bending Alert</>}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}