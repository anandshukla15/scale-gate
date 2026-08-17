import { cp, mkdir } from "node:fs/promises";

await mkdir("dist/generated", { recursive: true });

await cp(
  "src/generated/prisma",
  "dist/generated/prisma",
  { recursive: true }
);

console.log("Prisma Client copied to dist/generated/prisma");