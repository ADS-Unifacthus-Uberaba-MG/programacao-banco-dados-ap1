// =============================================================
// 01-create.ts — CADASTRAR UM produto (create)
//
// SQL equivalente:
//   INSERT INTO produtos (nome, descricao, preco, estoque, atualizado_em)
//   VALUES ('Teclado Mecânico', 'Teclado ABNT2 com switches azuis', 249.90, 10, NOW())
//   RETURNING *;
//
// Como rodar:  npm run create
// (Cada vez que você rodar, um novo produto é criado — o id vai aumentando.)
// =============================================================
import { prisma } from "../lib/prisma";

async function main() {
  // O create recebe um objeto "data" com os campos que queremos preencher.
  // Repare que NÃO passamos id, ativo, criadoEm nem atualizadoEm:
  // eles são preenchidos sozinhos pelos @default / @updatedAt do schema.
  const produtoCriado = await prisma.produto.create({
    data: {
      nome: "Teclado Mecânico",
      descricao: "Teclado ABNT2 com switches azuis",
      preco: 249.9, // pode passar número; o Prisma converte para Decimal
      estoque: 10,
    },
  });

  console.log("=== Produto cadastrado ===");
  console.log(produtoCriado);

  console.log("\n=== Campos que o banco/Prisma preencheu sozinhos ===");
  console.log("id (autoincrement):     ", produtoCriado.id);
  console.log("ativo (@default(true)): ", produtoCriado.ativo);
  console.log("criadoEm (now()):       ", produtoCriado.criadoEm);
  console.log("atualizadoEm (@updatedAt):", produtoCriado.atualizadoEm);
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
