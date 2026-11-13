// pages/api/cameras/index.ts
import { prisma } from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, requireAdmin } from "@/lib/middlewares/auth";
import { responseHandler } from "@/lib/utils/responseHandler";
import { Location } from "@/lib/app/generated/prisma/client"; //

export async function GET(req: NextRequest) {
  // const user = getUserFromRequest(req);
  // requireAdmin(user);

  const { searchParams } = new URL(req.url);
  const locationParam = searchParams.get("location");

  const location =
    locationParam && Object.values(Location).includes(locationParam as Location)
      ? (locationParam as Location)
      : undefined;

  const cameras = await prisma.camera.findMany({
    where: location ? { location } : {},
  });

  return NextResponse.json(
    responseHandler(true, "Camera list has been fetched successfully", cameras)
  );
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
