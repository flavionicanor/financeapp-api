import 'dotenv/config.js';

import fs from 'fs';
import { pool } from '../helper.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execMigrations = async () => {
  const client = await pool.connect();

  const filePath = path.join(__dirname, '01-init.sql');
  const script = fs.readFileSync(filePath, 'utf-8');
  try {
    await client.query(script);
    console.log('Migrations executadas com sucesso');
  } catch (error) {
    console.error('Erro ao executar migrations', error);
  } finally {
    client.release();
  }
};

execMigrations();
