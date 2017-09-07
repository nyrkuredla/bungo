const express = require("express");
const mustacheExpress = require("mustache-express");
const {getAllBeers, getBeersByBrewery, getBeersByType, getBeersByRating} = require("./dal");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Beer = require('./models/Beer');
const app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.redirect("/beers/home");
});

app.post("/beers/home", function(req, res) {
  if (req.body.search) {
    res.render("searchoptions");
  } else {
    res.render("postnew");
  }
});

app.post("/beers/searchOptions", function(req, res) {
  let searchType = req.body.search;
  if (searchType === "brewery") {
    res.render("searchByBrewery");
  } else if (searchType === "type") {
    res.render("searchByType");
  } else {
    res.render("searchByRating");
  }
});

app.post("beers/searchByBrewery", function(req, res) {
  getBeersByBrewery(req.body.brewery).then(function(beers) {
    res.render("list", {beers});
  });
});

app.post("beers/searchByType", function(req, res) {
  getBeersByType(req.body.type).then(function(beers) {
    res.render("list", {beers});
  });
});

app.post("beers/searchByRating", function(req, res) {
  getBeersByRating(req.body.rating).then(function(beers) {
    res.render("list", {beers});
  });
});

app.listen(3000, function () {
  console.log("Successfully started user directory application on: 3000");
});
