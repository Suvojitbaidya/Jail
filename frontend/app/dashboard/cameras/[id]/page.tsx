"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCameras, getCameras } from "@/lib/services/camera.service";
import { toast } from "react-hot-toast";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import "../new/AddCamera.css";

const cameraSchema = z.object({
  name: z.string().min(1, "Camera name is required").max(100),
  location: z.string().min(1, "Location is required").max(200),
  ipAddress: z
    .string()
    .optional()
    .refine(
      (val) =>
        val === undefined ||
        val === "" ||
        z.string().ip().safeParse(val).success,
      { message: "Invalid IP address" }
    ),
  protocol: z.string().optional(),
  port: z.coerce.number().optional(),
  type: z.string().min(1, "Camera type is required"),
  status: z.enum(["active", "inactive", "maintenance"]),
  heightThreshold: z.coerce.number().min(0.1, "Height threshold is required"),
  alertThreshold: z.coerce.number().min(0.1, "Alert threshold is required"),
  cameraUrl: z.string().min(1, "Camera URL is required").url("Invalid URL"),
});

type CameraFormData = z.infer<typeof cameraSchema>;

export default function EditCamera() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [loading, setLoading] = useState(true);
  const [camera, setCamera] = useState<CameraFormData | null>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CameraFormData>({
    resolver: zodResolver(cameraSchema),
  });

  useEffect(() => {
    async function fetchCamera() {
      if (!id) return;

      try {
        const cameraData = await getCameras(Number(id));
        console.log("Camera Data:", cameraData);

        if (cameraData?.data) {
          const sanitizedData = Object.fromEntries(
            Object.entries(cameraData.data).map(([key, value]) => {
              // Set null to "" only for ipAddress and protocol, otherwise keep as is
              if ((key === "ipAddress" || key === "protocol") && value === null)
                return [key, ""];
              return [key, value];
            })
          );
          console.log("Sanitized Data:", sanitizedData);
          setCamera(sanitizedData as CameraFormData);
          reset(sanitizedData);
        }

        // if (cameraData) {
        //     setCamera(cameraData);
        //     reset(cameraData.data);
        // }
      } catch (error) {
        toast.error("Failed to load camera data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCamera();
  }, [id, reset]);

  useEffect(() => {
    console.log("Camera state:", camera);
  }, [camera]);

  const onSubmit = async (data: CameraFormData) => {
    if (!id) return;

    try {
      await updateCameras(Number(id), data);
      toast.success("Camera updated successfully!");
      reset(data);
      router.push(`/dashboard/cameras/${id}`);
    } catch (error) {
      console.error("Error updating camera:", error);
      toast.error("Failed to update camera");
    }
  };

  if (loading)
    return <div className="text-center py-10">Loading camera data...</div>;
  if (!camera) return <div className="text-center py-10">Camera not found</div>;

  return (
    <ProtectedRoute>
      <div className="add-camera-container">
        <main className="add-camera-main">
          <h1 className="add-camera-title">Edit Surveillance Camera</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="camera-form">
            <div className="form-row">
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="name">Camera Name*</label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="e.g., Gate Camera 01"
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name.message}</span>
                  )}
                </div>
              </div>

              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="location">Location*</label>
                  <select id="location" {...register("location")}>
                    <option value="">Select location</option>
                    <option value="normal">Normal</option>
                    <option value="wallside">Wall Side</option>
                  </select>
                  {errors.location && (
                    <span className="error-message">
                      {errors.location.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="ipAddress">IP Address</label>
                  <input
                    type="text"
                    id="ipAddress"
                    {...register("ipAddress")}
                    placeholder="e.g., 192.168.1.101"
                  />
                  {errors.ipAddress && (
                    <span className="error-message">
                      {errors.ipAddress.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="port">Port</label>
                  <input
                    type="number"
                    id="port"
                    {...register("port")}
                    placeholder="e.g., 8080"
                  />
                  {errors.port && (
                    <span className="error-message">{errors.port.message}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="type">Camera Type*</label>
                  <select id="type" {...register("type")}>
                    <option value="">Select Type</option>
                    <option value="link">Link</option>
                    <option value="camera">Camera</option>
                  </select>
                  {errors.type && (
                    <span className="error-message">{errors.type.message}</span>
                  )}
                </div>
              </div>

              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="protocol">Protocol</label>
                  <input
                    type="text"
                    id="protocol"
                    {...register("protocol")}
                    placeholder="e.g., RTSP, HTTP"
                  />
                  {errors.protocol && (
                    <span className="error-message">
                      {errors.protocol.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="status">Status*</label>
                  <select id="status" {...register("status")}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                  {errors.status && (
                    <span className="error-message">
                      {errors.status.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="heightThreshold">Height Threshold*</label>
                  <input
                    type="number"
                    id="heightThreshold"
                    step="any"
                    {...register("heightThreshold")}
                    placeholder="e.g., 5.5"
                  />
                  {errors.heightThreshold && (
                    <span className="error-message">
                      {errors.heightThreshold.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="alertThreshold">Alert Threshold*</label>
                  <input
                    type="number"
                    id="alertThreshold"
                    step="any"
                    {...register("alertThreshold")}
                    placeholder="e.g., 10"
                  />
                  {errors.alertThreshold && (
                    <span className="error-message">
                      {errors.alertThreshold.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="cameraUrl">Camera URL*</label>
                  <input
                    type="url"
                    id="cameraUrl"
                    {...register("cameraUrl")}
                    placeholder="e.g., http://192.168.1.101:8080/stream"
                  />
                  {errors.cameraUrl && (
                    <span className="error-message">
                      {errors.cameraUrl.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full">
              <button
                type="submit"
                className="submit-button w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating Camera..." : "Update Camera"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  );
}
