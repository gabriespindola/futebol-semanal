import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jogadorRoutes from './routes/jogador.routes';
import partidaRoutes from './routes/partida.routes';
import estatisticaRoutes from './routes/estatistica.routes';
import usuariosRoutes from './routes/usuarios.routes';
import authRoutes from './routes/auth.routes';
import homeRoutes from './routes/home.routes';
import { autenticar, realizaLog } from './middlewares/auth.middleware';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(realizaLog)

app.use('/jogadores', autenticar, jogadorRoutes);
app.use('/partidas', autenticar, partidaRoutes);
app.use('/estatisticas', autenticar, estatisticaRoutes);
app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/home', homeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
