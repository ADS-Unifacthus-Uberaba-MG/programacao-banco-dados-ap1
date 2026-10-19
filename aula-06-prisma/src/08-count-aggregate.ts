// =============================================================
// 08-count-aggregate.ts — CONTAR e fazer CONTAS (count, aggregate)
//
// SQL equivalente:
//   SELECT COUNT(*) FROM produtos;
//   SELECT COUNT(*) FROM produtos WHERE estoque = 0;
//   SELECT SUM(estoque), AVG(preco), MAX(preco) FROM produtos;
//
// Como rodar:  npm run contar
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // count devolve só um número: quantas linhas existem
  const totalProdutos = await prisma.produto.count();
  console.log("=== Contagens (count) ===");
  console.log(`Total de produtos: ${totalProdutos}`);

  // count também aceita where
  const semEstoque = await prisma.produto.count({
    where: { estoque: 0 },
  });
  console.log(`Produtos sem estoque: ${semEstoque}`);

  if (totalProdutos === 0) {
    console.log("\nA tabela está vazia. Rode npm run db:seed primeiro.");
    return;
  }

  // aggregate faz as contas no banco: _sum (soma), _avg (média), _max (maior), _min (menor)
  const resumo = await prisma.produto.aggregate({
    _sum: { estoque: true },
    _avg: { preco: true },
    _max: { preco: true },
  });

  // Os resultados podem ser null (se a tabela estiver vazia), por isso o "?." e o "??"
  console.log("\n=== Resumo do estoque (aggregate) ===");
  console.log(`Soma de unidades em estoque (_sum): ${resumo._sum.estoque ?? 0}`);
  console.log(`Preço médio (_avg):  R$ ${resumo._avg.preco?.toFixed(2) ?? "0.00"}`);
  console.log(`Preço mais alto (_max): R$ ${resumo._max.preco?.toFixed(2) ?? "0.00"}`);
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
