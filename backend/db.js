const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'test123',
    database: 'matches_database',
    host: 'localhost',
    port: 5432
});

module.exports = pool;