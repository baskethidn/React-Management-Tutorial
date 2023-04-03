
const sql = require('mssql')
const fs = require('fs')
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

// mssql 연동
// const sql = require('mssql');

const config =  {
  server: conf.server,
  port: conf.port,
  options: { encrypt:true, database: conf.database },
  authentication:{
      type:"default",
      options:{
          userName:conf.user,
          password:conf.password
      }
  },
  pool: { max: 5, min: 1, idleTimeoutMillis: 30000, },
  trustServerCertificate: true
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}
