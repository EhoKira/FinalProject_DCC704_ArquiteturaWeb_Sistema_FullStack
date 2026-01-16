# 🎓 Projeto Final - TechParts (Full Stack)

Aplicação Full Stack (Backend API + Frontend SPA) desenvolvida para a disciplina de Arquitetura Web.
- **Backend**: Node.js + Express + MongoDB (Mongoose), padrão MVC para API (JSON)
- **Frontend**: React (SPA) com rotas e consumo da API
- **Segurança**: Login com bcrypt + autenticação JWT + autorização por roles (admin/user)

---

## 🎥 Vídeo de Demonstração

[![TechParts - Vídeo de Demonstração](https://img.youtube.com/vi/Zmi-gzpOHY8/0.jpg)](https://youtu.be/Zmi-gzpOHY8)

Link direto: https://youtu.be/Zmi-gzpOHY8

---

## 🧱 Estrutura do Repositório

```plaintext
├─ client/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ contexts/
│  │  ├─ pages/
│  │  ├─ routes/
│  │  ├─ services/
│  │  ├─ styles/
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  └─ vite.config.js
│
├─ server/
│  ├─ config/
│  ├─ controllers/
│  ├─ middlewares/
│  ├─ models/
│  ├─ node_modules/
│  ├─ routes/
│  ├─ views/
│  ├─ app.js
│  ├─ package-lock.json
│  ├─ package.json
│  └─ server.js
│
├─ .gitignore
├─ LICENSE
├─ package-lock.json
└─ README.md
```

---

## ✅ Requisitos atendidos

### Backend (Node.js + Express + MongoDB)
- API seguindo padrão **MVC** (Model/Controller e “View” = JSON)
- **MongoDB** com **Mongoose**
- **CRUD completo** para pelo menos **2 entidades relacionadas** (Users e Products)
- **Login** com senha em **hash (bcrypt)**
- **Autorização (AuthZ)** com **2 níveis**: `admin` e `user`
- Validação no backend (Mongoose validation e/ou Joi)

### Frontend (React SPA)
- React (Vite)
- Consumo da API via **Axios**
- Rotas SPA com **react-router-dom**
- Estado do usuário logado (token + role)
- Responsivo (CSS Flex/Grid)
- Feedback de **erro** e **loading**


---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js (LTS)
- MongoDB (local) **ou** MongoDB Atlas
- npm ou yarn

---

### 1) Backend
```bash
cd server
npm install
```

Crie o arquivo .env em /server:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_db
JWT_SECRET=sua_chave_secreta
```

Rodar:

```bash
npm run dev
```

Backend em:
```bash
http://localhost:5000
```

---

### 2) Frontend

```bash
cd client
npm install
npm run dev
```

Frontend em:
```bash
http://localhost:5173
```

---

## 🔐 Contas / Perfis de acesso

### 👤 Usuário comum (User)
- Pode navegar pelos produtos e acessar o perfil.
- **Não** acessa rotas de administração.

### 🛠️ Administrador (Admin)
- Acessa `/admin/products` para **criar / editar / excluir** produtos.
- Rotas protegidas no backend via **JWT** + `role: "admin"`.

> **Dica:** Para transformar um usuário em admin, altere o campo `role` no MongoDB para `"admin"` no documento do usuário.

---

## 🧩 Funcionalidades principais

### 🔑 Autenticação
- Cadastro de usuário
- Login com JWT
- Persistência do token no frontend (**localStorage**)
- Proteção de rotas (**ProtectedRoute / AdminRoute**)

### 🛒 Produtos (CRUD)
- Listagem pública de produtos
- Detalhe do produto
- CRUD completo via admin:
  - Criar produto
  - Editar produto
  - Excluir produto
- Atualizações refletem automaticamente para o usuário (Home consumindo API)

---

## 🌐 Rotas principais (Frontend)
- `/` — Home (lista produtos)
- `/products/:id` — Detalhes do produto
- `/login` — Login
- `/register` — Cadastro
- `/profile` — Perfil (**precisa estar logado**)
- `/admin/products` — Admin listagem (**somente admin**)
- `/admin/products/new` — Admin criação (**somente admin**)
- `/admin/products/:id` — Admin edição (**somente admin**)

---

## 📡 Endpoints principais (Backend)

### 🔐 Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### 🧾 Products (público)
- `GET /api/products`
- `GET /api/products/:id`

### 🛠️ Products (admin)
- `POST /api/products` *(JWT + role admin)*
- `PUT /api/products/:id` *(JWT + role admin)*
- `DELETE /api/products/:id` *(JWT + role admin)*

---

## 👥 Autores

- **Eduardo Izidório** — [@EhoKira](https://github.com/EhoKira)
- **Shelly Leal** — [@ShellyLeal05](https://github.com/ShellyLeal05)

---

## 📌 Sobre o projeto

Este projeto foi desenvolvido como **trabalho final da disciplina de Arquitetura Web**, demonstrando a construção de um sistema **Full Stack completo** com separação de **frontend** e **backend**, incluindo autenticação, autorização por perfis e operações CRUD integradas ao banco de dados.

---
