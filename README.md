# Programação em Banco de Dados — AP2 nº 1 · Biblioteca com Prisma

**Programação em Banco de Dados · UniFACTHUS · ADS 2026/02**
Prof. Pierre Mendes Salatiel

A **raiz deste repositório é o projeto da AP2 nº 1**: é aqui que você
trabalha. O exemplo completo da aula, para consultar, está em
[`aula-06-prisma/`](aula-06-prisma/README.md).

## Aulas neste repositório

| Aula | Data       | Tema                                           | Onde está                                          |
| ---- | ---------- | ---------------------------------------------- | -------------------------------------------------- |
| 03   | 24/08/2026 | Driver puro (`pg`): conexão e queries          | [`aula-04-driver-pg/`](aula-04-driver-pg/README.md) |
| 04   | 31/08/2026 | CRUD completo e prevenção de SQL Injection     | [`aula-04-driver-pg/`](aula-04-driver-pg/README.md) |
| 06   | 19/10/2026 | ORM na prática com Prisma 7 (exemplo completo) | [`aula-06-prisma/`](aula-06-prisma/README.md)       |
| AP2  | 19/10/2026 | AP2 nº 1 — Biblioteca com Prisma               | **raiz** (este README)                             |

## Estrutura

```
(raiz)
├── docker-compose.yml     ← o PostgreSQL da Aula 2 (serve para todas as aulas)
├── .env.example           ← copie para .env
├── prisma/
│   ├── schema.prisma      ← Tarefa 1: você escreve o model Livro aqui
│   └── seed.ts            ← popula o banco com 8 livros para teste (pronto)
├── lib/prisma.ts          ← cria o "controle remoto" (pronto, não mexe)
├── src/
│   ├── cadastrar.ts       ← Tarefa 2
│   ├── consultar.ts       ← Tarefa 3
│   ├── emprestar.ts       ← Tarefa 4
│   └── excluir.ts         ← Tarefa 5
├── aula-04-driver-pg/     ← projeto das Aulas 03 e 04 (driver pg)
└── aula-06-prisma/        ← exemplo completo da Aula 06 (consulte!)
```

## Passo a passo

1. **Crie o `.env`** a partir do modelo (na raiz):

   ```bash
   cp .env.example .env          # Windows: copy .env.example .env
   ```

   Ele tem as variáveis do Docker (`POSTGRES_*`) e o `DATABASE_URL` do
   Prisma, apontando para o banco `biblioteca` no mesmo container da Aula 2
   (porta **5433**, `aluno` / `senha123`).

2. **Suba o banco:**

   ```bash
   docker compose up -d
   docker compose ps            # o status deve ser "Up"
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Tarefa 1 — escreva o `model Livro`** em `prisma/schema.prisma` (os
   campos pedidos estão no comentário do arquivo) e crie a tabela. Isso
   também cria o banco `biblioteca`:

   ```bash
   npm run db:migrate -- --name criar_livros
   ```

5. **Popule o banco** com 8 livros de teste (anos antes e depois de 2000,
   dois do Machado de Assis, um sem sinopse e um já emprestado):

   ```bash
   npm run db:seed
   ```

   Pode rodar quantas vezes quiser: ele não duplica nem apaga os livros que
   você cadastrou. Se der erro de campo desconhecido, confira se o seu model
   usa exatamente os nomes do enunciado.

6. **Tarefas 2 a 5** — preencha os `TODO` de cada arquivo, **na ordem**, e
   rode:

   | Tarefa | Arquivo            | Comando             |
   | ------ | ------------------ | ------------------- |
   | 2      | `src/cadastrar.ts` | `npm run cadastrar` |
   | 3      | `src/consultar.ts` | `npm run consultar` |
   | 4      | `src/emprestar.ts` | `npm run emprestar` |
   | 5      | `src/excluir.ts`   | `npm run excluir`   |

   Cada `TODO` diz qual script de `aula-06-prisma/src/` consultar. Copie,
   cole e **adapte** (troque `produto` por `livro` e os campos).

7. **Veja os dados** no navegador: `npm run db:studio`.

> ℹ️ Enquanto você não criar o `model Livro` e rodar o migrate, os scripts de
> `src/` **não funcionam** e `prisma.livro` aparece sublinhado em vermelho no
> VS Code. Isso é esperado: o "controle remoto" ainda não tem o botão `livro`.

## Comandos

| Comando               | Para quê                                                          |
| --------------------- | ----------------------------------------------------------------- |
| `npm run db:migrate`  | mudou o `schema.prisma`? rode com `-- --name o_que_mudou`         |
| `npm run db:seed`     | popula o banco com os livros de teste                             |
| `npm run db:generate` | regenera o client (o autocomplete) sem mexer no banco             |
| `npm run db:studio`   | abre o Prisma Studio no navegador                                 |
| `npm run db:reset`    | ⚠ apaga TUDO do banco `biblioteca` e recria as tabelas (depois rode o `db:seed`) |

Erros comuns e como resolver: veja a tabela no
[README da Aula 06](aula-06-prisma/README.md#erros-comuns).

## 🔒 Lembrete

**Nunca suba o `.env` para o GitHub.** Ele tem a senha do banco. O
`.gitignore` já ignora `.env`, `node_modules/` e `generated/`.
