// const { Pool } = require('pg');
import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dice_roll_database',
    password: '',
    port: 5432,
});
