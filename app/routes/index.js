'use strict';
var url = require("url");
var strftime = require("strftime");

module.exports = function (app, db) {
   app.get("/:data([\\w,%]+)", function (req, res) {
    var query = unescape(req.url).split("");
    query.shift();
    query = query.join("");
    if(!query.match(/\D/)) {
      query *= 1000;
    }
    var date = new Date(query);
    if(date == "Invalid Date"){
      res.send({
        unix: "null",
        natural: "null"
      })
    } else {
      res.send({
        unix: date.getTime()/1000,
        natural: strftime("%B %d, %Y", date)
      })
    }
  });
};
