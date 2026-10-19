-- Programação em Banco de Dados — Aula 03
-- UniFACTHUS · ADS · 2026/02
--
-- Este script roda automaticamente quando o container Postgres é
-- inicializado PELA PRIMEIRA VEZ (volume vazio). Se você já tinha
-- subido o ambiente na Aula 2, o volume já existe e este script NÃO
-- vai rodar sozinho — veja o README.md para as duas opções de resolver isso.

CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco NUMERIC(10,2) NOT NULL CHECK (preco > 0),
  quantidade_estoque INTEGER NOT NULL DEFAULT 0 CHECK (quantidade_estoque >= 0)
);

INSERT INTO produtos (nome, preco, quantidade_estoque) VALUES
  ('Caderno', 12.90, 50),
  ('Caneta Azul', 2.50, 200),
  ('Mochila', 89.90, 15),
  ('Agenda 2026', 34.90, 30),
  ('Marcador de Texto', 6.90, 80);
