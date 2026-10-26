// =============================================================
// consultar.ts — TAREFA 3: consultar livros
//
// Como rodar:  npm run consultar
//
// COMO FAZER: o código já está pronto. Troque cada ___ pelo que falta.
// Rode o "npm run db:seed" antes, para ter livros para consultar.
//
// ⚠ Só funciona depois da Tarefa 1 (model Livro + npm run db:migrate).
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // ---------------------------------------------------------
  // 3a) Liste TODOS os livros em ordem alfabética de título.
  //     Por qual campo ordenar? Veja aula-06-prisma/src/03-find-many.ts
  // ---------------------------------------------------------
  const todosOsLivros = await prisma.livro.findMany({
    orderBy: { ___: "asc" }, // "asc" = A até Z
  });
  console.log("=== 3a) Todos os livros (A → Z) ===");
  for (const livro of todosOsLivros) {
    console.log(`- ${livro.titulo} (${livro.autor}, ${livro.anoPublicacao})`);
  }

  // ---------------------------------------------------------
  // 3b) Busque só titulo e anoPublicacao dos livros de 2000 em diante.
  //     Qual operador é "maior ou igual"? Veja aula-06-prisma/src/04-find-filtros.ts
  // ---------------------------------------------------------
  const livrosRecentes = await prisma.livro.findMany({
    where: { anoPublicacao: { ___: 2000 } },
    select: { titulo: true, ___: true }, // quais campos trazer
  });
  console.log("\n=== 3b) Livros de 2000 em diante (só título e ano) ===");
  console.log(livrosRecentes);

  // ---------------------------------------------------------
  // 3c) Busque os livros cujo autor CONTENHA "machado",
  //     sem diferenciar maiúsculas de minúsculas.
  //     Veja aula-06-prisma/src/04-find-filtros.ts
  // ---------------------------------------------------------
  const livrosDoMachado = await prisma.livro.findMany({
    where: { autor: { ___: "machado", mode: "insensitive" } },
  });
  console.log('\n=== 3c) Livros com "machado" no autor ===');
  for (const livro of livrosDoMachado) {
    console.log(`- ${livro.titulo} (${livro.autor})`);
  }

  // ---------------------------------------------------------
  // 3d) Busque UM livro pelo ISBN (campo único) e trate quando não encontrar.
  //     Qual método busca UM registro por campo único? Veja aula-06-prisma/src/05-find-unique.ts
  // ---------------------------------------------------------
  const isbnProcurado = "978-85-0000-001-1"; // Dom Casmurro (vem do seed)
  const livroEncontrado = await prisma.livro.___({
    where: { isbn: isbnProcurado },
  });
  console.log(`\n=== 3d) Livro com ISBN ${isbnProcurado} ===`);
  if (livroEncontrado === null) {
    console.log("Nenhum livro com esse ISBN. Rode npm run db:seed primeiro.");
  } else {
    console.log(`${livroEncontrado.titulo} — ${livroEncontrado.autor}`);
  }

  // ---------------------------------------------------------
  // 3e) Mostre QUANTOS livros estão disponíveis.
  //     Veja aula-06-prisma/src/08-count-aggregate.ts
  // ---------------------------------------------------------
  const quantidadeDisponiveis = await prisma.livro.count({
    where: { disponivel: ___ },
  });
  console.log(`\n=== 3e) Livros disponíveis: ${quantidadeDisponiveis} ===`);
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
