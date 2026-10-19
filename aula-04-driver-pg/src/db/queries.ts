import { pool } from './connection';

// Programação em Banco de Dados — Aula 04 — AP1 nº3
// UniFACTHUS · ADS · 2026/02
//
// Implemente as 4 funções abaixo (CRUD completo da tabela "produtos").
// TODAS as queries devem ser parametrizadas (use $1, $2, ... e o array de
// valores do `pool.query`) — nunca monte SQL concatenando strings, isso
// abre brecha para SQL Injection.
//
// Enunciado completo: BD_Aula4_AP1n3_Enunciado.pdf

export async function criarProduto(nome: string, preco: number, quantidade: number) {
  // TODO: implementar
}

export async function listarProdutos() {
  // TODO: implementar
}

export async function atualizarEstoque(id: number, novaQuantidade: number) {
  // TODO: implementar
}

export async function deletarProduto(id: number) {
  // TODO: implementar
}
