const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://fndcaique:*ElaineKita*@cluster0-aywhl.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(express.json()); // app recebe requisições com o corpo json
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou deleção)
// Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não relacional)

app.listen(3333, '0.0.0.0', () => {
  console.log('App on port 3333');
});
