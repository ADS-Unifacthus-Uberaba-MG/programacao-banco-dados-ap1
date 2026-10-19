// =============================================================
// seed.ts — POPULA o banco "biblioteca" com livros para você testar
//
// Como rodar:  npm run db:seed
//
// ⚠ Só funciona DEPOIS da Tarefa 1 (model Livro criado + npm run db:migrate).
//   Os nomes dos campos abaixo são os do enunciado: se o seed der erro de
//   campo desconhecido, confira se o seu model usa exatamente esses nomes.
//
// Pode rodar quantas vezes quiser: o upsert procura o livro pelo ISBN e
// só cadastra se ele ainda não existir (não duplica e não apaga os seus livros).
// Os ISBNs são fictícios, só para teste.
// =============================================================
import { prisma } from "../lib/prisma";

const livros = [
  { titulo: "Dom Casmurro", autor: "Machado de Assis", isbn: "978-85-0000-001-1", anoPublicacao: 1899, sinopse: "Bentinho relembra a vida e o ciúme que sentia de Capitu." },
  { titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", isbn: "978-85-0000-002-8", anoPublicacao: 1881, sinopse: "Um defunto autor conta a própria vida, com muita ironia." },
  { titulo: "O Cortiço", autor: "Aluísio Azevedo", isbn: "978-85-0000-003-5", anoPublicacao: 1890, sinopse: "A vida dos moradores de um cortiço no Rio de Janeiro do século XIX." },
  { titulo: "Vidas Secas", autor: "Graciliano Ramos", isbn: "978-85-0000-004-2", anoPublicacao: 1938, sinopse: "Uma família de retirantes foge da seca no sertão nordestino." },
  { titulo: "A Hora da Estrela", autor: "Clarice Lispector", isbn: "978-85-0000-005-9", anoPublicacao: 1977 }, // sem sinopse
  { titulo: "Harry Potter e a Pedra Filosofal", autor: "J. K. Rowling", isbn: "978-85-0000-006-6", anoPublicacao: 2000, sinopse: "Um menino descobre que é bruxo e vai estudar em Hogwarts." },
  { titulo: "Código Limpo", autor: "Robert C. Martin", isbn: "978-85-0000-007-3", anoPublicacao: 2008, sinopse: "Boas práticas para escrever código fácil de ler e manter." },
  { titulo: "Torto Arado", autor: "Itamar Vieira Junior", isbn: "978-85-0000-008-0", anoPublicacao: 2019, sinopse: "Duas irmãs e a luta pela terra no interior da Bahia.", disponivel: false }, // já emprestado
];

async function main() {
  // Se o model Livro ainda não existe, avisa em vez de mostrar um erro confuso
  if (!("livro" in prisma)) {
    console.log("O model Livro ainda não existe no Prisma Client.");
    console.log("Faça a Tarefa 1 (prisma/schema.prisma) e rode npm run db:migrate -- --name criar_livros antes do seed.");
    return;
  }

  for (const livro of livros) {
    await prisma.livro.upsert({
      where: { isbn: livro.isbn }, // procura pelo ISBN (campo @unique)
      update: {}, // se já existir, não muda nada
      create: livro, // se não existir, cadastra
    });
  }

  const total = await prisma.livro.count();
  console.log(`=== Seed concluído: ${livros.length} livros de teste garantidos no banco ===`);
  console.log(`A tabela livros tem agora ${total} livros.`);
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
