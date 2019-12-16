// Dependencies
// require("dotenv").config();
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Initialize Express
var app = express();

var routes = require("./routes/route");
app.use(routes);

//require
var PORT = process.env.PORT || 3000;

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Make public a static folder
app.use(express.static("public"));

//make connection to DB 
//mongoose NPM package
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraper";
mongoose.connect(MONGODB_URI
  , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });