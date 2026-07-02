import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: `file:${path.join(__dirname, "prisma", "dev.db")}`,
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
