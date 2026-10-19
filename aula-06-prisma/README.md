# Aula 06 — ORM na prática com Prisma

**Programação em Banco de Dados · UniFACTHUS · ADS 2026/02**
Prof. Pierre Mendes Salatiel · 19/10/2026

Até a Aula 4 escrevemos SQL na mão com o driver `pg`. Hoje usamos um **ORM**
(o Prisma), que escreve o SQL por nós a partir de código TypeScript.

> 🏠 **schema** = planta da casa · 🏗️ **migrate** = construtora · 🎮 **client** = controle remoto

> ⚠️ Tutoriais do Prisma 5/6 importam de `@prisma/client` — no Prisma 7 isso
> mudou. **Siga este material.** Aqui o client vem de `../generated/prisma/client`.

## O que tem nesta pasta

```
aula-06-prisma/
├── exemplo-produtos/        ← exemplo COMPLETO da aula (rode e leia)
│   ├── prisma/schema.prisma ← a planta: model Produto
│   ├── prisma/migrations/   ← o SQL que o migrate gerou (abra e compare!)
│   ├── lib/prisma.ts        ← cria o "controle remoto" (prisma)
│   ├── lib-mysql/prisma.ts  ← versão para quem usa XAMPP
│   └── src/01 ... 09        ← um script por operação
└── modelo-ap2-biblioteca/   ← ESQUELETO da AP2 nº 1 (você preenche)
```

## Pré-requisitos

- **Node.js 24** (confira com `node -v`).
- **Container da Aula 2 rodando.** Na raiz do repositório:

  ```bash
  docker compose up -d
  docker compose ps        # o status deve ser "Up"
  ```

  Usamos o **mesmo container** (porta **5433**, usuário `aluno`, senha
  `senha123`), mas num banco novo chamado `loja`. Não use o `bdaula`: ele já
  tem uma tabela `produtos` da Aula 4 e o Prisma pediria para apagá-la. O banco
  `loja` é criado sozinho no passo 5.

## Como rodar o exemplo (passo a passo)

1. Entre na pasta:

   ```bash
   cd aula-06-prisma/exemplo-produtos
   ```

2. Crie o seu `.env` a partir do modelo:

   ```bash
   cp .env.example .env          # Windows: copy .env.example .env
   ```

3. Abra o `.env` e confira o `DATABASE_URL`. Se você não mudou nada no
   docker-compose da Aula 2, ele já está certo.

4. Instale as dependências (isso também roda o `prisma generate`):

   ```bash
   npm install
   ```

5. Crie a tabela no banco (a "construtora" lê a planta e executa o SQL):

   ```bash
   npm run db:migrate -- --name criar_produtos
   ```

   Se a pasta `prisma/migrations` já tiver a migration, ele só aplica no seu
   banco. Depois do migrate, o `prisma generate` roda sozinho.

6. Rode os scripts, nesta ordem:

   ```bash
   npm run create-many
   npm run create
   npm run listar
   npm run filtros
   npm run buscar
   npm run atualizar
   npm run excluir
   npm run contar
   npm run erros
   ```

7. Veja os dados numa tela bonita, no navegador:

   ```bash
   npm run db:studio
   ```

Abra cada arquivo de `src/` enquanto roda: o topo de cada um mostra o SQL
equivalente.

## Script → o que mostra → SQL equivalente

| Comando               | Arquivo                   | O que mostra                                       | SQL equivalente                                  |
| --------------------- | ------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| `npm run create`      | `01-create.ts`            | `create` de 1 produto e os campos `@default`       | `INSERT INTO produtos (...) VALUES (...)`        |
| `npm run create-many` | `02-create-many.ts`       | `createMany` com 6 produtos                        | `INSERT ... VALUES (...), (...), ...`            |
| `npm run listar`      | `03-find-many.ts`         | `findMany` sem filtro e com `orderBy`              | `SELECT * FROM produtos ORDER BY preco DESC`     |
| `npm run filtros`     | `04-find-filtros.ts`      | `where` (`lt`, `gte`, `contains`, `in`, `OR`), `select`, `take`/`skip` | `WHERE ... / ILIKE / IN / OR / LIMIT / OFFSET` |
| `npm run buscar`      | `05-find-unique.ts`       | `findUnique` (achou / `null`) e `findFirst`        | `SELECT * ... WHERE id = 1`                      |
| `npm run atualizar`   | `06-update.ts`            | `update`, `increment`, `decrement`, `atualizadoEm` | `UPDATE produtos SET estoque = estoque + 5 ...`  |
| `npm run excluir`     | `07-delete.ts`            | `delete` (e o perigo do `deleteMany` sem `where`)  | `DELETE FROM produtos WHERE id = ...`            |
| `npm run contar`      | `08-count-aggregate.ts`   | `count` e `aggregate` (`_sum`, `_avg`, `_max`)     | `SELECT COUNT(*), SUM(...), AVG(...), MAX(...)`  |
| `npm run erros`       | `09-tratando-erros.ts`    | `try/catch` do erro **P2025** (e explica o P2002)  | `UPDATE ... WHERE id = 999999` (0 linhas)        |

