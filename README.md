# 🚀 Help Desk API

Uma API REST desenvolvida com **NestJS** para gerenciamento de chamados de suporte (Help Desk).

O sistema permite que usuários criem tickets, acompanhem seu andamento e interajam por meio de comentários, enquanto equipes de suporte e administradores gerenciam os chamados utilizando autenticação JWT, controle de permissões por papéis (RBAC) e registro automático de histórico de ações.

---

# 📌 Objetivo

Este projeto foi desenvolvido com o objetivo de demonstrar conhecimentos em desenvolvimento Backend utilizando **NestJS**, seguindo boas práticas de arquitetura, autenticação, autorização, organização em módulos e integração com banco de dados utilizando **Prisma ORM**.

---

# 🛠 Tecnologias utilizadas

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Passport.js
- Class Validator
- Swagger
- Docker *(em desenvolvimento)*

---

# 📂 Arquitetura

O projeto segue a arquitetura modular recomendada pelo NestJS.

```
Controller
        │
        ▼
Service
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL
```

Estrutura principal:

```
src
├── auth
├── tickets
├── comment
├── log
├── prisma
├── app.module.ts
└── main.ts
```

---

# 🔐 Controle de acesso

O sistema utiliza autenticação baseada em JWT.

Cada usuário possui uma Role:

- USER
- SUPPORT
- ADMIN

As permissões são controladas através dos Guards do NestJS.

---

# ✅ Funcionalidades

## 👤 Autenticação

- Cadastro de usuários
- Login com JWT
- Alteração de Role (Admin)

---

## 🎫 Tickets

- Criar Ticket
- Buscar Ticket por ID
- Listar Tickets do usuário
- Filtrar Tickets por prioridade
- Alterar Status
- Assumir Ticket
- Atribuir Ticket para outro usuário
- Fechar Ticket

---

## 💬 Comentários

- Criar comentário em um Ticket
- Listar comentários de um Ticket

---

## 📜 Logs

O sistema registra automaticamente ações importantes como:

- Criação de Ticket
- Alteração de Status
- Assumir Ticket
- Atribuição de responsável
- Fechamento do Ticket

Também é possível listar todos os logs de um Ticket.

---

# 🔄 Fluxo do sistema

```
Usuário

↓

Login

↓

Cria Ticket

↓

Suporte assume Ticket

↓

Comentários

↓

Alteração de Status

↓

Fechamento

↓

Logs registrados automaticamente
```

---

# 📖 Documentação

A documentação da API está disponível através do Swagger.

```
http://localhost:3000/api
```

Após o deploy:

```
https://seu-endereco/api
```

---

# ⚙️ Instalação

Clone o projeto

```bash
git clone https://github.com/seu-usuario/helpdesk-api.git
```

Entre na pasta

```bash
cd helpdesk-api
```

Instale as dependências

```bash
npm install


```docker compose up --build

Acesse:

localhost:3000

Swagger:

localhost:3000/api

# 🗄 Banco de dados

Execute as migrations

```bash
npx prisma migrate dev
```

Gere o Prisma Client

```bash
npx prisma generate
```

---

# 🔑 Variáveis de ambiente

Crie um arquivo `.env`

```env
DATABASE_URL=

JWT_SECRET=

PORT=3000
```

---

# ▶️ Executando

Modo desenvolvimento

```bash
npm run start:dev
```

Modo produção

```bash
npm run build

npm run start:prod
```

---

# 📌 Principais Endpoints

## Autenticação

```
POST /auth/register

POST /auth/login

PATCH /auth/role
```

---

## Tickets

```
POST /tickets/create

GET /tickets

GET /tickets/:ticketId

PATCH /tickets/:ticketId/status

PATCH /tickets/:ticketId/assign

PATCH /tickets/:ticketId/close
```

---

## Comentários

```
POST /comments/:ticketId/comment

GET /comments/:ticketId
```

---

## Logs

```
GET /logs/:ticketId
```

---

# 📈 Próximas melhorias

- Docker
- Deploy em produção
- Testes unitários
- Testes de integração
- CI/CD
- Paginação
- Filtros avançados
- Upload de anexos

---

# 👨‍💻 Autor

**Jeferson Paixão**

GitHub

https://github.com/Rouue777

LinkedIn

https://www.linkedin.com/in/jefersonsantos36/

---

# 📄 Licença

Projeto desenvolvido para fins de estudo e portfólio.