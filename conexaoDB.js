const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'biblioteca',
    password: '123456',
    port: 5433
});

const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {query};