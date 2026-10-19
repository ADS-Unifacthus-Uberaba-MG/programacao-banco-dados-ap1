// =============================================================
// excluir.ts — Tarefa 5: excluir um livro
//
// Como rodar:  npm run excluir
//
// ⚠ Só funciona depois do model Livro + npm run db:migrate (Tarefa 1).
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // TODO (Tarefa 5a): busque um livro pelo ISBN (ou pelo id) antes de excluir.
  //   Se não existir, mostre uma mensagem e encerre com return.
  //   Veja aula-06-prisma/src/07-delete.ts.

  // TODO (Tarefa 5b): exclua esse livro com delete e mostre o título do livro excluído.
  //   Depois mostre quantos livros restaram (count).
  //   Veja aula-06-prisma/src/07-delete.ts e aula-06-prisma/src/08-count-aggregate.ts.

  // Atenção: NUNCA use deleteMany() sem where — ele apaga a tabela inteira!

  console.log("TODO: implemente as tarefas deste arquivo.");
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
