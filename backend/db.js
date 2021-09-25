const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'YOUR PASSWORD GOES HERE',
    database: 'matches_database',
    host: 'localhost',
    port: 5432
});

module.exports = pool;
