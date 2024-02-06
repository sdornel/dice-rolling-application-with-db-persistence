// import { pool } from '../db';
const pool = require('../db');

export async function up(): Promise<void> {
    const createTableQuery = `
        CREATE TABLE "Rolls" (
            id SERIAL PRIMARY KEY,
            number INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    await pool.query(createTableQuery);
}

export async function down(): Promise<void> {
    const dropTableQuery = 'DROP TABLE IF EXISTS "Rolls";';
    await pool.query(dropTableQuery);
}
