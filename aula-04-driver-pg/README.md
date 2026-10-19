# Aula 04 — CRUD Completo e Prevenção de SQL Injection

**Programação em Banco de Dados · UniFACTHUS · ADS 2026/02**
Prof. Pierre Mendes Salatiel · 31/08/2026

Este projeto parte de onde a Aula 03 parou (conexão via driver puro `pg`) e
adiciona o CRUD completo da tabela `produtos` com queries parametrizadas,
usado na AP1 nº3.

> 📁 Este projeto agora fica na pasta `aula-04-driver-pg/`. O
> `docker-compose.yml` (o container do PostgreSQL) continua na **raiz** do
> repositório, porque é o mesmo para todas as aulas.

## Estrutura

```
(raiz do repositório)
├── .env                    # POSTGRES_* usadas pelo docker-compose (não commitar!)
├── docker-compose.yml      # sobe o PostgreSQL + cria a tabela produtos
└── aula-04-driver-pg/
    ├── .env                # credenciais do banco para o código (não commitar!)
    ├── .env.example        # modelo do .env (use se for clonar via Git)
    ├── package.json
    ├── package-lock.json   # versões travadas das dependências
    ├── tsconfig.json
    ├── sql/
    │   └── init.sql        # cria e popula a tabela "produtos"
    └── src/
        ├── index.ts
        ├── testCrud.ts     # script de teste manual do CRUD da AP1 nº3
        └── db/
            ├── connection.ts   # Pool de conexão (pronto, não mexe)
            └── queries.ts      # onde você resolve a AP1 nº3
```

## ⚠ Se você já usou este projeto na Aula 03

O volume do Postgres (`pgdata`) já existe no seu Docker, e scripts em
`sql/init.sql` só rodam automaticamente na **primeira** inicialização de
um volume vazio. A tabela `produtos` da Aula 03 não tem a coluna
`quantidade_estoque` (nova, usada na AP1 nº3). Escolha uma das opções
abaixo antes de seguir:

**Opção A — recomeçar do zero (mais simples), na raiz do repositório:**

```bash
docker compose down -v
docker compose up -d
```

⚠️ O `-v` apaga **todos** os bancos do container, inclusive `loja` e
`biblioteca` (Aula 06 / AP2). Depois rode de novo o `npm run db:migrate` e o
`npm run db:seed` desses projetos.

Isso apaga os dados atuais do container e recria tudo, já com a tabela
`produtos` pronta (com `quantidade_estoque`).

**Opção B — manter os dados e adicionar a coluna na mão:**
Abra o DBeaver (ou `docker exec -it postgres-aula psql -U aluno -d bdaula`)
e rode:

```sql
ALTER TABLE produtos ADD COLUMN IF NOT EXISTS
  quantidade_estoque INTEGER NOT NULL DEFAULT 0;
```

## Como usar

0. **Se você clonou isso de um repositório Git** (em vez de baixar o zip),
   crie os dois `.env` a partir dos modelos primeiro — um na **raiz** (usado
   pelo Docker) e um nesta pasta (usado pelo código):

   ```bash
   cp .env.example .env                                         # na raiz
   cp aula-04-driver-pg/.env.example aula-04-driver-pg/.env     # na raiz também
   ```

1. **Subir o banco (na raiz do repositório):**

   ```bash
   docker compose up -d
   ```

2. **Entrar na pasta e instalar dependências:**

   ```bash
   cd aula-04-driver-pg
   npm install
   ```

3. **Conferir se o banco subiu (na raiz):**

   ```bash
   docker compose ps
   ```

   O status deve aparecer como `Up`.

4. **Testar a conexão com o driver puro:**

   ```bash
   npm run db:test
   ```

   ✅ Esperado no terminal: `{ now: 2026-08-24T... }`

5. **Conectar no DBeaver:**

   | Campo    | Valor     |
   | -------- | --------- |
   | Host     | localhost |
   | Porta    | **5433**  |
   | Database | bdaula    |
   | Usuário  | aluno     |
   | Senha    | senha123  |

   ⚠️ **Atenção:** a porta é **5433**, não 5432 — veja o mapeamento
   `"5433:5432"` no `docker-compose.yml`. A porta 5432 é só a porta
   _interna_ do container; do seu computador (DBeaver, código TypeScript)
   você sempre acessa pela 5433.

6. **(Opcional) Conectar via terminal:**

   ```bash
   docker exec -it postgres-aula psql -U aluno -d bdaula
   ```

7. **Encerrar o ambiente ao final (na raiz):**
   ```bash
   docker compose down
   ```
   ⚠️ Use `docker compose down -v` só se quiser apagar os dados também.

## Onde trabalhar a AP1 nº3

Todo o código da atividade entra em `src/db/queries.ts`, importando o
`pool` já configurado de `./connection`. Implemente as 4 funções do CRUD,
sempre com queries parametrizadas ($1, $2, ...):

- `criarProduto(nome, preco, quantidade)`
- `listarProdutos()`
- `atualizarEstoque(id, novaQuantidade)`
- `deletarProduto(id)`

Siga o passo a passo do PDF da AP1 nº3 (`BD_Aula4_AP1n3_Enunciado.pdf`).

Depois de implementar, rode `npm run crud:test` para testar as 4 funções
em sequência (cria, lista, atualiza estoque, deleta e lista de novo).

## Troubleshooting rápido

- **`ECONNREFUSED`:** confirme `docker compose ps` (container precisa
  estar `Up`) e confirme que `DB_PORT` no `.env` está `5433`.
- **Tabela `produtos` não existe** ou **coluna `quantidade_estoque` não
  existe:** veja a seção "Se você já usou este projeto na Aula 03" acima.
- **Porta 5433 já em uso:** troque `"5433:5432"` por outra porta livre
  (ex: `"5434:5432"`) no `docker-compose.yml` da raiz **e** ajuste `DB_PORT`
  no `aula-04-driver-pg/.env` e a porta do `DATABASE_URL` no `.env` da raiz.
- **Container não sobe:** `docker compose logs postgres` para ver o erro.
