import { prisma } from "@/lib/prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cameras = await prisma.camera.findMany({
    where: { status: "active" },
  });
}
