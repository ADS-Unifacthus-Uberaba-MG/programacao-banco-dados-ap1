// Configuração do Prisma 7 (lida pelos comandos "prisma migrate", "prisma studio" etc.).
// No Prisma 7 a URL do banco fica AQUI, e não mais dentro do schema.prisma.
import "dotenv/config"; // carrega as variáveis do arquivo .env
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma", // onde está a "planta" do banco
  migrations: {
    path: "prisma/migrations", // onde ficam os SQLs gerados pelo migrate
    seed: "tsx prisma/seed.ts", // script que POPULA o banco (npm run db:seed)
  },
  datasource: { url: process.env["DATABASE_URL"] }, // endereço do banco (vem do .env)
});
