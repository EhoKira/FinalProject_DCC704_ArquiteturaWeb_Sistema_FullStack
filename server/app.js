const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

//teste de rota protegida
// const authMiddleware = require('./middlewares/authMiddleware');
// const roleMiddleware = require('./middlewares/roleMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API E-commerce rodando 🚀' });
});

//Teste de rota protegida
// app.get('/api/teste-protegido', authMiddleware, (req, res) => {
//   res.json({
//     message: 'Acesso autorizado',
//     user: req.user
//   });
// });

// app.get(
//   '/api/teste-admin',
//   authMiddleware,
//   roleMiddleware(['admin']),
//   (req, res) => {
//     res.json({ message: 'Acesso liberado para ADMIN' });
//   }
// );

module.exports = app;