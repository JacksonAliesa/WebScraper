var express = require('express');
var cheerio = require('cheerio');
var router = express.Router();
var db = require('../models');
var axios = require('axios');


//route to get all saved articles from DB
router.get("/saved", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        console.log(dbArticle);
        res.render("saved", {
          saved: dbArticle
        });
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  module.exports = router;