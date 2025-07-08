// Exemplo de conexão com SQLite usando sqlite3 em TypeScript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
   user: 'postgres', // substitua pelo seu usuário
   host: 'localhost',
   database: 'futebol_semanal',
   password: '12345678',
   port: 5432,
});

export default pool;
