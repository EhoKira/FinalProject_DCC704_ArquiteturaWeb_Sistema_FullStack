# 🎓 Projeto Final - E-commerce de Eletrônicos (Full Stack)

Aplicação Full Stack (Backend API + Frontend SPA) desenvolvida para a disciplina de Arquitetura Web.
- **Backend**: Node.js + Express + MongoDB (Mongoose), padrão MVC para API (JSON)
- **Frontend**: React (SPA) com rotas e consumo da API
- **Segurança**: Login com bcrypt + autenticação JWT + autorização por roles (admin/user)

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


## ✅ Requisitos atendidos
- CRUD completo para entidades relacionadas (Usuários e Produtos)
- Autenticação (JWT) e hash de senha (bcrypt)
- Autorização (Admin e Usuário comum)
- Validações no backend
- React SPA com rotas, estado do usuário logado, UX (loading/erros)

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