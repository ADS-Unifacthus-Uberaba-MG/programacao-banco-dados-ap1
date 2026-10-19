// =============================================================
// seed.ts — POPULA o banco "loja" com produtos de exemplo
//
// Como rodar:  npm run db:seed   (depois do npm run db:migrate)
//
// "Seed" = semente: dados iniciais para você ter o que consultar.
// Se a tabela já tiver produtos, o seed não faz nada (pode rodar quantas vezes quiser).
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  const quantidadeAtual = await prisma.produto.count();
  if (quantidadeAtual > 0) {
    console.log(`A tabela produtos já tem ${quantidadeAtual} produtos. Nada a fazer.`);
    console.log("Para recomeçar do zero: npm run db:reset (apaga tudo) e depois npm run db:seed.");
    return;
  }

  const resultado = await prisma.produto.createMany({
    data: [
      { nome: "Teclado Mecânico", descricao: "Teclado ABNT2 com switches azuis", preco: 249.9, estoque: 10 },
      { nome: "Mouse Gamer", descricao: "Mouse com 6 botões e RGB", preco: 129.9, estoque: 25 },
      { nome: 'Monitor 24"', descricao: "Monitor Full HD IPS", preco: 899.0, estoque: 8 },
      { nome: "Cabo HDMI", preco: 29.9, estoque: 100 }, // sem descrição
      { nome: "Headset USB", descricao: "Headset com microfone", preco: 189.5, estoque: 0 }, // sem estoque
      { nome: "Webcam HD", descricao: "Webcam 1080p para aulas online", preco: 219.0, estoque: 12 },
      { nome: "Mousepad Grande", descricao: "Mousepad 90x40 cm", preco: 59.9, estoque: 30 },
    ],
  });

  console.log(`=== Seed concluído: ${resultado.count} produtos cadastrados ===`);
  console.log("Rode npm run listar para ver todos.");
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
