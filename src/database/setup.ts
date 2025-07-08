import fs from 'fs';
import path from 'path';
import pool from './connection';

async function setupDatabase() {
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  try {
    await pool.query(schema);
    console.log('Banco de dados configurado com sucesso!');
  } catch (error) {
    console.error('Erro ao configurar o banco de dados:', error);
  } finally {
    await pool.end();
  }
}

setupDatabase();
