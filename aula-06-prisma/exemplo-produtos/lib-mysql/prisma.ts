// =============================================================
// Use este arquivo só se estiver no XAMPP (MySQL/MariaDB).
// Troque o provider do schema para mysql, instale @prisma/adapter-mariadb
// e substitua o lib/prisma.ts por este.
//
// Passo a passo:
//   1. prisma/schema.prisma  →  provider = "mysql"
//   2. npm install @prisma/adapter-mariadb@^7
//   3. copie este arquivo por cima de lib/prisma.ts
//   4. no .env, use o bloco "Plano B — MySQL/XAMPP"
//   5. npm run db:migrate -- --name criar_produtos
// =============================================================
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb"; // adaptador para MySQL/MariaDB (XAMPP usa MariaDB)
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!, // ex.: localhost
  user: process.env.DATABASE_USER!, // no XAMPP o padrão é root
  password: process.env.DATABASE_PASSWORD!, // no XAMPP o padrão é vazio ""
  database: process.env.DATABASE_NAME!, // ex.: loja
  connectionLimit: 5, // no máximo 5 conexões abertas ao mesmo tempo
});

export const prisma = new PrismaClient({ adapter });
