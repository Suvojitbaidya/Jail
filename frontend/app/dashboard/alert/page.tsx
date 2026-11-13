"use client";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { Camera } from "@/lib/app/generated/prisma";
import io from "socket.io-client";
// import { FaEye } from "react-icons/fa";
import "./Alert.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getRecentAlert } from "@/lib/services/alert.service";
import toast from "react-hot-toast";

interface CameraData {
  serialNo: number;
  cameraName: string;
  detectPeople: number;
  imageUrl: string;
}

interface AlertData {
  id: number;
  cameraId: number;
  noOfPeople: number;
  url: string;
}

export default function AlertPage() {
  const [cameraData, setCameraData] = useState<CameraData[]>([
    {
      serialNo: 61,
      cameraName: "Cam5",
      detectPeople: 1,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1727265732974-3b19b0c41f96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      serialNo: 60,
      cameraName: "Cam5",
      detectPeople: 2,
      imageUrl: "/images/cam5-60.jpg",
    },
    {
      serialNo: 59,
      cameraName: "Cam5",
      detectPeople: 2,
      imageUrl: "/images/cam5-59.jpg",
    },
    {
      serialNo: 58,
      cameraName: "Cam5",
      detectPeople: 2,
      imageUrl: "/images/cam5-58.jpg",
    },
    {
      serialNo: 57,
      cameraName: "Cam5",
      detectPeople: 2,
      imageUrl: "/images/cam5-57.jpg",
    },
    {
      serialNo: 56,
      cameraName: "Cam5",
      detectPeople: 1,
      imageUrl: "/images/cam5-56.jpg",
    },
    {
      serialNo: 55,
      cameraName: "Cam5",
      detectPeople: 1,
      imageUrl: "/images/cam5-55.jpg",
    },
    {
      serialNo: 54,
      cameraName: "Cam5",
      detectPeople: 3,
      imageUrl: "/images/cam5-54.jpg",
    },
    {
      serialNo: 53,
      cameraName: "Cam5",
      detectPeople: 1,
      imageUrl: "/images/cam5-53.jpg",
    },
  ]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [heightAlerts, setHeightAlerts] = useState<any[]>([]);
  const [gatheringAlerts, setGatheringAlerts] = useState<any[]>([]);
  const [camera, setCamera] = useState<Camera[]>([]);
  const searchParams = useSearchParams();
  let type:string|null = 'all';
  if(searchParams){
   type = searchParams.get('type'); 
  }
  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

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
      setGatheringAlerts(data?.recentGatheringAlert)
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Uncomment if you need this functionality
  // useEffect(() => {
  //   const getAlerts = async () => {
  //     try {
  //       const type = searchParams?.get("type") || "HEIGHT";
  //       const res = await getRecentAlert(type);
  //       console.log(res);
  //     } catch (err: any) {
  //       const message = err?.response?.data?.message || "fetch failed.";
  //       toast.error(message);
  //     }
  //   };
  //   getAlerts();
  // }, [searchParams]);

  return (
    <ProtectedRoute>
      <section className="camera-detection-section">
        <div className="camera-table-container">
          <h4 className="camera-table-title">Camera Detection Data</h4>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Serial No.</th>
                  <th>Camera Name</th>
                  <th>Detect People</th>
                  <th>Alert Type</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>

                {(type=='h' || type=='all') && heightAlerts.map((alert, index) => (
                  <tr key={alert.id} className="data-row">
                    <td className="data-cell">{alert.id}</td>
                    <td>{`${alert.camera?.name}`}</td>
                    <td className="data-cell">
                      <span
                        className={`people-count ${
                          alert.noOfPeople > 10 ? "high-count" : ""
                        }`}
                      >
                        {alert.noOfPeople}
                      </span>
                    </td>
                    <td>Height</td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() =>
                          openModal(`/api/media/2_${alert.url}`)
                        } // update this path
                      >
                        <i className="fas fa-eye"></i> View
                      </button>
                    </td>
                  </tr>
                ))}
                {(type=='c' || type=='all') && gatheringAlerts.map((alert, index) => (
                  <tr key={alert.id} className="data-row">
                    <td className="data-cell">{alert.id}</td>
                    <td>{`${alert.camera?.name}`}</td>
                    <td className="data-cell">
                      <span
                        className={`people-count ${
                          alert.noOfPeople > 10 ? "high-count" : ""
                        }`}
                      >
                        {alert.noOfPeople}
                      </span>
                    </td>
                    <td>Gathering</td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() =>
                          openModal(`/api/media/1_${alert.url}`)
                        } // update this path
                      >
                        <i className="fas fa-eye"></i> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="image-modal-overlay" onClick={closeModal}>
            <div
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-button" onClick={closeModal}>
                &times;
              </button>
              <img
                src={selectedImage}
                alt="Camera view"
                className="modal-image"
              />
              <div className="image-details">
                <p>
                  Camera:{" "}
                  {
                    cameraData.find((cam) => cam.imageUrl === selectedImage)
                      ?.cameraName
                  }
                </p>
                <p>
                  People detected:{" "}
                  {
                    cameraData.find((cam) => cam.imageUrl === selectedImage)
                      ?.detectPeople
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </ProtectedRoute>
  );
}
