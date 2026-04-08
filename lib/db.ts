import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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

export async function initDb(): Promise<void> {
  // Table already created in Supabase, nothing to do
}