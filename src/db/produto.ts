import { Pool } from 'pg';
const pool: Pool = new Pool();

async function criarProduto(nome: string, preco: number, quantidade: number) {
    const query = `
        INSERT INTO produtos (nome, preco, quantidade_estoque) 
        VALUES ($1, $2, $3) 
        RETURNING *;
    `;
    const valores = [nome, preco, quantidade];
    
    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
}

async function listarProdutos() {
    const query = `
        SELECT * FROM produtos 
        ORDER BY nome ASC;
    `;
    const resultado = await pool.query(query);
    return resultado.rows;
}

async function atualizarEstoque(id: number, novaQuantidade: number) {
    const query = `
        UPDATE produtos 
        SET quantidade_estoque = $1 
        WHERE id = $2 
        RETURNING *;
    `;
    const valores = [novaQuantidade, id];
    
    const resultado = await pool.query(query, valores);
    
   
    if (resultado.rowCount === 0) {
        return null;
    }
    
    return resultado.rows[0];
}

async function deletarProduto(id: number) {
    const query = `
        DELETE FROM produtos 
        WHERE id = $1;
    `;
    const valores = [id];
    
    const resultado = await pool.query(query, valores);
    
  
    return resultado.rowCount > 0;
}
