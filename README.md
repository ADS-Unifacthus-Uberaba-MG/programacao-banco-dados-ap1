# Programação em Banco de Dados — AP2 nº 1 · Biblioteca com Prisma

**Programação em Banco de Dados · UniFACTHUS · ADS 2026/02**
Prof. Pierre Mendes Salatiel

A **raiz deste repositório é o projeto da AP2 nº 1**: é aqui que você
trabalha. O exemplo completo da aula, para consultar, está em
[`aula-06-prisma/`](aula-06-prisma/README.md).

> 📢 **Já tinha clonado o repositório antes?** Veja
> [Como atualizar o seu projeto](#como-atualizar-o-seu-projeto) antes de começar.

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
│   ├── schema.prisma      ← Tarefa 1: você completa o model Livro aqui
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

## Como é a atividade

Você **não começa do zero**: o código já vem montado, com dois tipos de tarefa.

**1. Lacunas `___`** — troque o `___` pelo trecho de código que falta. A
lacuna pode ser um objeto inteiro ou uma chamada inteira do Prisma:

```ts
const livrosRecentes = await prisma.livro.findMany({
  where: ___,    // ← escreva o filtro "anoPublicacao maior ou igual a 2000"
  select: ___,   // ← escreva quais campos trazer
});
```

**2. Itens "ESCREVA VOCÊ"** — o último item de cada arquivo você escreve
**inteiro**, no lugar marcado com `// escreva o ... aqui`. O comentário traz o
passo a passo. Quando terminar, apague a linha de aviso
`⚠ ... ainda não foi feito`.

Cada item diz qual arquivo do exemplo da aula (`aula-06-prisma/src/`) olhar.
Enquanto sobrar algum `___`, o programa dá erro e mostra a linha: é o
lembrete de que ainda falta completar.

## Passo a passo

1. **Crie o `.env`** a partir do modelo (na raiz):

   ```bash
   cp .env.example .env          # Windows: copy .env.example .env
   ```

   > ⚠️ **Já tinha um `.env` da Aula 3/4 na raiz?** Sobrescreva com o comando
   > acima (se perguntar, responda **Sim**). O `.env` antigo não tem o
   > `DATABASE_URL` e o Prisma dá o erro *"datasource.url property is required"*.

   Ele tem as variáveis do Docker (`POSTGRES_*`) e o `DATABASE_URL` do
   Prisma, apontando para o banco `biblioteca` no mesmo container da Aula 2
   (porta **5433**, `aluno` / `senha123`).

2. **Abra o Docker Desktop** e espere aparecer *"Engine running"*. Depois suba o banco:

   ```bash
   docker compose up -d
   docker compose ps            # o status deve ser "Up"
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Tarefa 1 — complete o `model Livro`** em `prisma/schema.prisma`:
   - o model está no fim do arquivo, **comentado**: selecione as linhas dele e
     tire o comentário (`Ctrl + /`, ou `Ctrl + ;` no teclado ABNT);
   - troque cada `___` pelo tipo e pelos atributos do campo (ex.: `String @unique`),
     seguindo a tabela que está no próprio arquivo, e o último `___` pela
     linha que dá o nome da tabela (`livros`);
   - crie a tabela (isso também cria o banco `biblioteca` e atualiza o client):

   ```bash
   npm run db:migrate -- --name criar_livros
   ```

5. **Popule o banco** com 8 livros de teste (anos antes e depois de 2000,
   dois do Machado de Assis, um sem sinopse e um já emprestado):

   ```bash
   npm run db:seed
   ```

   Pode rodar quantas vezes quiser: ele não duplica nem apaga os livros que
   você cadastrou.

6. **Tarefas 2 a 5** — faça cada arquivo **na ordem** e rode:

   | Tarefa | Arquivo            | Comando             | Lacunas `___`                                 | ESCREVA VOCÊ                         |
   | ------ | ------------------ | ------------------- | --------------------------------------------- | ------------------------------------ |
   | 2      | `src/cadastrar.ts` | `npm run cadastrar` | 2a: dados do `create` · 2b: `createMany` e a quantidade | 2c: `try/catch` do ISBN repetido (P2002) |
   | 3      | `src/consultar.ts` | `npm run consultar` | 3a: `orderBy` · 3b: `where` + `select` · 3c: `where` com `contains` · 3d: o `findUnique` | 3e: contar os livros disponíveis |
   | 4      | `src/emprestar.ts` | `npm run emprestar` | 4a: `where` dos disponíveis · 4b: objeto do `update` | 4c: `try/catch` do livro inexistente (P2025) |
   | 5      | `src/excluir.ts`   | `npm run excluir`   | 5a: `where` do `findUnique`                  | 5b: `delete` + `count`               |

   Todos os scripts podem ser rodados mais de uma vez.

7. **Veja os dados** no navegador: `npm run db:studio`.

> ℹ️ Enquanto você não fizer a Tarefa 1 e rodar o migrate, os scripts de
> `src/` **não funcionam** e `prisma.livro` aparece sublinhado em vermelho no
> VS Code. Isso é esperado: o "controle remoto" ainda não tem o botão `livro`.

## Problemas comuns

| Mensagem no terminal                                                    | O que fazer                                                                                     |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `failed to connect to the docker API` / `dockerDesktopLinuxEngine`     | O **Docker Desktop está fechado**. Abra pelo menu Iniciar, espere *"Engine running"* e rode `docker compose up -d` de novo. Se não abrir: `wsl --update` no PowerShell como administrador. |
| `DATABASE_URL não encontrado` / `datasource.url property is required`  | Falta o `DATABASE_URL` no `.env` (ou é o `.env` antigo da Aula 3/4). Rode `copy .env.example .env` (Windows) ou `cp .env.example .env`. |
| `npm install` falhou com `Validation Error` / `error code 1`            | O problema está no **`schema.prisma`**, não na instalação. Leia a linha apontada (ex.: `@fault` → `@default`, `autoincremente` → `autoincrement`), corrija e rode `npm run db:generate`. |
| `Cannot find module '...generated/prisma/client'`                       | O client ainda não foi gerado. Rode `npm run db:migrate -- --name criar_livros` (ou `npm run db:generate`). |
| `Cannot read properties of undefined (reading 'findMany')` (ou `create`, `update`...) | O `model Livro` ainda não existe no client. Faça a Tarefa 1 e rode o `db:migrate`.      |
| `___ is not defined` / `Unknown argument ___`                           | Sobrou uma lacuna `___` na linha apontada (o número depois do nome do arquivo, ex.: `consultar.ts:21`). Complete! |
| Aparece `⚠ ... ainda não foi feito`                                     | Falta escrever o item "ESCREVA VOCÊ" daquele arquivo. Depois de escrever, apague a linha do aviso. |

Outros erros: veja a tabela no [README da Aula 06](aula-06-prisma/README.md#erros-comuns).

## Comandos

| Comando               | Para quê                                                          |
| --------------------- | ----------------------------------------------------------------- |
| `npm run db:migrate`  | mudou o `schema.prisma`? rode com `-- --name o_que_mudou`         |
| `npm run db:seed`     | popula o banco com os livros de teste                             |
| `npm run db:generate` | regenera o client (o autocomplete) sem mexer no banco             |
| `npm run db:studio`   | abre o Prisma Studio no navegador                                 |
| `npm run db:reset`    | ⚠ apaga TUDO do banco `biblioteca` e recria as tabelas (depois rode o `db:seed`) |

## Como atualizar o seu projeto

Se você **já tinha clonado** o repositório antes (Aulas 3/4 ou primeira versão
da AP2), atualize assim, no terminal do VS Code, dentro da pasta do projeto:

1. **Guarde o que você já tinha mexido** (se não mexeu em nada, pode rodar mesmo assim):

   ```bash
   git stash
   ```

2. **Baixe a versão nova:**

   ```bash
   git pull
   ```

3. **Recrie o `.env`** (o antigo da Aula 4 não serve para a AP2). Se perguntar
   se quer sobrescrever, responda **Sim**:

   ```bash
   copy .env.example .env        # Mac/Linux: cp .env.example .env
   ```

4. **Abra o Docker Desktop**, espere aparecer *"Engine running"* e rode:

   ```bash
   docker compose up -d
   npm install
   ```

5. **Siga o [Passo a passo](#passo-a-passo)** a partir da **Tarefa 1** (`prisma/schema.prisma`).

💡 Dicas:

- Quem baixou o projeto em **.zip** em vez de clonar: é só baixar o .zip de novo.
- Para recuperar o que tinha feito antes do `git stash`, rode `git stash pop`.
  Isso pode dar conflito com os arquivos novos, então só faça se souber
  resolver. O recomendado é seguir no formato novo.
- O projeto das Aulas 3/4 agora fica em `aula-04-driver-pg/` e usa um `.env`
  próprio: `copy aula-04-driver-pg\.env.example aula-04-driver-pg\.env`.

## 🔒 Lembrete

**Nunca suba o `.env` para o GitHub.** Ele tem a senha do banco. O
`.gitignore` já ignora `.env`, `node_modules/` e `generated/`.
