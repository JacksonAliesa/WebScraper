// Dependencies
// require("dotenv").config();
var exphbs = require("express-handlebars");
var express = require("express");
var mongoose = require("mongoose");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

// Set up a static folder (public) for our web app
app.use(express.static("public"));

//make connection to DB 
//mongoose NPM package
await mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });