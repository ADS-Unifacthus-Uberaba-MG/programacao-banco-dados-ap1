// =============================================================
// emprestar.ts — Tarefa 4: emprestar e devolver um livro
//
// Como rodar:  npm run emprestar
//
// ⚠ Só funciona depois do model Livro + npm run db:migrate (Tarefa 1).
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // TODO (Tarefa 4a): encontre um livro que esteja disponível (disponivel = true).
  //   Se não houver nenhum, mostre uma mensagem e encerre com return.
  //   Veja src/06-update.ts do exemplo (busca um registro existente antes de atualizar).

  // TODO (Tarefa 4b): "empreste" o livro: atualize disponivel para false com update.
  //   Mostre o título e o novo valor de disponivel.
  //   Veja src/06-update.ts do exemplo (update com where + data).

  // TODO (Tarefa 4c): tente emprestar um livro com um id que NÃO existe (ex.: 999999)
  //   e trate o erro P2025 com try/catch.
  //   Veja src/09-tratando-erros.ts do exemplo.

  console.log("TODO: implemente as tarefas deste arquivo.");
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
