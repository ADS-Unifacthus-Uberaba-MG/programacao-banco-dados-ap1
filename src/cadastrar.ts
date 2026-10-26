// =============================================================
// cadastrar.ts — TAREFA 2: cadastrar livros
//
// Como rodar:  npm run cadastrar
//
// COMO FAZER:
//   - Nos itens 2a e 2b, troque cada ___ pelo trecho de código que falta.
//   - O item 2c você escreve INTEIRO, no lugar indicado.
// Enquanto sobrar algum ___, o programa dá erro e mostra a linha:
// é o lembrete de que ainda falta completar.
//
// ⚠ Só funciona depois da Tarefa 1 (model Livro + npm run db:migrate).
// =============================================================
import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma/client";

async function main() {
  // ---------------------------------------------------------
  // 2a) Cadastre UM livro com create.
  //     Troque o ___ pelo objeto com os dados do livro:
  //       titulo: "O Alienista"
  //       autor: "Machado de Assis"
  //       isbn: isbnDoAlienista   (a variável logo abaixo)
  //       anoPublicacao: 1882
  //       sinopse: "Um médico decide estudar a loucura na cidade de Itaguaí."
  //     Veja aula-06-prisma/src/01-create.ts
  // ---------------------------------------------------------
  const isbnDoAlienista = "978-85-0000-100-1";

  // (Pronto) Se o livro já existe, não cadastra de novo — assim você pode rodar várias vezes.
  const jaExiste = await prisma.livro.findUnique({ where: { isbn: isbnDoAlienista } });

  if (jaExiste) {
    console.log("=== 2a) O Alienista já estava cadastrado ===");
  } else {
    const livroNovo = await prisma.livro.create({
      data: ___,
    });
    console.log("=== 2a) Livro cadastrado ===");
    console.log(livroNovo); // repare: id, disponivel e criadoEm vieram sozinhos
  }

  // ---------------------------------------------------------
  // 2b) Cadastre VÁRIOS livros de uma vez.
  //     Primeiro ___: qual método cria vários registros?
  //     Segundo ___: mostre a QUANTIDADE inserida (o que o método devolve?).
  //     Veja aula-06-prisma/src/02-create-many.ts
  // ---------------------------------------------------------
  const resultado = await prisma.livro.___({
    data: [
      { titulo: "Capitães da Areia", autor: "Jorge Amado", isbn: "978-85-0000-101-8", anoPublicacao: 1937, sinopse: "Um grupo de meninos de rua em Salvador." },
      { titulo: "O Auto da Compadecida", autor: "Ariano Suassuna", isbn: "978-85-0000-102-5", anoPublicacao: 1955 }, // sem sinopse
      { titulo: "Ensaio sobre a Cegueira", autor: "José Saramago", isbn: "978-85-0000-103-2", anoPublicacao: 1995, sinopse: "Uma cidade inteira fica cega de repente." },
      { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", isbn: "978-85-0000-104-9", anoPublicacao: 2015, sinopse: "Edição brasileira do clássico sobre amizade." },
    ],
    skipDuplicates: true, // (pronto) ignora livros cujo ISBN já existe — dá para rodar várias vezes
  });
  console.log("\n=== 2b) Livros cadastrados com createMany ===");
  console.log(`Foram inseridos ${___} livros.`);

  // ---------------------------------------------------------
  // 2c) ESCREVA VOCÊ: tente cadastrar um livro com um ISBN que JÁ existe
  //     (use isbnDoAlienista) e trate o erro com try/catch.
  //
  //     Passo a passo:
  //       1. console.log com o título "=== 2c) Tentando cadastrar um ISBN repetido ==="
  //       2. try { ... } com um prisma.livro.create usando isbnDoAlienista
  //          (os outros campos podem ser inventados)
  //       3. catch (erro) { ... }:
  //          - se for Prisma.PrismaClientKnownRequestError com código "P2002",
  //            mostre "Já existe um livro com este ISBN!"
  //          - senão, throw erro;
  //     Veja aula-06-prisma/src/09-tratando-erros.ts (o mesmo esquema, com outro código)
  // ---------------------------------------------------------

  // escreva o 2c aqui

  console.log("\n⚠ 2c) ainda não foi feito — apague esta linha quando terminar.");
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
