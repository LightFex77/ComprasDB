const pg = require('pg');

const connection = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin123',
    port: 5432,
    database: 'postgres',
});

module.exports = connection;