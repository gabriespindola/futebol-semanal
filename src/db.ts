import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT NOW()')
  .then(res => {
    console.log('✅ Conectado ao banco! Horário do servidor:', res.rows[0].now);
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao banco:', err.message);
  });

export default pool;
