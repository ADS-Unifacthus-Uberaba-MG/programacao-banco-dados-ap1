// =============================================================
// 03-find-many.ts — LISTAR produtos (findMany + orderBy)
//
// SQL equivalente:
//   SELECT * FROM produtos;
//   SELECT * FROM produtos ORDER BY preco DESC;
//
// Como rodar:  npm run listar
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // findMany sem nada dentro = traz TODAS as linhas da tabela (uma lista).
  // Sem orderBy, a ordem NÃO é garantida (um produto atualizado pode "ir para o fim").
  const todosProdutos = await prisma.produto.findMany();

  console.log("=== Todos os produtos (sem filtro) ===");
  if (todosProdutos.length === 0) {
    console.log("Nenhum produto cadastrado. Rode npm run db:seed primeiro.");
    return;
  }
  // console.table mostra a lista em forma de tabela, fica bem mais fácil de ler
  console.table(
    todosProdutos.map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco.toFixed(2), // preco é Decimal: toFixed(2) mostra com 2 casas
      estoque: produto.estoque,
    })),
  );

  // orderBy ordena o resultado. "desc" = do maior para o menor; "asc" = do menor para o maior.
  const produtosMaisCaros = await prisma.produto.findMany({
    orderBy: { preco: "desc" },
  });

  console.log("\n=== Produtos do mais caro para o mais barato (orderBy preco desc) ===");
  for (const produto of produtosMaisCaros) {
    console.log(`R$ ${produto.preco.toFixed(2).padStart(8)}  ${produto.nome}`);
  }
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
