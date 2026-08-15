import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connectDatabase = async () => {
  try {
    await prisma.$connect();

    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error);
    process.exit(1);
  }
};