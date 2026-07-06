# 🚀 Help Desk API

API REST desenvolvida com **NestJS**, **Prisma ORM** e **PostgreSQL** para gerenciamento de chamados (Help Desk). O projeto implementa autenticação JWT, controle de permissões por roles, comentários, logs de auditoria, documentação com Swagger e ambiente totalmente containerizado com Docker.

Este projeto foi desenvolvido com foco em boas práticas de arquitetura backend e compõe meu portfólio para oportunidades como Desenvolvedor Backend.

---

# 📚 Tecnologias

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Passport.js
* Swagger
* Docker
* Docker Compose
* Bcrypt

---

# ✨ Funcionalidades

## Autenticação

* Cadastro de usuários
* Login utilizando JWT
* Hash de senha com Bcrypt

## Controle de acesso

* USER
* SUPPORT
* ADMIN

Cada perfil possui permissões específicas de acesso.

---

## Tickets

* Criar ticket
* Listar tickets do usuário
* Buscar ticket por ID
* Filtrar tickets por prioridade
* Assumir ticket
* Atribuir ticket para outro usuário (ADMIN)
* Alterar status
* Fechar ticket

---

## Comentários

* Adicionar comentários
* Listar comentários de um ticket

---

## Logs

* Registro automático das ações
* Listagem de logs por ticket

---

## Documentação

* Swagger integrado

Após iniciar a aplicação:

```
http://localhost:3000/api
```

---

# 📂 Estrutura do Projeto

```
src
│
├── auth
├── tickets
├── comments
├── logs
├── prisma
├── guards
├── dto
└── main.ts
```

---

# 🔐 Roles

| Role    | Permissões                                     |
| ------- | ---------------------------------------------- |
| USER    | Criar e visualizar seus próprios tickets       |
| SUPPORT | Assumir tickets, visualizar tickets e comentar |
| ADMIN   | Controle total do sistema                      |

---

# 🐳 Executando com Docker

## Clonar o projeto

```bash
git clone https://github.com/Rouue777/helpDeskApi
```

```bash
cd helpdesk-api
```

---

## Executar

```bash
docker compose up --build
```

Durante a inicialização o projeto:

* inicia o PostgreSQL;
* aplica as migrations do Prisma;
* executa o Seed;
* inicia automaticamente a API.

---

# 🌱 Seed

O projeto possui Seed configurado automaticamente.

São criados:

* 1 usuário ADMIN
* 1 usuário SUPPORT
* 1 usuário USER
* Tickets de exemplo
* Comentários
* Logs

Isso permite testar a API imediatamente após subir os containers.

---

# 👤 Usuários de teste

## Administrador

```
Email:
admin@helpdesk.com

Senha:
123456
```

---

## Suporte

```
Email:
support@helpdesk.com

Senha:
123456
```

---

## Usuário

```
Email:
user@helpdesk.com

Senha:
123456
```

---

# 🔑 Autenticação

Após realizar login:

```
POST /auth/login
```

Será retornado um JWT.

Utilize o token no Swagger ou no cliente HTTP:

```
Authorization

Bearer <TOKEN>
```

---

# 📖 Principais Endpoints

## Auth

```
POST /auth/register
POST /auth/login
PATCH /auth/role
```

## Tickets

```
POST   /tickets/create
GET    /tickets
GET    /tickets/filter
GET    /tickets/:ticketId
PATCH  /tickets/:ticketId/status
PATCH  /tickets/:ticketId/assign
PATCH  /tickets/:ticketId/assign-user
PATCH  /tickets/:ticketId/close
```

## Comments

```
POST /comments/:ticketId/comment
GET  /comments/:ticketId
```

## Logs

```
GET /log/:ticketId
```

---

# 🧱 Arquitetura

O projeto segue uma arquitetura modular do NestJS:

* Controllers
* Services
* DTOs
* Guards
* Prisma ORM
* JWT Authentication
* Middleware de autorização por Roles

---

# 📌 Objetivos do Projeto

Este projeto foi desenvolvido para demonstrar conhecimentos em:

* Desenvolvimento Backend
* APIs REST
* Arquitetura Modular
* Autenticação JWT
* Autorização baseada em Roles
* Banco de Dados Relacional
* Prisma ORM
* Docker
* Swagger
* Boas práticas de organização de código

---

# 🚀 Melhorias Futuras

* Testes unitários
* Testes de integração
* CI/CD com GitHub Actions
* Refresh Token
* Upload de anexos
* Paginação
* Filtros avançados
* Notificações por e-mail

---

# 👨‍💻 Autor

**Jeferson Paixão**

Backend Developer

GitHub:
https://github.com/Rouue777

LinkedIn:
https://www.linkedin.com/in/jefersonsantos36/
