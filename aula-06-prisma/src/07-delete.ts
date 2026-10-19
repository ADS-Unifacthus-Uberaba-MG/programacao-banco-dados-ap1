// =============================================================
// 07-delete.ts — EXCLUIR um produto (delete)
//
// SQL equivalente:
//   DELETE FROM produtos WHERE id = 7;
//
// Como rodar:  npm run excluir
// (Cada execução apaga o produto de MAIOR id. Quando acabar, rode npm run db:seed.)
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // Buscamos um produto que existe antes de apagar (o de maior id, o mais recente).
  const produtoParaExcluir = await prisma.produto.findFirst({ orderBy: { id: "desc" } });
  if (!produtoParaExcluir) {
    console.log("A tabela está vazia, não há o que excluir. Rode npm run db:seed primeiro.");
    return;
  }

  // delete apaga UMA linha, encontrada pelo where (precisa ser campo único, como o id).
  // Ele devolve o produto que foi apagado — útil para mostrar uma mensagem.
  const produtoExcluido = await prisma.produto.delete({
    where: { id: produtoParaExcluir.id },
  });

  console.log("=== Produto excluído ===");
  console.log(`#${produtoExcluido.id} ${produtoExcluido.nome}`);

  const quantidadeRestante = await prisma.produto.count();
  console.log(`\nAinda restam ${quantidadeRestante} produtos na tabela.`);

  // ⚠ CUIDADO 1 — deleteMany SEM where:
  //   await prisma.produto.deleteMany();
  //   Isso vira "DELETE FROM produtos;" e apaga a tabela INTEIRA, sem pedir confirmação.
  //   Sempre passe um where: prisma.produto.deleteMany({ where: { estoque: 0 } })
  //
  // ⚠ CUIDADO 2 — muitas vezes é melhor DESATIVAR em vez de apagar:
  //   await prisma.produto.update({ where: { id }, data: { ativo: false } });
  //   Assim o histórico não se perde (vendas antigas continuam apontando para o produto)
  //   e dá para "desfazer" mudando ativo para true de novo. É para isso que serve o campo ativo.
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
