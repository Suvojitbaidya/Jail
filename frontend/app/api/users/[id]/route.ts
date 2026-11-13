import { prisma } from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { responseHandler } from "@/lib/utils/responseHandler";
import { getUserFromRequest, requireAdmin } from "@/lib/middlewares/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const user = await prisma.user.findUnique({ where: { id } });

  return NextResponse.json(
    responseHandler(true, "User fetched successfully", user)
  );
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = getUserFromRequest(req);
    requireAdmin(authUser);

    const id = parseInt(params.id);
    const body = await req.json();
    const { name, email, role } = body;

    // ✅ Check if another user has the same email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.id !== id) {
      return NextResponse.json(
        responseHandler(false, "Email is already used by another user.")
      );
    }

    // ✅ Proceed to update
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
      },
    });

    return NextResponse.json(
      responseHandler(true, "User updated successfully", updatedUser)
    );
  } catch (err: any) {
    return NextResponse.json(
      responseHandler(false, "User update failed", err?.message || "Unknown error")
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = getUserFromRequest(req);
    requireAdmin(authUser);

    const id = parseInt(params.id);
    await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      responseHandler(true, "User deleted successfully", null)
    );
  } catch (err: any) {
    return NextResponse.json(
      responseHandler(false, "User delete failed", err?.message)
    );
  }
}
