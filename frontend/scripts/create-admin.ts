// scripts/create-admin.ts
import { prisma } from "../lib/prisma/client";
import bcrypt from "bcrypt";

async function main() {
  const email = "admin@admin.com";
  const password = "admin@123";
  const name = "Admin";

  const existingAdmin = await prisma.user.findUnique({ where: { email } });

  if (existingAdmin) {
    console.log("Admin user already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user created:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
