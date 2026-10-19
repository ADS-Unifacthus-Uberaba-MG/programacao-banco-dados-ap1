// =============================================================
// 05-find-unique.ts — BUSCAR UM produto (findUnique e findFirst)
//
// SQL equivalente:
//   SELECT * FROM produtos WHERE id = 1;                          -- findUnique
//   SELECT * FROM produtos WHERE nome = 'Cabo HDMI' LIMIT 1;      -- findFirst
//
// Como rodar:  npm run buscar
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // Para o exemplo funcionar mesmo se os ids mudarem (depois de excluir, de um reset...),
  // pegamos o id do primeiro produto que existir na tabela.
  const primeiroProduto = await prisma.produto.findFirst({ orderBy: { id: "asc" } });
  if (!primeiroProduto) {
    console.log("A tabela está vazia. Rode npm run db:seed primeiro.");
    return;
  }

  // findUnique só aceita campos ÚNICOS no where (o @id ou campos com @unique).
  const idExistente = primeiroProduto.id;
  const encontrado = await prisma.produto.findUnique({
    where: { id: idExistente },
  });
  console.log(`=== findUnique com id ${idExistente} (existe) ===`);
  console.log(encontrado);

  // Se não achar, o findUnique NÃO dá erro: ele devolve null.
  // Por isso SEMPRE confira com um if antes de usar o resultado.
  const idInexistente = 999999;
  const naoEncontrado = await prisma.produto.findUnique({
    where: { id: idInexistente },
  });
  console.log(`\n=== findUnique com id ${idInexistente} (não existe) ===`);
  if (naoEncontrado === null) {
    console.log(`Nenhum produto com id ${idInexistente}. O resultado foi null.`);
  } else {
    console.log(naoEncontrado);
  }

  // findFirst aceita QUALQUER campo no where e devolve o primeiro que encontrar (ou null).
  // Útil para buscar por nome, que não é único.
  const nomeProcurado = "Cabo HDMI";
  const porNome = await prisma.produto.findFirst({
    where: { nome: nomeProcurado },
  });
  console.log(`\n=== findFirst pelo nome "${nomeProcurado}" ===`);
  if (porNome) {
    console.log(`Achei: #${porNome.id} ${porNome.nome} — R$ ${porNome.preco.toFixed(2)}`);
    console.log("descricao:", porNome.descricao); // este produto foi criado sem descrição: aparece null
  } else {
    console.log(`Nenhum produto chamado "${nomeProcurado}". Rode npm run db:seed primeiro.`);
  }
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
