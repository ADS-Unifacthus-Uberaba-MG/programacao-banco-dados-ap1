// =============================================================
// excluir.ts — TAREFA 5: excluir um livro
//
// Como rodar:  npm run excluir
//
// COMO FAZER:
//   - No item 5a, troque o ___ pelo trecho de código que falta.
//   - O item 5b você escreve INTEIRO, no lugar indicado.
// Este script exclui "O Alienista" (cadastrado no npm run cadastrar).
// Rodando de novo, ele avisa que o livro não existe mais — e tudo bem.
//
// ⚠ Só funciona depois da Tarefa 1 (model Livro + npm run db:migrate).
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // ---------------------------------------------------------
  // 5a) Busque o livro pelo ISBN ANTES de excluir.
  //     Troque o ___ pelo objeto de opções do findUnique (o where).
  //     Veja aula-06-prisma/src/05-find-unique.ts
  // ---------------------------------------------------------
  const isbnParaExcluir = "978-85-0000-100-1"; // O Alienista
  const livro = await prisma.livro.findUnique(___);

  if (!livro) {
    console.log("Esse livro não existe (já foi excluído?). Rode npm run cadastrar para criá-lo de novo.");
    return;
  }

  // ---------------------------------------------------------
  // 5b) ESCREVA VOCÊ: exclua o livro e mostre quantos sobraram.
  //
  //     Passo a passo:
  //       1. exclua com prisma.livro.delete, usando o id do livro encontrado (livro.id)
  //       2. console.log("=== 5b) Livro excluído ===") e o título do livro excluído
  //       3. conte quantos livros restaram com prisma.livro.count()
  //       4. console.log("Ainda restam X livros.") usando o resultado
  //     Veja aula-06-prisma/src/07-delete.ts e 08-count-aggregate.ts
  //
  //     Atenção: NUNCA use deleteMany() sem where — ele apaga a tabela inteira!
  // ---------------------------------------------------------

  // escreva o 5b aqui

  console.log(`⚠ 5b) ainda não foi feito (livro encontrado: ${livro.titulo}) — apague esta linha quando terminar.`);
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
