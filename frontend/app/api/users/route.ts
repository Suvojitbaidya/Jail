import { prisma } from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { responseHandler } from "@/lib/utils/responseHandler";
import { getUserFromRequest, requireAdmin } from "@/lib/middlewares/auth";

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  console.log({ user });
  requireAdmin(user);

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: user.id,
      },
      role: { not: "SUPER_ADMIN" },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    responseHandler(true, "User list fetched successfully", users)
  );
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    console.log({ user });
    requireAdmin(user);

    const body = await req.json();
    const { name, email, password, role } = body;

    // ✅ Check for duplicate email
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(responseHandler(false, "Email already exists"));
    }

    // (Optional) Hash password here with bcrypt
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, // Use hashedPassword in real apps
        role: (role || "USER").toUpperCase(),
      },
    });

    return NextResponse.json(
      responseHandler(true, "User created successfully", newUser)
    );
  } catch (err: any) {
    return NextResponse.json(
      responseHandler(
        false,
        "User creation failed",
        err?.message || "Unknown error"
      )
    );
  }
}
