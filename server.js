var express = require('express'),
  app = express(),
  port = process.env.PORT || 5000,
  mysql = require('mysql'),
  bodyParser = require('body-parser');

  mysql.Promise = global.Promise;

  var con = mysql.createConnection({
    host     : 'places-db',
    database : 'places-db',
    user     : 'sa',
    password : '123',
  });
  
  con.connect(function(err) {
    if (err) throw err;
    else {
      console.log("Connected!");
      var sql = "CREATE TABLE IF NOT EXISTS places (_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), latitude DOUBLE(20, 15), longitude DOUBLE(20, 15), user_id INT(10))";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    }
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
