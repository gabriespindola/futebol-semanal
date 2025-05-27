import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jogadorRoutes from './routes/jogador.routes';
import partidaRoutes from './routes/partida.routes';
import estatisticaRoutes from './routes/estatistica.routes';
import authRoutes from './routes/auth.routes';
import autenticar from './middlewares/auth.middleware';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/jogadores', autenticar, jogadorRoutes);
app.use('/partidas', autenticar, partidaRoutes);
app.use('/estatisticas', autenticar, estatisticaRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
