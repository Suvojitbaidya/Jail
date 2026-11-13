// pages/api/cameras/index.ts
import { prisma } from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, requireAdmin } from "@/lib/middlewares/auth";
import { responseHandler } from "@/lib/utils/responseHandler";
import { Location } from "@/lib/app/generated/prisma/client"; //

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const locationParam = searchParams.get("location");

    // safer enum check
    let location: Location | undefined;
    try {
      if (
        locationParam &&
        Object.values(Location as any).includes(locationParam)
      ) {
        location = locationParam as Location;
      }
    } catch (e) {
      console.warn("⚠️ Location enum check failed:", e);
    }

    console.log("👉 Location param received:", locationParam);
    console.log("👉 Location used in query:", location);

    const cameras = await prisma.camera.findMany({
      where: location ? { location } : {},
    });

    console.log("✅ Cameras fetched:", cameras.length);

    return NextResponse.json(
      responseHandler(true, "Camera list has been fetched successfully", cameras)
    );
  } catch (err: any) {
    console.error("❌ Camera GET error full dump:", err);
    return NextResponse.json(
      responseHandler(false, "Failed to fetch cameras", err?.message || err),
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    requireAdmin(user);

    const body = await req.json();

    const camera = await prisma.camera.create({
      data: {
        name: body.name,
        location: body.location,
        ipAddress: body.ipAddress,
        port: body.port,
        type: body.type,
        protocol: body.protocol,
        status: body.status,
        userId: user.id,
        createdById: user.id,
        updatedById: user.id,
        heightThreshold: body.heightThreshold,
        alertThreshold: body.alertThreshold,
        cameraUrl: body.cameraUrl,
      },
    });

    return NextResponse.json(
      responseHandler(true, "Camera has been added successfully", camera)
    );
  } catch (err: any) {
    console.error("Camera creation error:", err);
    return NextResponse.json(
      responseHandler(
        false,
        "Camera add error",
        err?.message || "Unknown error"
      )
    );
  }
}
