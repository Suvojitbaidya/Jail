// app/dashboard/cameras/page.tsx
"use client";

import ProtectedRoute from "@/components/layout/ProtectedRoute";
import CameraFeedPageClient from "./CameraFeedClient"; // your client component

export default function CameraFeedPageWrapper() {
  return (
    <ProtectedRoute>
      <CameraFeedPageClient />
    </ProtectedRoute>
  );
}
