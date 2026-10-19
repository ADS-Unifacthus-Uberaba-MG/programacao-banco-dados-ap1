// =============================================================
// consultar.ts — Tarefa 3: consultar livros
//
// Como rodar:  npm run consultar
//
// ⚠ Só funciona depois do model Livro + npm run db:migrate (Tarefa 1).
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // TODO (Tarefa 3a): liste TODOS os livros em ordem alfabética de título.
  //   Veja src/03-find-many.ts do exemplo (findMany + orderBy).

  // TODO (Tarefa 3b): busque só titulo e anoPublicacao dos livros de 2000 em diante.
  //   Veja src/04-find-filtros.ts do exemplo (select + gte).

  // TODO (Tarefa 3c): busque os livros cujo autor contenha um pedaço de nome
  //   (ex.: "machado"), sem diferenciar maiúsculas de minúsculas.
  //   Veja src/04-find-filtros.ts do exemplo (contains + mode: "insensitive").

  // TODO (Tarefa 3d): busque UM livro pelo ISBN e trate o caso de não encontrar (null).
  //   Veja src/05-find-unique.ts do exemplo (findUnique + if).

  // TODO (Tarefa 3e): mostre quantos livros estão disponíveis (disponivel = true).
  //   Veja src/08-count-aggregate.ts do exemplo (count + where).

  console.log("TODO: implemente as tarefas deste arquivo.");
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
