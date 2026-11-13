// pages/api/cameras/[id].ts
import { prisma } from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, requireAdmin } from "@/lib/middlewares/auth";
import { responseHandler } from "@/lib/utils/responseHandler";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(req);
    requireAdmin(user);

    const typeParam = context.params?.id;

    if (!typeParam) {
      return NextResponse.json(
        { success: false, error: "Missing alert type parameter." },
        { status: 400 }
      );
    }

    const type = typeParam as any; // Because "type" is an enum

    const alerts = await prisma.alert.findMany({
      where: { type },
      include: {
        camera: true, // Assuming you want to include the related Camera model
      },
    });

    if (!alerts || alerts.length === 0) {
      return NextResponse.json(responseHandler(false, "No alerts found"), {
        status: 404,
      });
    }

    return NextResponse.json(
      responseHandler(true, "Alerts fetched successfully", alerts)
    );
  } catch (err: any) {
    console.error("Error fetching alerts:", err);
    return NextResponse.json(
      responseHandler(false, err?.message || "Internal server error"),
      { status: 500 }
    );
  }
}
// export async function PUT(req: NextRequest, context: any) {
//   try {
//     const user = getUserFromRequest(req);
//     requireAdmin(user);

//     // Get id from context.params
//     if (!context || !context.params) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Missing route parameters",
//         },
//         { status: 400 }
//       );
//     }

//     const cameraId = Number(context.params.id);
//     if (isNaN(cameraId)) {
//       return NextResponse.json(responseHandler(false, "Invalid camera ID"), {
//         status: 400,
//       });
//     }

//     const body = await req.json();

//     const updated = await prisma.camera.update({
//       where: { id: cameraId },
//       data: {
//         ...body,
//         updatedById: user.id, // Ensure this matches your schema field name
//       },
//     });

//     return NextResponse.json(
//       responseHandler(true, "Camera updated successfully", updated)
//     );
//   } catch (err: any) {
//     console.error("Error updating camera:", err);
//     return NextResponse.json(
//       responseHandler(false, err?.message || "Internal server error"),
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req: NextRequest, context: any) {
//   try {
//     const user = getUserFromRequest(req);
//     requireAdmin(user);
//     // Get id from context.params
//     if (!context || !context.params) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Missing route parameters",
//         },
//         { status: 400 }
//       );
//     }

//     const cameraId = Number(context.params.id);
//     if (isNaN(cameraId)) {
//       return NextResponse.json(responseHandler(false, "Invalid camera ID"), {
//         status: 400,
//       });
//     }

//     await prisma.camera.delete({
//       where: { id: cameraId },
//     });

//     return NextResponse.json(
//       responseHandler(true, "Camera deleted successfully"),
//       { status: 200 }
//     );
//   } catch (err: any) {
//     console.error("Error deleting camera:", err);
//     return NextResponse.json(
//       responseHandler(false, err?.message || "Internal server error"),
//       { status: 500 }
//     );
//   }
// }
