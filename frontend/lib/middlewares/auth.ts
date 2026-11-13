// lib/auth.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function getUserFromRequest(req: NextRequest) {
  // Try Authorization header first
  const authHeader = req.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
console.log({tokenFromHeader})
  // Fallback to cookie
  const tokenFromCookie = req.cookies.get("token")?.value;

  const token = tokenFromHeader || tokenFromCookie;
  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded; // e.g. { id, email, role }
  } catch {
    return null;
  }
}

export function requireAdmin(user: any) {
  console.log("101",user)
  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}
