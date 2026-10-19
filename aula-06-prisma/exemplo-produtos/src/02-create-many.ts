// =============================================================
// 02-create-many.ts — CADASTRAR VÁRIOS produtos de uma vez (createMany)
//
// SQL equivalente:
//   INSERT INTO produtos (nome, descricao, preco, estoque, atualizado_em) VALUES
//     ('Mouse Gamer', '...', 129.90, 25, NOW()),
//     ('Monitor 24"', '...', 899.00, 8, NOW()),
//     ... ;
//
// Como rodar:  npm run create-many
// (Se rodar duas vezes, os produtos são cadastrados de novo — isso é normal.
//  Para zerar a tabela, use: npm run db:reset)
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // createMany recebe uma LISTA (array) de objetos em "data".
  // Escolhemos produtos variados para os próximos scripts terem o que filtrar:
  // preços abaixo e acima de R$ 200, um sem descrição e um com estoque 0.
  const resultado = await prisma.produto.createMany({
    data: [
      { nome: "Mouse Gamer", descricao: "Mouse com 6 botões e RGB", preco: 129.9, estoque: 25 },
      { nome: 'Monitor 24"', descricao: "Monitor Full HD IPS", preco: 899.0, estoque: 8 },
      { nome: "Cabo HDMI", preco: 29.9, estoque: 100 }, // sem descrição (fica NULL)
      { nome: "Headset USB", descricao: "Headset com microfone", preco: 189.5, estoque: 0 }, // estoque zerado
      { nome: "Webcam HD", descricao: "Webcam 1080p para aulas online", preco: 219.0, estoque: 12 },
      { nome: "Mousepad Grande", descricao: "Mousepad 90x40 cm", preco: 59.9 }, // sem estoque: usa o @default(0)
    ],
  });

  // createMany NÃO devolve os produtos, só a quantidade inserida (count).
  console.log("=== Produtos cadastrados com createMany ===");
  console.log(`Foram inseridos ${resultado.count} produtos.`);
  console.log("Rode npm run listar para ver todos.");
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
