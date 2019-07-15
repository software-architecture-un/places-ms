'use strict';

// var mongoose = require('mongoose'),
//   Task = mongoose.model('Tasks');

var mysql = require('mysql');

var con = mysql.createConnection({
  host     : 'places-db',
  database : 'places-db',
  user     : 'sa',
  password : '123',
});

exports.list_all_places = function (req, res) {
  con.query("SELECT * FROM places", function (err, places, fields) {
    if (err) {
      res.send(createAnswer(null, err.message, 500));
    } else {
      res.json(createAnswer(places, 'Todos los lugares', 200));
    }
  });
};

exports.read_places_by_user_id = function (req, res) {
  con.query("SELECT * FROM places WHERE user_id = " + req.params.user_id, function (err, places, fields) {
    if (err) {
      res.send(createAnswer(null, err.message, 500));
    } else {
      if (places.length === 0) {
        res.send(createAnswer(null, 'Lugares no encontrados', 404));
      } else {
        res.json(createAnswer(places, 'OK', 200));
      }
    }
  });
};

exports.read_number_places_by_user_id = function (req, res) {
  con.query("SELECT * FROM places WHERE user_id = " + req.params.user_id, function (err, places, fields) {
    if (err) {
      res.send(createAnswer(null, err.message, 500));
    } else {
      res.json(createAnswer(places.length, 'OK', 200));
    }
  });
};

exports.create_a_place = function (req, res) {
  var newPlace = {
    name: req.body.name,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    user_id: req.body.user_id,
  };

  con.query("INSERT INTO places (name, description, latitude, longitude, user_id) VALUES" + 
  "('" + newPlace.name + "', '" + newPlace.description + "', " 
  + newPlace.latitude + ", " + newPlace.longitude
  + ", " + newPlace.user_id + ")", function (err, place, fields) {
    if (err) {
      res.send(createAnswer(null, err.message, 500));
    } else {
      res.json(createAnswer(newPlace, 'OK', 201));
    }
  });
};

exports.read_a_place = function (req, res) {
  con.query("SELECT * FROM places WHERE id = " + req.params.id + " LIMIT 1", function (err, place, fields) {
    if (err) {
      res.send(createAnswer(null, err.message, 500));
    } else {
      if (place.length === 0) {
        res.send(createAnswer(null, 'Lugar no encontrado', 404));
      } else {
        res.json(createAnswer(place[0], 'OK', 200));
      }
    }
  });
};

exports.update_a_place = function (req, res) {
  con.query("SELECT * FROM places WHERE id = " + req.params.id, function (err2, place2, fields2) {
    if (err2) {
      res.send(createAnswer(null, err.message, 500));
    } else {
      if (place2.length === 0) {
        res.send(createAnswer(null, 'Lugar no encontrado', 404));
      } else {
        var thisName = (typeof req.body.name === 'undefined') ? place2[0].name : req.body.name;
        var thisDescription = (typeof req.body.description === 'undefined') ? place2[0].description : req.body.description;
        var thisLatitude = (typeof req.body.latitude === 'undefined') ? place2[0].latitude : req.body.latitude;
        var thisLongitude = (typeof req.body.longitude === 'undefined') ? place2[0].longitude : req.body.longitude;
        var thisUserId = (typeof req.body.user_id === 'undefined') ? place2[0].user_id : req.body.user_id;

        var updatedPlace = {
          name: thisName,
          description: thisDescription,
          latitude: thisLatitude,
          longitude: thisLongitude,
          user_id: thisUserId,
        };

        con.query("UPDATE places SET name = '" + thisName + "', "
        + "description = '" + thisDescription + "', "
        + "latitude = " + thisLatitude + ", "
        + "longitude = " + thisLongitude + ", "
        + "user_id = " + thisUserId 
        + " WHERE id = " + req.params.id + " LIMIT 1"
        , function (err, place, fields) {
          if (err) {
            res.send(createAnswer(null, err.message, 500));
          } else {
            res.json(createAnswer(updatedPlace, 'El lugar fue actualizado!', 200));
          }
        });
      }
    }
  });
};

exports.delete_a_place = function (req, res) {
  con.query("SELECT * FROM places WHERE id = " + req.params.id, function (err2, place2, fields2) {
    if (err2) {
      res2.send(createAnswer(null, err2.message, 500));
    } else {
      con.query("DELETE FROM places WHERE id = " + req.params.id + " LIMIT 1", function (err, place, fields) {
        if (err) {
          res.send(createAnswer(null, err.message, 500));
        } else {
          if (place2.length === 0) {
            res.json(createAnswer(null, 'Lugar no encontrado', 404));
          } else {
            res.json(createAnswer(null, 'Lugar borrado con exito', 200));
          } 
        }
      });
    }
  });
};

/*  */

function createAnswer(content, msg, status) {
  let result = {
    content: "",
    message: "",
    status: ""
  };
 
  result.content = (content === null) ? {} : content;
  result.message = msg;
  result.status = status;

  return result
}