Outros comandos úteis:

| Comando               | Para quê                                                        |
| --------------------- | --------------------------------------------------------------- |
| `npm run db:migrate`  | mudou o `schema.prisma`? rode de novo com `-- --name o_que_mudou` |
| `npm run db:generate` | regenera o client (o autocomplete) sem mexer no banco           |
| `npm run db:studio`   | abre o Prisma Studio no navegador                               |
| `npm run db:reset`    | ⚠ apaga TUDO do banco `loja` e recria as tabelas do zero         |

## Como usar o modelo da AP2 nº 1

A pasta `modelo-ap2-biblioteca/` é só o **esqueleto**: a configuração está
pronta, mas o model e as consultas quem escreve é você.

1. Copie a pasta `modelo-ap2-biblioteca` para fora (ou para o seu repositório)
   e renomeie para **`ap2-biblioteca`**.
2. Dentro dela: `cp .env.example .env` (Windows: `copy .env.example .env`) e
   `npm install`. O banco dela se chama `biblioteca`.
3. Preencha os `TODO` **na ordem das tarefas**:
   - **Tarefa 1** → `prisma/schema.prisma`: escreva o `model Livro` e rode
     `npm run db:migrate -- --name criar_livros`.
   - **Tarefa 2** → `src/cadastrar.ts` → `npm run cadastrar`
   - **Tarefa 3** → `src/consultar.ts` → `npm run consultar`
   - **Tarefa 4** → `src/emprestar.ts` → `npm run emprestar`
   - **Tarefa 5** → `src/excluir.ts` → `npm run excluir`
4. Cada `TODO` diz qual script do `exemplo-produtos` consultar. Copie, cole e
   **adapte** (troque `produto` por `livro` e os campos).

> ℹ️ Enquanto você não criar o `model Livro` e rodar o migrate, os scripts de
> `src/` **não funcionam** e `prisma.livro` aparece sublinhado em vermelho no
> VS Code. Isso é esperado: o "controle remoto" ainda não tem o botão `livro`.

## Erros comuns

| Mensagem                                                   | Causa provável                                       | Como resolver                                                                                         |
| ---------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `Can't reach database server at localhost:5433`            | O container não está rodando, ou a porta está errada | Na raiz: `docker compose up -d` e `docker compose ps`. Confira a porta **5433** no `.env`.            |
| `Authentication failed against database server`            | Usuário ou senha errados no `DATABASE_URL`           | Compare com o `.env` da raiz (Aula 2): `aluno` / `senha123`.                                          |
| `Cannot find module '../generated/prisma/client'`          | O client ainda não foi gerado                        | `npm run db:generate` (ou `npm install` de novo).                                                     |
| `Cannot use import statement outside a module`             | Falta `"type": "module"` no `package.json`, ou rodou com `node`/`ts-node` | Confira o `package.json` e rode sempre com `npm run ...` (que usa o `tsx`).                         |
| Campo/model novo não aparece no autocomplete (ou `prisma.livro` é `undefined`) | O client foi gerado antes da mudança no schema | `npm run db:migrate -- --name ...` (já regenera) ou `npm run db:generate`. No VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server". |
| `We need to reset the "public" schema`                     | O `DATABASE_URL` aponta para um banco que já tem tabelas (ex.: `bdaula`) | Use o banco `loja` (exemplo) ou `biblioteca` (AP), como no `.env.example`. **Não confirme o reset no `bdaula`.** |

## Plano B — MySQL/XAMPP

Se o Docker não funcionar no seu computador:

1. Ligue o **MySQL** no painel do XAMPP.
2. No `prisma/schema.prisma`, troque `provider = "postgresql"` por `provider = "mysql"`.
3. Instale o adaptador: `npm install @prisma/adapter-mariadb@^7`
4. Copie `lib-mysql/prisma.ts` por cima de `lib/prisma.ts`.
5. No `.env`, comente a linha do PostgreSQL e descomente o bloco do MySQL.
6. Apague a pasta `prisma/migrations` (ela tem SQL de PostgreSQL) e rode
   `npm run db:migrate -- --name criar_produtos`.

> No MySQL, o `mode: "insensitive"` do `04-find-filtros.ts` não existe —
> apague essa linha (o MySQL já ignora maiúsculas/minúsculas por padrão).

## 🔒 Lembrete

**Nunca suba o `.env` para o GitHub.** Ele tem a senha do banco. O
`.gitignore` já ignora `.env`, `node_modules/` e `generated/` — suba só o
`.env.example`.
