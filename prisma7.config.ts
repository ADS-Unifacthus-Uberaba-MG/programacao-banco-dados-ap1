// Configuração do Prisma 7 (lida pelos comandos "prisma migrate", "prisma studio" etc.).
// No Prisma 7 a URL do banco fica AQUI, e não mais dentro do schema.prisma.
import "dotenv/config"; // carrega as variáveis do arquivo .env
import { defineConfig } from "prisma/config";

// Aviso amigável: sem o DATABASE_URL o Prisma não sabe qual banco usar.
// Acontece quando o .env não existe, ou quando é um .env antigo (Aula 3/4) sem essa linha.
if (!process.env["DATABASE_URL"]) {
  console.warn("\n⚠  DATABASE_URL não encontrado no arquivo .env desta pasta.");
  console.warn("   Crie (ou sobrescreva) o .env a partir do modelo:");
  console.warn("     Windows:     copy .env.example .env");
  console.warn("     Linux/Mac:   cp .env.example .env\n");
}

export default defineConfig({
  schema: "prisma/schema.prisma", // onde está a "planta" do banco
  migrations: {
    path: "prisma/migrations", // onde ficam os SQLs gerados pelo migrate
    seed: "tsx prisma/seed.ts", // script que POPULA o banco (npm run db:seed)
  },
  datasource: { url: process.env["DATABASE_URL"] }, // endereço do banco (vem do .env)
});
