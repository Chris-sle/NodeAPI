const sql = require('mssql');

const config = {
    server: 'CHRIS-PC\\SQLEXPRESS',
    database: 'expressxnode',
    user: 'sa',
    password: '1234',
    options: {
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.log('Database connection failed', err));

module.exports = {
    sql, poolPromise
};