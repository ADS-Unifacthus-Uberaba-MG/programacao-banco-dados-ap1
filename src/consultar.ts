// =============================================================
// consultar.ts — TAREFA 3: consultar livros
//
// Como rodar:  npm run consultar
//
// COMO FAZER:
//   - Nos itens 3a a 3d, troque cada ___ pelo trecho de código que falta.
//   - O item 3e você escreve INTEIRO, no lugar indicado.
// Rode o "npm run db:seed" antes, para ter livros para consultar.
//
// ⚠ Só funciona depois da Tarefa 1 (model Livro + npm run db:migrate).
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // ---------------------------------------------------------
  // 3a) Liste TODOS os livros em ordem alfabética de título (A → Z).
  //     Troque o ___ pelo objeto de opções do findMany (com o orderBy).
  //     Veja aula-06-prisma/src/03-find-many.ts
  // ---------------------------------------------------------
  const todosOsLivros = await prisma.livro.findMany(___);
  console.log("=== 3a) Todos os livros (A → Z) ===");
  for (const livro of todosOsLivros) {
    console.log(`- ${livro.titulo} (${livro.autor}, ${livro.anoPublicacao})`);
  }

  // ---------------------------------------------------------
  // 3b) Busque SÓ titulo e anoPublicacao dos livros de 2000 em diante.
  //     where: o filtro "anoPublicacao maior ou igual a 2000"
  //     select: quais campos trazer
  //     Veja aula-06-prisma/src/04-find-filtros.ts
  // ---------------------------------------------------------
  const livrosRecentes = await prisma.livro.findMany({
    where: ___,
    select: ___,
  });
  console.log("\n=== 3b) Livros de 2000 em diante (só título e ano) ===");
  console.log(livrosRecentes);

  // ---------------------------------------------------------
  // 3c) Busque os livros cujo autor CONTENHA "machado",
  //     sem diferenciar maiúsculas de minúsculas.
  //     Veja aula-06-prisma/src/04-find-filtros.ts
  // ---------------------------------------------------------
  const livrosDoMachado = await prisma.livro.findMany({
    where: ___,
  });
  console.log('\n=== 3c) Livros com "machado" no autor ===');
  for (const livro of livrosDoMachado) {
    console.log(`- ${livro.titulo} (${livro.autor})`);
  }

  // ---------------------------------------------------------
  // 3d) Busque UM livro pelo ISBN (campo único).
  //     Troque o ___ pela chamada completa do Prisma (prisma.livro.???(...)).
  //     Veja aula-06-prisma/src/05-find-unique.ts
  // ---------------------------------------------------------
  const isbnProcurado = "978-85-0000-001-1"; // Dom Casmurro (vem do seed)
  const livroEncontrado = await ___;
  console.log(`\n=== 3d) Livro com ISBN ${isbnProcurado} ===`);
  if (livroEncontrado === null) {
    console.log("Nenhum livro com esse ISBN. Rode npm run db:seed primeiro.");
  } else {
    console.log(`${livroEncontrado.titulo} — ${livroEncontrado.autor}`);
  }

  // ---------------------------------------------------------
  // 3e) ESCREVA VOCÊ: mostre QUANTOS livros estão disponíveis
  //     (disponivel = true).
  //
  //     Passo a passo:
  //       1. crie uma variável com o resultado de prisma.livro.count({ where: ... })
  //       2. console.log("=== 3e) Livros disponíveis: X ===") usando a variável
  //     Veja aula-06-prisma/src/08-count-aggregate.ts
  // ---------------------------------------------------------

  // escreva o 3e aqui

  console.log("\n⚠ 3e) ainda não foi feito — apague esta linha quando terminar.");
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
