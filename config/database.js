
import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error.message);
    // Encerra a aplicação em caso de falha na conexão
    process.exit(1);
  }
};

export default connectDB;

mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado ao DB.');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão do Mongoose: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado.');
});

