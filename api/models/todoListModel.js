'use strict';


// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema,
//     autoIncrement = require('mongoose-auto-increment');

// var connection = mongoose.createConnection('mongodb://scoreresources-db/dummy-app');

//autoIncrement.initialize(connection);

var mysql = require('mysql');

var con = mysql.createConnection({
  host     : 'places-db',
  user     : 'sa',
  password : '123',
});

var con2 = mysql.createConnection({
  host     : 'places-db',
  database : 'places-db',
  user     : 'sa',
  password : '123',
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE IF NOT EXISTS places-db", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });

// con.end();

// con2.connect(function(err) {
//   var sql = "CREATE TABLE IF NOT EXISTS places (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), latitude DOUBLE(20, 15), longitude DOUBLE(20, 15), user_id INT(10))";
//   con2.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

// con2.end();

// var TaskSchema = new Schema({
//   //service: String,
//   //service_id: Number,

//   name: {
//     type: String,
//     required: false
//   } ,
//   description: {
//     type: String,
//   required : false  
//   },
//   latitude: {
//     type: Number,
//     required: [true, 'Falta Latitud']
//   },
//   longitude: {
//     type: Number,
//     required: [true, 'Falta Longitud']
//   },
//   user_id: {
//     type: Number,
//     required: [true, 'Falta User_id']
//   }
// });




// TaskSchema.plugin(autoIncrement.plugin, 'Tasks');
// module.exports = mongoose.model('Tasks', TaskSchema);
