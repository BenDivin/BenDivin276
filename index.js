const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index'))
app.get("/database", (req,res) => {
  var getUsersQuery = 'SELECT * FROM personinfo';
  pool.query(getUsersQuery, (error,result) => {
    if (error){
      res.end(error);
    }
    var results = {'rows':result.rows}
    res.render('pages/db', data);
  })
});
app.post('/adduser', (req,res) => {
  console.log("post request for /adduser");
  var name = req.body.name;
  var age = req.body.age;
  var size = req.body.size;
  var type = req.body.type;
  var height = req.body.height;
  var skill = req.body.skill;
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
