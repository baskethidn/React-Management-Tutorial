const fs = require('fs')

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const { poolPromise } = require('./db')

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// mssql 연동
// const sql = require('mssql')

// const config =  {
//   server: conf.server,
//   port: conf.port,
//   options: { encrypt:true, database: conf.database },
//   authentication:{
//       type:"default",
//       options:{
//           userName:conf.user,
//           password:conf.password
//       }
//   },
//   pool: { max: 5, min: 1, idleTimeoutMillis: 30000, },
//   trustServerCertificate: true
// };

// sql.connect(config, function(err){
//   if(err){
//       return console.error('error : ', err);
//   }
//   // var request = new sql.Request();
//   // request.query('SELECT * FROM CUSTOMER', (err, rows, fields)=> {
//   //   if (err){
//   //     console.log(err);
//   //   }
//   //   else
//   //   {
//   //     console.log(rows);
//   //   }
//   // });  
// })

// app.get('/api/customers', (req, res) => {
//   var request = new sql.Request();
//   request.query('SELECT * FROM CUSTOMER', (err, rows, fields)=> {
//     res.send(rows);
//     //res.send(rows.recordset);
//   }
//   );
// });

// const pool = new sql.ConnectionPool(config)
// .connect()
// .then(pool => {
//   console.log('Connected to MSSQL')
//   return pool
// })
// .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

// module.exports = {
//   sql, pool
// }

const multer = require('multer');
const upload = multer({dest: 'upload'})

app.get('/api/customers', async (req, res) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT * FROM CUSTOMER', (err, rows, fields)=> {
    if (err){
      console.log(err);
    }
    else
    {
      res.send(rows.recordset);
    }
  });
});

app.use('/image',express.static('./upload'));

app.post('/api/customers', upload.single('image'),  async (req, res)=>
 {
  let image = 'http://localhost:5000/image/' + req.file.filename;
  //let image = req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  console.log(name)
  console.log(image)
  console.log(birthday)
  console.log(gender)
  console.log(job)
  //let params = [image, name, birthday, gender, job, params];
  const pool =  await poolPromise;
  const result = await pool.request()
    // .input('image', sql.VarChar(1024), image)
    // .input('name', sql.VarChar(64), name)
    // .input('birthday', sql.VarChar(64), birthday)
    // .input('gender', sql.VarChar(64), gender)
    // .input('job',  sql.VarChar(64), job)
    .input('image', image)
    .input('name', name)
    .input('birthday', birthday)
    .input('gender', gender)
    .input('job',  job)
    .query('insert into CUSTOMER(image,name,birthday,	gender,	job) values(@image, @name,@birthday, @gender, @job)', (err, rows, fields)=> {
    if (err){
      console.log(err);
    }
    else
    {
      res.send(rows.recordset);
    }
  });
 }
);

app.listen(port, () => console.log(`Listening on port ${port}`));