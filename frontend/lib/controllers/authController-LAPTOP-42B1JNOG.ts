import { prisma } from "@/lib/prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/utils/jwt";

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: { id: user.id, email: user.email, role: user.role, name: user.name },
  };
};
