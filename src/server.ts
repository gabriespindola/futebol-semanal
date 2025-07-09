import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jogadorRoutes from './routes/jogador.routes';
import partidaRoutes from './routes/partida.routes';
import estatisticaRoutes from './routes/estatistica.routes';
import usuariosRoutes from './routes/usuarios.routes';
import { autenticar, realizaLog } from './middlewares/auth.middleware';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(realizaLog)

app.use('/Jogadores', autenticar, jogadorRoutes);
app.use('/Partidas', autenticar, partidaRoutes);
app.use('/Estatisticas', autenticar, estatisticaRoutes);
app.use('/Usuarios', usuariosRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
