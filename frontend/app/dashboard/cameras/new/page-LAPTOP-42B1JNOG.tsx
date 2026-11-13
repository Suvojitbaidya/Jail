"use client";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useState, FormEvent } from "react";
import Head from "next/head";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addCameras } from "@/lib/services/camera.service";
import "./AddCamera.css";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

// Define types and schema
type CameraType = "fixed" | "ptz" | "thermal" | "dome";
type CameraStatus = "active" | "inactive" | "maintenance";
type AIFeature =
    | "face_recognition"
    | "motion_detection"
    | "object_tracking"
    | "crowd_analysis";
type JailZone =
    | "entrance"
    | "general"
    | "hallway"
    | "yard"
    | "cells"
    | "visitation";

const cameraSchema = z.object({
    name: z.string().min(1, "Camera name is required").max(100),
    location: z.string().min(1, "Location is required").max(200),
    ipAddress: z
        .string()
        .optional()
        .refine(
            (val) => val === undefined || val === "" || z.string().ip().safeParse(val).success,
            { message: "Invalid IP address" }
        ),
    port: z.coerce.number().optional(),
    type: z.string().min(1, "Camera type is required"),
    protocol: z.string().optional(),
    status: z.enum(["active", "inactive", "maintenance"]),
    heightThreshold: z.coerce.number().min(0.1, "Height threshold is required"), // number, not string
    alertThreshold: z.coerce.number().min(0.1, "Alert threshold is required"), // new field
    cameraUrl: z.string().min(1, "Camera URL is required").url("Invalid URL"), // new field
});

type CameraFormData = z.infer<typeof cameraSchema>;

export default function AddCamera() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,        // <-- add this
        setValue,
    } = useForm<CameraFormData>({
        resolver: zodResolver(cameraSchema),
        defaultValues: {
            status: "active",
        },
    });

    const onSubmit = async (data: CameraFormData) => {
        try {
            const finalData = { ...data, protocol: "rtsp" };
            await addCameras(finalData);
            toast.success("Camera added successfully!");
            reset();
        } catch (error) {
            console.error("Error adding camera:", error);
            toast.error("Error adding camera. Please try again.");
        }
    };


    // inside AddCamera()
    useEffect(() => {
        if (watch("ipAddress") && watch("port")) {
            const username = "admin";
            const password = "Mztpl123";
            const streamPath = "stream1?transport=tcp";
            const ip = watch("ipAddress");
            const port = watch("port") || 554;

            const url = `rtsp://${username}:${password}@${ip}:${port}/${streamPath}`;
            setValue("cameraUrl", url, { shouldValidate: true });
        }
    }, [watch("ipAddress"), watch("port")]);

    // const onSubmit = async (data: CameraFormData) => {
    //     try {
    //         const res = await fetch("http://localhost:5005/cameras", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(data),
    //         });

    //         if (!res.ok) {
    //             const errorData = await res.json();
    //             throw new Error(errorData.message || "Failed to add camera");
    //         }

    //         toast.success("Camera added successfully!");
    //         reset();
    //     } catch (error) {
    //         console.error("Error adding camera:", error);
    //         const errorMessage =
    //             typeof error === "object" && error !== null && "message" in error
    //                 ? String((error as { message?: string }).message)
    //                 : "Error adding camera. Please try again.";
    //         toast.error(errorMessage);
    //     }
    // };



    return (
        <ProtectedRoute>
            <div className="add-camera-container">
                <main className="add-camera-main">
                    <h1 className="add-camera-title">Add New Surveillance Camera</h1>

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
                                        value={554}
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
                                        value={"RTSP"}
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
                                        {/* <option value="maintenance">Maintenance</option> */}
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
                                        placeholder="Auto-generated"
                                        // readOnly
                                    />
                                    {errors.cameraUrl && (
                                        <span className="error-message">{errors.cameraUrl.message}</span>
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
                                {isSubmitting ? "Adding Camera..." : "Add Camera"}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </ProtectedRoute>
    );
}
