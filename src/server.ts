import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jogadorRoutes from './routes/jogador.routes';
import partidaRoutes from './routes/partida.routes';
import estatisticaRoutes from './routes/estatistica.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/jogadores', jogadorRoutes);
app.use('/partidas', partidaRoutes);
app.use('/estatisticas', estatisticaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
