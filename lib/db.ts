
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initDb(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      isPaid BOOLEAN DEFAULT false,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `);
}

export async function query(text: string, params: any[] = []) {
  const result = await pool.query(text, params);
  return result.rows;
}

export async function queryOne(text: string, params: any[] = []) {
  const result = await pool.query(text, params);
  return result.rows[0];
}

export async function execute(text: string, params: any[] = []) {
  await pool.query(text, params);
}