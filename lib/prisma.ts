// Cria UMA conexão com o banco e exporta o "prisma" para os outros arquivos usarem.
// Todos os scripts fazem: import { prisma } from "../lib/prisma";
import "dotenv/config"; // carrega o DATABASE_URL do arquivo .env
import { PrismaPg } from "@prisma/adapter-pg"; // "adaptador" que fala com o PostgreSQL (usa o driver pg da Aula 3)
import { PrismaClient } from "../generated/prisma/client"; // no Prisma 7 o client vem daqui, NÃO de "@prisma/client"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });
