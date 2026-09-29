import 'dotenv/config';
import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function testarConexao() {
  try {
    const r = await pool.query('SELECT NOW()');
      console.log('conexão funcionou! Horario do banco:', r.rows[0]);
  }
  catch (erro) {
    console.error('Erro ao conectar no banco de dados:', erro);
  }
}

testarConexao();


