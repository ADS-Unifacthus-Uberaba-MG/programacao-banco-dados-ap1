import {
  criarProduto,
  listarProdutos,
  atualizarEstoque,
  deletarProduto,
} from './db/queries';
import { pool } from './db/connection';

async function main() {
  try {
    console.log('--- 1. listarProdutos (antes) ---');
    console.log(await listarProdutos());

    console.log('--- 2. criarProduto ---');
    const novoProduto = await criarProduto('Produto Teste', 19.9, 10);
    console.log(novoProduto);

    if (!novoProduto || typeof novoProduto.id !== 'number') {
      console.warn(
        '\n⚠ criarProduto ainda não está implementado (ou não retornou um objeto com "id"). ' +
          'Pulando os passos de atualizarEstoque e deletarProduto até que a função esteja pronta.\n',
      );
      return;
    }

    const id = novoProduto.id;

    console.log('--- 3. atualizarEstoque ---');
    console.log(await atualizarEstoque(id, 25));

    console.log('--- 4. deletarProduto ---');
    console.log(await deletarProduto(id));

    console.log('--- 5. listarProdutos (depois) ---');
    console.log(await listarProdutos());
  } finally {
    await pool.end();
  }
}

main().catch((erro) => {
  console.error('Erro ao executar testCrud:', erro);
  process.exit(1);
});
