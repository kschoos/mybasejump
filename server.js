'use strict';

var express = require('express');
var mongo = require('mongodb');
var routes = require('./app/routes/index.js');

var app = express();

mongo.connect( "mongodb://heroku_6bfrssl5:grs7rom5p1fk1otom1p8pnrli2@ds021979.mlab.com:21979/heroku_6bfrssl5", function (err, db) {

   if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB on port 27017.');
   }

   app.use('/public', express.static(process.cwd() + '/public'));
   app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

   routes(app, db);

   app.listen(process.env.PORT, function () {
      console.log('Node.js listening on port '+ process.env.PORT +'...');
   });

});
