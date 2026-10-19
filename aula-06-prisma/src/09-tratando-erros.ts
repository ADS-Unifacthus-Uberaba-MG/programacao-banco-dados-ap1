// =============================================================
// 09-tratando-erros.ts — TRATAR ERROS do Prisma (try/catch + código do erro)
//
// SQL equivalente:
//   UPDATE produtos SET estoque = 1 WHERE id = 999999;
//   -- no SQL isso só diz "0 linhas afetadas"; o Prisma transforma em ERRO (P2025)
//
// Como rodar:  npm run erros
// =============================================================
import { prisma } from "../lib/prisma";
// "Prisma" (com P maiúsculo) traz as classes de erro. No Prisma 7 vem do client gerado:
import { Prisma } from "../generated/prisma/client";

async function main() {
  const idInexistente = 999999;

  console.log(`=== Tentando atualizar o produto ${idInexistente}, que não existe ===`);

  try {
    // Diferente do findUnique (que devolve null), update e delete DÃO ERRO
    // quando não encontram o registro.
    await prisma.produto.update({
      where: { id: idInexistente },
      data: { estoque: 1 },
    });
    console.log("Atualizou (isso não deveria acontecer).");
  } catch (erro) {
    // PrismaClientKnownRequestError = erro "conhecido", que tem um código (erro.code).
    // O instanceof confere o tipo, e aí o TypeScript deixa usar erro.code com segurança.
    if (erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === "P2025") {
      console.log(`Erro P2025: não existe produto com id ${idInexistente}.`);
      console.log("(Mensagem amigável para o usuário, em vez de o programa quebrar.)");
    } else {
      // Qualquer outro erro, que não sabemos tratar: repassa para o .catch() lá de baixo
      throw erro;
    }
  }

  // Outros códigos comuns:
  //   P2025 → registro não encontrado (update/delete de id que não existe) — o exemplo acima.
  //   P2002 → violação de @unique: tentou gravar um valor que JÁ existe numa coluna única.
  //           Você vai usar este na AP2 com o ISBN do livro (isbn String @unique):
  //             if (erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === "P2002") {
  //               console.log("Já existe um livro com este ISBN!");
  //             }
  //   Lista completa: https://www.prisma.io/docs/orm/reference/error-reference

  console.log("\nO programa continuou rodando normalmente depois do erro. ✔");
}

main()
  .catch((erro) => console.error(erro))
  .finally(() => prisma.$disconnect());
