const express = require('express');
const router = express.Router();

//const db = require("../services/db");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expresss' });
/*   db.query("SELECT * FROM users",
  (err, result) => {
    console.log(result)
  }) */
});

module.exports = router;