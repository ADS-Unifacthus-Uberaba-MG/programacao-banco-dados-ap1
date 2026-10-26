// =============================================================
// excluir.ts — TAREFA 5: excluir um livro
//
// Como rodar:  npm run excluir
//
// COMO FAZER: o código já está pronto. Troque cada ___ pelo que falta.
// Este script exclui "O Alienista" (cadastrado no npm run cadastrar).
// Rodando de novo, ele avisa que o livro não existe mais — e tudo bem.
//
// ⚠ Só funciona depois da Tarefa 1 (model Livro + npm run db:migrate).
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // ---------------------------------------------------------
  // 5a) Busque o livro pelo ISBN ANTES de excluir.
  //     Veja aula-06-prisma/src/05-find-unique.ts
  // ---------------------------------------------------------
  const isbnParaExcluir = "978-85-0000-100-1"; // O Alienista
  const livro = await prisma.livro.findUnique({
    where: { ___: isbnParaExcluir },
  });

  if (!livro) {
    console.log("Esse livro não existe (já foi excluído?). Rode npm run cadastrar para criá-lo de novo.");
    return;
  }

  // ---------------------------------------------------------
  // 5b) Exclua o livro e mostre quantos sobraram.
  //     Qual método APAGA um registro? E qual CONTA?
  //     Veja aula-06-prisma/src/07-delete.ts e 08-count-aggregate.ts
  // ---------------------------------------------------------
  const livroExcluido = await prisma.livro.___({
    where: { id: livro.id },
  });
  console.log("=== 5b) Livro excluído ===");
  console.log(livroExcluido.titulo);

  const quantidadeRestante = await prisma.livro.___();
  console.log(`Ainda restam ${quantidadeRestante} livros.`);

  // Atenção: NUNCA use deleteMany() sem where — ele apaga a tabela inteira!
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
