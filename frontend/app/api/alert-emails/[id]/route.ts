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

    const id = Number(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json(responseHandler(false, "Invalid ID"), {
        status: 400,
      });
    }

    const emailEntry = await prisma.alertEmail.findUnique({
      where: { id },
    });

    if (!emailEntry) {
      return NextResponse.json(
        responseHandler(false, "Alert email not found"),
        { status: 404 }
      );
    }

    return NextResponse.json(
      responseHandler(true, "Alert email fetched", emailEntry)
    );
  } catch (err: any) {
    console.error("Get AlertEmail Error:", err);
    return NextResponse.json(
      responseHandler(false, err?.message || "Internal server error"),
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(req);
    requireAdmin(user);

    const id = Number(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json(responseHandler(false, "Invalid ID"), {
        status: 400,
      });
    }

    const body = await req.json();
    const { email } = body;

    const updated = await prisma.alertEmail.update({
      where: { id },
      data: {
        email,
      },
    });

    return NextResponse.json(
      responseHandler(true, "Alert email updated", updated)
    );
  } catch (err: any) {
    console.error("Update AlertEmail Error:", err);
    return NextResponse.json(
      responseHandler(false, err?.message || "Internal server error"),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const user = getUserFromRequest(req);
    requireAdmin(user);

    const id = Number(context.params.id);
    if (isNaN(id)) {
      return NextResponse.json(responseHandler(false, "Invalid ID"), {
        status: 400,
      });
    }

    await prisma.alertEmail.delete({
      where: { id },
    });

    return NextResponse.json(
      responseHandler(true, "Alert email deleted successfully")
    );
  } catch (err: any) {
    console.error("Delete AlertEmail Error:", err);
    return NextResponse.json(
      responseHandler(false, err?.message || "Internal server error"),
      { status: 500 }
    );
  }
}
