const express = require('express');
const router = express.Router();

const connection = require("../services/db");

/* GET home page. */
router.get('/', function (req, res, next) {
  connection.query("INSERT INTO innings(document) VALUES (101010);",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      // rows fetch
      console.log(data);
    });

  connection.query("SELECT * FROM innings",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      // rows fetch
      console.log(data);
    });

  /*   connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;
      console.log('The solution is: ', rows[0].solution);
    }); */
    console.log(`
    
    
    
    
    
    `)
    console.log("Por acá andamos")
    console.log(process.env.DB_HOST)
    console.log(process.env.DB_USERNAME)
    console.log(process.env)
    console.log(`
    
    
    
    
    
    `)



  res.render('index', {
    title: 'Hellos'
  });
});

module.exports = router;