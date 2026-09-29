import { pool } from './connection';

export async function buscarProdutosPorNome(nome: string) {
  const result = await pool.query(
    "SELECT * FROM produtos WHERE nome ILIKE $1", [nome]
  
  
  );
  return result.rows;
}

buscarProdutosPorNome('a').then(produtos => console.log(produtos));