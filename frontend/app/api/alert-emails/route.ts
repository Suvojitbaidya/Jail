// POST (Create) and GET (List all)
import { prisma } from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, requireAdmin } from "@/lib/middlewares/auth";
import { responseHandler } from "@/lib/utils/responseHandler";

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    requireAdmin(user);

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(responseHandler(false, "Email is required"), {
        status: 400,
      });
    }

    const newEmail = await prisma.alertEmail.create({
      data: {
        email,
      },
    });

    return NextResponse.json(
      responseHandler(true, "Alert email created", newEmail)
    );
  } catch (err: any) {
    console.error("Create AlertEmail Error:", err);
    return NextResponse.json(
      responseHandler(false, err?.message || "Internal server error"),
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    requireAdmin(user);

    const emails = await prisma.alertEmail.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      responseHandler(true, "Alert emails fetched", emails)
    );
  } catch (err: any) {
    console.error("Get AlertEmails Error:", err);
    return NextResponse.json(
      responseHandler(false, err?.message || "Internal server error"),
      { status: 500 }
    );
  }
}
