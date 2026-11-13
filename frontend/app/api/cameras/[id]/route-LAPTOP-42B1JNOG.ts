// pages/api/cameras/[id].ts
import { prisma } from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, requireAdmin } from "@/lib/middlewares/auth";
import { responseHandler } from "@/lib/utils/responseHandler";

export async function GET(req: NextRequest, context: any) {
  try {
    const user = getUserFromRequest(req);
    requireAdmin(user);

    // Get id from context.params
    if (!context || !context.params) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing route parameters",
        },
        { status: 400 }
      );
    }

    const cameraId = Number(context.params.id);
    if (isNaN(cameraId)) {
      return NextResponse.json(responseHandler(false, "Invalid camera ID"), {
        status: 400,
      });
    }

    const camera = await prisma.camera.findUnique({
      where: { id: cameraId },
      include: {
        user: true,
        createdBy: true,
        updatedBy: true,
      }, // remove or modify based on actual relations
    });

    if (!camera) {
      return NextResponse.json(responseHandler(false, "Camera not found"), {
        status: 404,
      });
    }

    return NextResponse.json(
      responseHandler(true, "Camera fetched successfully", camera)
    );
  } catch (err: any) {
    console.error("Error fetching camera:", err);
    return NextResponse.json(
      responseHandler(false, err?.message || "Internal server error"),
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, context: any) {
  try {
    const user = getUserFromRequest(req);
    requireAdmin(user);

    // Get id from context.params
    if (!context || !context.params) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing route parameters",
        },
        { status: 400 }
      );
    }

    const cameraId = Number(context.params.id);
    if (isNaN(cameraId)) {
      return NextResponse.json(responseHandler(false, "Invalid camera ID"), {
        status: 400,
      });
    }

    const body = await req.json();

    const updated = await prisma.camera.update({
      where: { id: cameraId },
      data: {
        ...body,
        updatedById: user.id, // Ensure this matches your schema field name
      },
    });

    return NextResponse.json(
      responseHandler(true, "Camera updated successfully", updated)
    );
  } catch (err: any) {
    console.error("Error updating camera:", err);
    return NextResponse.json(
      responseHandler(false, err?.message || "Internal server error"),
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    const user = getUserFromRequest(req);
    requireAdmin(user);
    // Get id from context.params
    if (!context || !context.params) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing route parameters",
        },
        { status: 400 }
      );
    }
    console.log("Deleting camera with ID:", context.params.id);
    const cameraId = Number(context.params.id);
    if (isNaN(cameraId)) {
      return NextResponse.json(responseHandler(false, "Invalid camera ID"), {
        status: 400,
      });
    }
    await prisma.alert.deleteMany({
      where: { cameraId: cameraId },
    });
    await prisma.camera.delete({
      where: { id: cameraId },
    });

    return NextResponse.json(
      responseHandler(true, "Camera deleted successfully"),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error deleting camera:", err);
    return NextResponse.json(
      responseHandler(false, err?.message || "Internal server error"),
      { status: 500 }
    );
  }
}
