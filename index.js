const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
var client;
pool = new Pool({
  //user: 'postgres',
  //host: 'localhost',
  //database: 'person',
  //password: 'power',
  //port: 5432,
  connectionString: process.env.HEROKU_POSTGRESQL_BRONZE_URL
});

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index'))
app.post('/addperson', (req,res) => {
  console.log("post request for /addperson");
  var name = req.body.name;
  var age = req.body.age;
  var size = req.body.size;
  var type = req.body.type;
  var height = req.body.height;
  var skill = req.body.skill;
  var query = `INSERT into personinfo (name, age, size, type, height, skill) VALUES('${name}', ${age}, ${size}, '${type}', ${height}, ${skill})`
  pool.query(query,(err,result)=>{
    if(err) {
      return console.error("Query has errored unlucky", err.stack)
    }
    console.log("Query successful")
  })
});
app.post('/deleteperson', (req,res) => {
  var deleteThis = req.body.deleteThis;
  var query = `DELETE FROM personinfo WHERE NAME = '${deleteThis}';`;
  pool.query(query,(err,result)=>{
    if(err) {
      return console.error("Query has errored unlucky", err.stack)
    }
    console.log(`${deleteThis} has been deleted.`)
  })
});
app.post('/editperson', (req,res) => {
  console.log("post request for /editperson");
  var name = req.body.name;
  if(req.body.age){
    var query = `UPDATE personinfo SET age = '${req.body.age}' WHERE name = '${name}'`;
    pool.query(query,(err,result)=>{
      if(err) {
        return console.error("Query has errored unlucky", err.stack)
      }
      console.log("Query successful")
    })
  }
  if(req.body.size){
    var query = `UPDATE personinfo SET age = '${req.body.size}' WHERE name = '${name}'`;
    pool.query(query,(err,result)=>{
      if(err) {
        return console.error("Query has errored unlucky", err.stack)
      }
      console.log("Query successful")
    })
  }
  if(req.body.type){
    var query = `UPDATE personinfo SET age = '${req.body.type}' WHERE name = '${name}'`;
    pool.query(query,(err,result)=>{
      if(err) {
        return console.error("Query has errored unlucky", err.stack)
      }
      console.log("Query successful")
    })
  }
  if(req.body.height){
    var query = `UPDATE personinfo SET age = '${req.body.height}' WHERE name = '${name}'`;
    pool.query(query,(err,result)=>{
      if(err) {
        return console.error("Query has errored unlucky", err.stack)
      }
      console.log("Query successful")
    })
  }
  if(req.body.skill){
    var query = `UPDATE personinfo SET age = '${req.body.skill}' WHERE name = '${name}'`;
    pool.query(query,(err,result)=>{
      if(err) {
        return console.error("Query has errored unlucky", err.stack)
      }
      console.log("Query successful")
    })
  }
});

app.get('/Assignment2', (req,res) => {
  var query = 'SELECT * FROM personinfo;';
  pool.query(query,(err,result)=>{
    if(err) {
      return console.error("Query has errored unlucky", err.stack)
    } else {
      var results = {'rows': result.rows};
      res.render('pages/Assignment2', results);
    }
  })
});

app.get('/arena', (req,res) => {
  var query = 'SELECT * FROM personinfo;';
  pool.query(query,(err,result)=>{
    if(err) {
      return console.error("Query has errored unlucky", err.stack)
    } else {
      var results = {'rows': result.rows};
      res.render('pages/arena', results);
    }
  })
});

app.post('/fight', (req,res) => {
  var name1 = req.body.firstName;
  var name2 = req.body.secondName;
  pool.query(`SELECT * FROM personinfo WHERE name = '${name1}' OR name = '${name2}';`,(err,result)=>{
    if(err) {
      return console.error("Query has errored unlucky", err.stack)
    } else {
      var results = {'rows': result.rows};
      res.render('pages/arenaResults', results);
    }
  })
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
