
// Importa o mongoose para conectar ao MongoDB
import mongoose from 'mongoose';
// Carrega variáveis de ambiente do arquivo .env
import { config } from 'dotenv';
config(); // Carrega as variáveis de ambiente do .env

// Desestrutura as variáveis de ambiente
const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB
} = process.env;

// Monta a string de conexão com autenticação
const mongoUri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_DB}`;

console.log(mongoUri); // Exibe a URI para verificar se está correta
// Conecta ao MongoDB usando Mongoose (sem opções obsoletas)
mongoose.connect(mongoUri)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar:', err));

// Aqui você pode adicionar o restante da configuração do seu servidor Express
// Por exemplo:
// const express = require('express');
// const app = express();
// app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//   response.statusCode = 200
//   response.setHeader('Content-Type', 'text/plain')
//   response.write('Mapa DF com NodeJS e MongoDB\n')

//   return response.end()
// })

// server.listen(3333)

import { fastify } from 'fastify'

const server = fastify()

server.get('/', () => {
  return 'Mapa DF com NodeJS e MongoDB'
})

server.get('/hello', () => {
  return 'Mapa Planaltina com NodeJS e MongoDB'
})

server.listen({ port: 3333 })

