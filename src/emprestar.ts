// =============================================================
// emprestar.ts — TAREFA 4: emprestar um livro
//
// Como rodar:  npm run emprestar
//
// COMO FAZER:
//   - Nos itens 4a e 4b, troque cada ___ pelo trecho de código que falta.
//   - O item 4c você escreve INTEIRO, no lugar indicado.
// Cada vez que rodar, um livro disponível é emprestado.
//
// ⚠ Só funciona depois da Tarefa 1 (model Livro + npm run db:migrate).
// =============================================================
import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma/client";

async function main() {
  // ---------------------------------------------------------
  // 4a) Encontre o primeiro livro que esteja DISPONÍVEL.
  //     Troque o ___ pelo filtro (where) que traz só livros disponíveis.
  //     Veja aula-06-prisma/src/04-find-filtros.ts e 06-update.ts
  // ---------------------------------------------------------
  const livroDisponivel = await prisma.livro.findFirst({
    where: ___,
    orderBy: { id: "asc" },
  });

  if (!livroDisponivel) {
    console.log("Nenhum livro disponível para emprestar. Rode npm run db:seed.");
    return;
  }

  // ---------------------------------------------------------
  // 4b) "Empreste" o livro: mude disponivel para false.
  //     Troque o ___ pelo objeto do update, com where (QUAL livro:
  //     use livroDisponivel.id) e data (O QUE muda).
  //     Veja aula-06-prisma/src/06-update.ts
  // ---------------------------------------------------------
  const livroEmprestado = await prisma.livro.update(___);
  console.log("=== 4b) Livro emprestado ===");
  console.log(`${livroEmprestado.titulo} → disponivel: ${livroEmprestado.disponivel}`);

  // ---------------------------------------------------------
  // 4c) ESCREVA VOCÊ: tente emprestar um livro que NÃO existe
  //     (use a variável idInexistente) e trate o erro com try/catch.
  //
  //     Passo a passo:
  //       1. console.log com o título "=== 4c) Tentando emprestar o livro 999999 ==="
  //       2. try { ... } com o mesmo update do 4b, mas com where: { id: idInexistente }
  //       3. catch (erro) { ... }:
  //          - se for Prisma.PrismaClientKnownRequestError com o código de
  //            "registro não encontrado", mostre "Não existe livro com id 999999."
  //          - senão, throw erro;
  //     Veja aula-06-prisma/src/09-tratando-erros.ts
  // ---------------------------------------------------------
  const idInexistente = 999999;

  // escreva o 4c aqui

  console.log("\n⚠ 4c) ainda não foi feito — apague esta linha quando terminar.");
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
