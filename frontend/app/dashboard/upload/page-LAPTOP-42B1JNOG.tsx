"use client";
import Navbar from "@/components/commons/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import React, { useState, useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { addCameras } from "@/services/api";
import "./UploadPhoto.css";
import { FaCloudUploadAlt, FaCheckCircle, FaSpinner, FaPaperPlane, FaTimes, FaInfoCircle } from "react-icons/fa";

// Zod schema for validation
const photoSchema = z.object({
  photo: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    }),
  description: z.string().optional(),
});

type PhotoFormData = z.infer<typeof photoSchema>;

interface PersonIdentification {
  id: string;
  name: string;
  imageUrl: string;
  status: "verified" | "unverified" | "pending";
  details?: {
    dob?: string;
    gender?: string;
    nationality?: string;
    idType?: string;
    department?: string;
    issuedDate?: string;
  };
}

export default function UploadPage() {
  const [previewSrc, setPreviewSrc] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [identificationData, setIdentificationData] = useState<null | any>(
    null
  );
  const [showIdentification, setShowIdentification] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [showHelp, setShowHelp] = useState(false); // <-- Add this line
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PhotoFormData>({
    resolver: zodResolver(photoSchema),
  });

  const file = watch("photo");

  // Handle file selection and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setValue("photo", selectedFile);
      setPreviewSrc(URL.createObjectURL(selectedFile));
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setValue("photo", droppedFile);
      setPreviewSrc(URL.createObjectURL(droppedFile));
    }
  };

  // Add these handlers:
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle upload
  const onSubmit = async (data: PhotoFormData) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false); // reset

    try {
      const formData = new FormData();
      formData.append("image", data.photo); // Python Flask/Express expects "image"
      if (data.description) {
        formData.append("description", data.description);
      }

      const response = await fetch("http://localhost:5000/process_image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      // const result = {
      //   faces: [
      //     {
      //       "1": "Mansa Ram Shit",
      //       "2": "unknown",
      //       "3": "Suman Paramanik",
      //     },
      //   ],
      //   success: true,
      //   url: "IMG_20052025_101010.jpg",
      // };

      // Show identification data if received

      if (result && result.faces && result.faces.length > 0) {
        setIdentificationData(result);
        setShowIdentification(true);
        setTimeout(() => {
          const element = document.getElementById("identification-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 200);
      } else {
        setIdentificationData(null);
        setShowIdentification(false);
      }

      setUploadProgress(100);
      setUploadComplete(true); // set complete
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetUploader = () => {
    reset();
    setPreviewSrc("");
    setUploadProgress(0);
    setIsUploading(false);
    setShowIdentification(false);
    setIdentificationData(null);
    setUploadComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fileInfo = file
    ? {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      type: file.type.split("/")[1].toUpperCase(),
    }
    : { name: "", size: "", type: "" };

  return (
    <ProtectedRoute>
      <section className="upload_photo_main">
        <div className="container">
          <div className="upload-container">
            <div className="upload-header">
              <i className="fas fa-camera-retro"></i>
              <h2>Jail CCTV Photo Upload</h2>
              <p className="text-muted">
                Secure photo submission for monitoring purposes
              </p>
              <button
                className="btn btn-link text-primary"
                onClick={() => setShowHelp(!showHelp)}
              >
                <FaInfoCircle className="me-2" />
                {showHelp ? "Hide Instructions" : "Show Instructions"}
              </button>
              <div className="text-start">
                {showHelp && (
                  <div className="alert alert-info mt-3">
                    <h5>Upload Instructions:</h5>
                    <ul className="ms-0 ps-4">
                      <li>Only JPG, PNG images are accepted</li>
                      <li>Maximum file size: 5MB</li>
                      <li>Ensure faces are clearly visible</li>
                      <li>Uploaded images are securely processed</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                ref={dropZoneRef}
                className={`upload-area ${file ? "has-file" : ""} ${isDragging ? "drag-active" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  id="fileInput"
                  accept="image/*"
                  className="visually-hidden"
                  onChange={handleFileChange}
                />
                <div className="upload-icon">
                  <FaCloudUploadAlt size={48} />
                </div>
                <div className="upload-text">
                  {file ? (
                    <>
                      <span className="file-ready">File ready for upload</span>
                      <span className="change-file">Click to change file</span>
                    </>
                  ) : (
                    <>
                      {isDragging ? (
                        <span className="file-ready">Drop your photo here</span>
                      ) : (
                        <>
                          Drag & drop your photo here{" "}
                          <span>or click to browse files</span>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              {errors.photo && (
                <div className="alert alert-danger mt-2">
                  {errors.photo.message as string}
                </div>
              )}

              {previewSrc && (
                <div className="preview-container">
                  <img
                    className="image-preview"
                    src={previewSrc}
                    alt="Preview"
                  />
                  <div className="file-info">
                    <p>
                      <strong>Name:</strong> {fileInfo.name}
                    </p>
                    <p>
                      <strong>Size:</strong> {fileInfo.size}
                    </p>
                    <p>
                      <strong>Type:</strong> {fileInfo.type}
                    </p>
                  </div>
                </div>
              )}

              <div
                className={`progress-container ${isUploading || uploadComplete ? "visible" : ""}`}
              >
                <div className="progress">
                  <div
                    className={
                      `progress-bar` +
                      (isUploading && !uploadComplete ? " progress-bar-striped progress-bar-animated" : "") +
                      (uploadComplete ? " bg-success" : "")
                    }
                    role="progressbar"
                    style={{ width: `${Math.floor(uploadProgress)}%` }}
                    aria-valuenow={Math.floor(uploadProgress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    {uploadComplete ? "Complete!" : `${Math.floor(uploadProgress)}%`}
                  </div>
                </div>
                {uploadComplete && (
                  <div className="text-center text-success mt-2">
                    <FaCheckCircle className="me-2" />
                    Upload successful!
                  </div>
                )}
              </div>

              <div className="d-flex gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-submit flex-grow-1"
                  disabled={!file || isUploading}
                >
                  {isUploading ? (
                    <>
                      <FaSpinner className="fa-spin me-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="me-2" />
                      Submit Photo
                    </>
                  )}
                </button>

                {file && !isUploading && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={resetUploader}
                  >
                    <FaTimes className="me-2" />
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {showIdentification && identificationData && (
        <div className="container mt-5" id="identification-section">
          <div className="text-center mb-3">
            <h2 className="fw-bold mb-3">Person Identification</h2>
            <p className="lead text-muted">
              Verify individual identity with our secure identification system
            </p>
          </div>
          <div className="row mt-3 mx-4 mb-4 g-4 justify-content-center">
            <div className="col-md-5">
              <div className="identification-card bg-white">
                <div className="position-relative">
                  <img
                    src={`/api/media/3_${identificationData.url}`}
                    alt="Person photo"
                    className="person-image"
                  />
                  <div className="id-badge">ID</div>
                </div>

                <div className="id-details">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    {/* {JSON.stringify(identificationData.faces)} */}
                    {identificationData &&
                      identificationData.faces.length > 0 &&
                      identificationData.faces.map((face: any, index: number) => (
                        <div key={index} className="w-100">
                          <h4 className="text-center mb-3">Possible Matches</h4>
                          <div className="list-group">
                            {Object.values(face).map((name, i) => (
                              <div
                                key={i}
                                className="list-group-item list-group-item-action bg-light"
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <span>{(name as string).toUpperCase()}</span>
                                  {String(name).toLowerCase() === "unknown" ? (
                                    <span className="badge bg-secondary">Possible</span>
                                  ) : (
                                    <span className="badge bg-success">Top Match</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    {/* <span className={`verification-badge ${identificationData.status}`}>
                                            {identificationData.status.charAt(0).toUpperCase() + identificationData.status.slice(1)}
                                        </span> */}
                  </div>

                  {/*  {identificationData.details && (
                                        <>
                                            <hr />

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="id-field">
                                                        <div className="id-label">Date of Birth</div>
                                                        <div className="id-value">{identificationData.details.dob}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="id-field">
                                                        <div className="id-label">Gender</div>
                                                        <div className="id-value">{identificationData.details.gender}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mt-2">
                                                <div className="col-md-6">
                                                    <div className="id-field">
                                                        <div className="id-label">Nationality</div>
                                                        <div className="id-value">{identificationData.details.nationality}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="id-field">
                                                        <div className="id-label">ID Type</div>
                                                        <div className="id-value">{identificationData.details.idType}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="id-field mt-3">
                                                <div className="id-label">Department</div>
                                                <div className="id-value">{identificationData.details.department}</div>
                                            </div>

                                            <div className="id-field">
                                                <div className="id-label">Issued Date</div>
                                                <div className="id-value">{identificationData.details.issuedDate}</div>
                                            </div>

                                            <div className="mt-4 pt-3 border-top">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <button className="btn btn-outline-primary w-100">
                                                            Request Verification
                                                        </button>
                                                    </div>
                                                    <div className="col-6">
                                                        <button className="btn btn-primary w-100">View Documents</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
