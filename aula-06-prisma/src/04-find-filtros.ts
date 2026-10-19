// =============================================================
// 04-find-filtros.ts — FILTRAR produtos (where, select, paginação)
//
// SQL equivalente (um por bloco abaixo):
//   SELECT * FROM produtos WHERE preco < 200;
//   SELECT * FROM produtos WHERE estoque >= 10;
//   SELECT * FROM produtos WHERE nome ILIKE '%mouse%';
//   SELECT * FROM produtos WHERE id IN (1, 2, 3);
//   SELECT * FROM produtos WHERE estoque = 0 OR preco > 500;
//   SELECT nome, preco FROM produtos WHERE ativo = true;
//   SELECT * FROM produtos ORDER BY id LIMIT 2 OFFSET 2;
//
// Como rodar:  npm run filtros
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // --- lt = "less than" = menor que (<) ---
  const baratos = await prisma.produto.findMany({
    where: { preco: { lt: 200 } },
  });
  console.log("=== Produtos com preço abaixo de R$ 200 (lt) ===");
  for (const produto of baratos) {
    console.log(`- ${produto.nome}: R$ ${produto.preco.toFixed(2)}`);
  }

  // --- gte = "greater than or equal" = maior ou igual (>=) ---
  // Outros parecidos: gt (>), lte (<=), equals (=), not (<>)
  const comEstoque = await prisma.produto.findMany({
    where: { estoque: { gte: 10 } },
  });
  console.log("\n=== Produtos com 10 ou mais unidades em estoque (gte) ===");
  for (const produto of comEstoque) {
    console.log(`- ${produto.nome}: ${produto.estoque} unidades`);
  }

  // --- contains = "contém o texto" (LIKE '%...%') ---
  // mode: "insensitive" ignora maiúsculas/minúsculas (vira ILIKE no PostgreSQL)
  const mouses = await prisma.produto.findMany({
    where: { nome: { contains: "mouse", mode: "insensitive" } },
  });
  console.log('\n=== Produtos com "mouse" no nome (contains + insensitive) ===');
  for (const produto of mouses) {
    console.log(`- ${produto.nome}`);
  }

  // --- in = "está nesta lista" ---
  const idsProcurados = [1, 2, 3];
  const porIds = await prisma.produto.findMany({
    where: { id: { in: idsProcurados } },
  });
  console.log(`\n=== Produtos com id em [${idsProcurados.join(", ")}] (in) ===`);
  for (const produto of porIds) {
    console.log(`- #${produto.id} ${produto.nome}`);
  }

  // --- OR = basta UMA das condições ser verdadeira ---
  // (Se colocar várias condições direto no where, sem OR, todas precisam valer = AND)
  const semEstoqueOuCaros = await prisma.produto.findMany({
    where: {
      OR: [{ estoque: 0 }, { preco: { gt: 500 } }],
    },
  });
  console.log("\n=== Produtos SEM estoque OU com preço acima de R$ 500 (OR) ===");
  for (const produto of semEstoqueOuCaros) {
    console.log(`- ${produto.nome} (estoque ${produto.estoque}, R$ ${produto.preco.toFixed(2)})`);
  }

  // --- select = escolher QUAIS colunas trazer (em vez de SELECT *) ---
  // O resultado só tem os campos marcados com true. Tente usar produto.estoque aqui: o TypeScript reclama!
  const nomesEPrecos = await prisma.produto.findMany({
    where: { ativo: true },
    select: { nome: true, preco: true },
  });
  console.log("\n=== Só nome e preço dos produtos ativos (select) ===");
  console.log(nomesEPrecos.map((produto) => ({ nome: produto.nome, preco: produto.preco.toFixed(2) })));

  // --- Paginação: take = quantos trazer (LIMIT), skip = quantos pular (OFFSET) ---
  // Página 2 com 2 itens por página: pula os 2 primeiros e traz os 2 seguintes.
  const itensPorPagina = 2;
  const pagina = 2;
  const paginaDeProdutos = await prisma.produto.findMany({
    orderBy: { id: "asc" }, // sempre ordene ao paginar, para a ordem não mudar entre as páginas
    take: itensPorPagina,
    skip: (pagina - 1) * itensPorPagina,
  });
  console.log(`\n=== Página ${pagina} (${itensPorPagina} por página) — take/skip ===`);
  for (const produto of paginaDeProdutos) {
    console.log(`- #${produto.id} ${produto.nome}`);
  }
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
