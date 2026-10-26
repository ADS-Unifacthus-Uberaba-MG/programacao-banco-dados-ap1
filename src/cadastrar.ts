// =============================================================
// cadastrar.ts — TAREFA 2: cadastrar livros
//
// Como rodar:  npm run cadastrar
//
// COMO FAZER: o código já está pronto. Troque cada ___ pelo que falta.
// Enquanto sobrar algum ___, o programa dá erro (ex.: "___ is not defined"):
// é o lembrete de que ainda falta completar.
//
// ⚠ Só funciona depois da Tarefa 1 (model Livro + npm run db:migrate).
// =============================================================
import { prisma } from "../lib/prisma";
import { Prisma } from "../generated/prisma/client";

async function main() {
  // ---------------------------------------------------------
  // 2a) Cadastre UM livro.
  //     Qual método do Prisma CRIA um registro? Veja aula-06-prisma/src/01-create.ts
  // ---------------------------------------------------------
  const isbnDoAlienista = "978-85-0000-100-1";

  // (Pronto) Se o livro já existe, não cadastra de novo — assim você pode rodar várias vezes.
  const jaExiste = await prisma.livro.findUnique({ where: { isbn: isbnDoAlienista } });

  if (jaExiste) {
    console.log("=== 2a) O Alienista já estava cadastrado ===");
  } else {
    const livroNovo = await prisma.livro.___({
      data: {
        titulo: "O Alienista",
        autor: "Machado de Assis",
        isbn: isbnDoAlienista,
        anoPublicacao: ___, // o livro é de 1882
        sinopse: "Um médico decide estudar a loucura na cidade de Itaguaí.",
      },
    });
    console.log("=== 2a) Livro cadastrado ===");
    console.log(livroNovo); // repare: id, disponivel e criadoEm vieram sozinhos
  }

  // ---------------------------------------------------------
  // 2b) Cadastre VÁRIOS livros de uma vez.
  //     Qual método cria vários? Veja aula-06-prisma/src/02-create-many.ts
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
  console.log(`Foram inseridos ${resultado.___} livros.`); // qual propriedade tem a QUANTIDADE?

  // ---------------------------------------------------------
  // 2c) Tente cadastrar um livro com um ISBN que JÁ existe e trate o erro.
  //     Qual é o código do erro de campo @unique repetido?
  //     Veja aula-06-prisma/src/09-tratando-erros.ts
  // ---------------------------------------------------------
  console.log("\n=== 2c) Tentando cadastrar um ISBN repetido ===");
  try {
    await prisma.livro.create({
      data: { titulo: "Livro Repetido", autor: "Fulano", isbn: isbnDoAlienista, anoPublicacao: 2020 },
    });
    console.log("Cadastrou (isso não deveria acontecer!).");
  } catch (erro) {
    if (erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === "___") {
      console.log("Já existe um livro com este ISBN!");
    } else {
      throw erro; // erro que não sabemos tratar: deixa aparecer
    }
  }
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
