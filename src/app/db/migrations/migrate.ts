const pool = require('../db');
// const { up, down } = require('./create-rolls-table.js');
import { up, down } from './create-rolls-table';

async function migrate() {
  try {
    await pool.query('BEGIN');
    await up();
    await pool.query('COMMIT');
    console.log('Migration successful');
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Migration failed:', error);
  } finally {
    pool.end();
  }
}

migrate();