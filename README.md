# 🧑‍💻 User Management API

API REST para gerenciamento de usuários, desenvolvida com foco em boas práticas de backend moderno, como princípios SOLID, Design Patterns e escalabilidade, incluindo autenticação, controle de acesso (RBAC), paginação, filtros e soft delete.

---

## 📌 Sobre o projeto

Esta API foi criada com o objetivo de praticar e demonstrar conceitos importantes de desenvolvimento backend, como:

* Arquitetura em camadas (Controller → Use Case → Repository)
* Autenticação com JWT
* Controle de acesso baseado em papéis (RBAC)
* Paginação de dados
* Soft delete e hard delete
* Validação de dados com Zod
* Uso de ORM (Prisma) com PostgreSQL

O sistema permite o gerenciamento completo de usuários, incluindo criação, autenticação, listagem, atualização, desativação e remoção definitiva.

---

## 🚀 Tecnologias utilizadas

* Node.js
* TypeScript
* Fastify
* Prisma ORM
* PostgreSQL
* Zod
* JWT (JSON Web Token)
* Docker (opcional)

---

## ⚙️ Funcionalidades

### 🔐 Autenticação

* Login com geração de access token
* Refresh token armazenado em cookie httpOnly
* Renovação de token

### 👥 Usuários

* Criar usuário
* Listar usuários ativos (com paginação e filtro por nome)
* Listar usuários inativos (com paginação e filtro por nome) (somente admin)
* Buscar usuário por ID
* Atualizar usuário
* Soft delete (desativar usuário)  (somente admin)  
* Reativar usuário  (somente admin)  
* Hard delete (remoção permanente)  (somente admin)  

### 🔒 Controle de acesso (RBAC)

* Rotas protegidas com JWT
* Permissões baseadas em role (`ADMIN`, `MEMBER`)
* Rotas administrativas restritas

---

## 📂 Estrutura do projeto

```
src/
  http/
    controllers/
    middlewares/
  use-cases/
  repositories/
  lib/
prisma/
```

* **controllers** → lidam com requisição/resposta
* **use-cases** → regras de negócio
* **repositories** → acesso ao banco
* **middlewares** → autenticação e autorização

---

## 🔧 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Paulo-b2/user-management-api.git
cd user-management-api
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Configure o ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
DATABASE_URL=
JWT_SECRET=
```

---

### 4. Suba o banco de dados (opcional com Docker)

```bash
docker compose up -d
```

---

### 5. Rode as migrations

```bash
npx prisma migrate dev
```

---

### 6. Inicie a aplicação

```bash
npm run dev
```

---

## 📡 Principais rotas

### 🔐 Autenticação

```http
POST /sessions
POST /token/refresh
```

---

### 👥 Usuários

```http
POST   /users
GET    /users?page=1&name=joao
GET    /users/:id
PATCH  /users/:id
```

---

### 🛠️ Admin

```http
GET /users/inactive?page=1&name=joao
PATCH  /users/:id/reactivate
DELETE /users/:id        (soft delete)
DELETE /users/:id/hard   (hard delete)
```

---

## 📄 Paginação

As rotas de listagem utilizam paginação baseada em:

```http
GET /users?page=1
```

* `page`: número da página (mínimo 1)
* limite fixo de 20 registros por página

---

## 🔍 Filtros

É possível filtrar usuários por nome:

```http
GET /users?name=joao
GET /users/inactive?name=joao
```

* Busca parcial (`contains`)
* Case insensitive

---

## 🔒 Segurança

* Senhas armazenadas com hash
* Autenticação via JWT
* Refresh token seguro em cookie httpOnly
* Controle de acesso por role
* Rotas sensíveis protegidas

---

## ⚠️ Observações

* Testes automatizados ainda não foram implementados
* A API está preparada para evolução com novos filtros e features
* Projeto focado em aprendizado e boas práticas

---

## 📌 Possíveis melhorias futuras

* Testes automatizados (Vitest)
* Documentação com Swagger/OpenAPI
* Paginação com metadados (`total`, `totalPages`)
* Filtros avançados
* Sistema de logs
* Rate limiting

---

## 👨‍💻 Autor

Desenvolvido por Paulo Eduardo Nunes Ribeiro

---

## 📜 Licença

Este projeto está sob a licença MIT.
