import { Alert, AlertType } from "../app/generated/prisma";
import { prisma } from "../prisma/client";

// Get all alert
export const getAllAlert = async (filter: any): Promise<Alert[]> => {
  return await prisma.alert.findMany({ where: filter });
};

export const getRecentAlert = async (type: AlertType): Promise<Alert[]> => {
  return await prisma.alert.findMany({
    where: {type: type},
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { camera: true },
  });
};
