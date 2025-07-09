// Exemplo de conexão com SQLite usando sqlite3 em TypeScript
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config()

const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION
});

export default pool;
