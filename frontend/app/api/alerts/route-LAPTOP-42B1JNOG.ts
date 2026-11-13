import { getRecentAlert } from "@/lib/controllers/alertController";
import { responseHandler } from "@/lib/utils/responseHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const alerts = await getRecentAlert();
  return NextResponse.json(
    responseHandler(true, "Camera list has been fetched successfully", alerts)
  );
}
