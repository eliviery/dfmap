
// Importa o mongoose para conectar ao MongoDB
import mongoose from 'mongoose';
// Carrega variáveis de ambiente do arquivo .env
import { config } from 'dotenv';

config(); // Carrega as variáveis de ambiente do .env

import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

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

import { fastify } from 'fastify'

const server = fastify()

server.get('/', () => {
  return 'Mapa DF com NodeJS e MongoDB'
})

server.get('/hello', () => {
  return 'Mapa Planaltina com NodeJS e MongoDB'
})

server.listen({ port: 3333 })

