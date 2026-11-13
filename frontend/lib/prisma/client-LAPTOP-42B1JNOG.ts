// lib/prisma/client.ts
import { PrismaClient } from "../../lib/app/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // log: ["query"], // optional
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
