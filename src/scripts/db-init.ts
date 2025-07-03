import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

async function initializeDatabase() {
  // Load environment variables
  dotenv.config();

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });

  try {
    console.log('Connecting to PostgreSQL...');
    const client = await pool.connect();

    console.log('Connected. Reading schema file...');
    const schemaPath = path.join(process.cwd(), 'src', 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing schema...');
    await client.query(schema);

    console.log('Database initialized successfully!');
    client.release();
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await pool.end();
  }
}

initializeDatabase(); 