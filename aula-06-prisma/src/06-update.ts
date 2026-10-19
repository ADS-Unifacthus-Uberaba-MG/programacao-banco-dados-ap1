// =============================================================
// 06-update.ts — ATUALIZAR um produto (update, increment, decrement)
//
// SQL equivalente:
//   UPDATE produtos SET preco = 99.90, atualizado_em = NOW() WHERE id = 1;
//   UPDATE produtos SET estoque = estoque + 5, atualizado_em = NOW() WHERE id = 1;
//   UPDATE produtos SET estoque = estoque - 2, atualizado_em = NOW() WHERE id = 1;
//
// Como rodar:  npm run atualizar
// (Pode rodar várias vezes: o estoque sobe 5 e desce 2 a cada execução.)
// =============================================================
import { prisma } from "../lib/prisma";

// Pequena pausa só para dar tempo de ver o atualizadoEm mudar
function esperar(milissegundos: number) {
  return new Promise((resolver) => setTimeout(resolver, milissegundos));
}

async function main() {
  // Primeiro buscamos um produto que EXISTE, para não tentar atualizar um id inventado.
  const produtoAntes = await prisma.produto.findFirst({ orderBy: { id: "asc" } });
  if (!produtoAntes) {
    console.log("A tabela está vazia. Rode npm run db:seed primeiro.");
    return;
  }

  console.log("=== Antes da atualização ===");
  console.log(`#${produtoAntes.id} ${produtoAntes.nome}`);
  console.log(`preco: R$ ${produtoAntes.preco.toFixed(2)} | estoque: ${produtoAntes.estoque}`);
  console.log("atualizadoEm:", produtoAntes.atualizadoEm);

  await esperar(1000);

  // update precisa de DUAS coisas: where (QUAL linha) e data (O QUE muda).
  // Esquecer o where no SQL atualiza a tabela inteira; no Prisma o where é obrigatório no update.
  const comNovoPreco = await prisma.produto.update({
    where: { id: produtoAntes.id },
    data: { preco: 99.9 },
  });
  console.log("\n=== Depois de mudar o preço para R$ 99,90 ===");
  console.log(`preco: R$ ${comNovoPreco.preco.toFixed(2)}`);
  console.log("atualizadoEm:", comNovoPreco.atualizadoEm, "← mudou sozinho (@updatedAt)");

  // increment soma ao valor que JÁ está no banco (estoque = estoque + 5).
  // É melhor que ler, somar no código e gravar, porque o banco faz a conta de uma vez só.
  const comMaisEstoque = await prisma.produto.update({
    where: { id: produtoAntes.id },
    data: { estoque: { increment: 5 } },
  });
  console.log("\n=== Chegaram 5 unidades (increment: 5) ===");
  console.log(`estoque: ${produtoAntes.estoque} → ${comMaisEstoque.estoque}`);

  // decrement subtrai (estoque = estoque - 2), por exemplo depois de uma venda.
  const depoisDaVenda = await prisma.produto.update({
    where: { id: produtoAntes.id },
    data: { estoque: { decrement: 2 } },
  });
  console.log("\n=== Vendemos 2 unidades (decrement: 2) ===");
  console.log(`estoque: ${comMaisEstoque.estoque} → ${depoisDaVenda.estoque}`);
  console.log("atualizadoEm:", depoisDaVenda.atualizadoEm);
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
