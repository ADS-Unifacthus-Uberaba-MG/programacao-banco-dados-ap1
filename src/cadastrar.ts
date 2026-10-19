// =============================================================
// cadastrar.ts — Tarefa 2: cadastrar livros
//
// Como rodar:  npm run cadastrar
//
// ⚠ Este arquivo só vai funcionar DEPOIS que você criar o model Livro
//   no prisma/schema.prisma e rodar o npm run db:migrate (Tarefa 1).
//   Até lá, "prisma.livro" aparece sublinhado em vermelho — é normal.
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // TODO (Tarefa 2a): cadastre UM livro com create, preenchendo todos os campos
  //   obrigatórios (titulo, autor, isbn, anoPublicacao) e uma sinopse.
  //   Mostre no console o livro criado (id, disponivel e criadoEm vêm sozinhos).
  //   Veja aula-06-prisma/src/01-create.ts.

  // TODO (Tarefa 2b): cadastre pelo menos mais 4 livros de uma vez com createMany.
  //   Varie os anos (alguns antes de 2000, outros de 2000 em diante) e deixe
  //   pelo menos um SEM sinopse. Mostre quantos foram inseridos (count).
  //   Veja aula-06-prisma/src/02-create-many.ts.

  // TODO (Tarefa 2c): tente cadastrar um livro com um ISBN que JÁ existe.
  //   Use try/catch e trate o erro P2002 (violação de @unique) com uma mensagem
  //   amigável, por exemplo: "Já existe um livro com este ISBN!".
  //   Veja aula-06-prisma/src/09-tratando-erros.ts (import { Prisma } + instanceof).

  console.log("TODO: implemente as tarefas deste arquivo.");
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
