// =============================================================
// emprestar.ts — TAREFA 4: emprestar um livro
//
// Como rodar:  npm run emprestar
//
// COMO FAZER: o código já está pronto. Troque cada ___ pelo que falta.
// Cada vez que rodar, um livro disponível é emprestado.
//
// ⚠ Só funciona depois da Tarefa 1 (model Livro + npm run db:migrate).
// =============================================================
import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma/client";

async function main() {
  // ---------------------------------------------------------
  // 4a) Encontre um livro que esteja DISPONÍVEL.
  //     Qual campo diz se o livro está disponível? Veja aula-06-prisma/src/06-update.ts
  // ---------------------------------------------------------
  const livroDisponivel = await prisma.livro.findFirst({
    where: { ___: true },
    orderBy: { id: "asc" },
  });

  if (!livroDisponivel) {
    console.log("Nenhum livro disponível para emprestar. Rode npm run db:seed.");
    return;
  }

  // ---------------------------------------------------------
  // 4b) "Empreste" o livro: mude disponivel para false.
  //     Qual método ATUALIZA um registro? Veja aula-06-prisma/src/06-update.ts
  // ---------------------------------------------------------
  const livroEmprestado = await prisma.livro.___({
    where: { id: livroDisponivel.id },
    data: { disponivel: ___ },
  });
  console.log("=== 4b) Livro emprestado ===");
  console.log(`${livroEmprestado.titulo} → disponivel: ${livroEmprestado.disponivel}`);

  // ---------------------------------------------------------
  // 4c) Tente emprestar um livro que NÃO existe e trate o erro.
  //     Qual é o código do erro "registro não encontrado"?
  //     Veja aula-06-prisma/src/09-tratando-erros.ts
  // ---------------------------------------------------------
  const idInexistente = 999999;
  console.log(`\n=== 4c) Tentando emprestar o livro ${idInexistente}, que não existe ===`);
  try {
    await prisma.livro.update({
      where: { id: idInexistente },
      data: { disponivel: false },
    });
    console.log("Emprestou (isso não deveria acontecer!).");
  } catch (erro) {
    if (erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === "___") {
      console.log(`Não existe livro com id ${idInexistente}.`);
    } else {
      throw erro;
    }
  }
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
