var express = require('express');
var cheerio = require('cheerio');
var router = express.Router();
var db = require('../models');
var axios = require('axios');

// Routes
router.get('/', function(req, res) {
	db.Article
		.find({ saved: false })
		.then(function(data) {
			var hbsObject = {
				articles: data
			};
			console.log(hbsObject);
			res.render('index', hbsObject);
		})
		.catch(function(err) {
			// If an error occurred, log it
			console.log(err);
		});
});

// Scrape data from one site and place it into the mongodb db
router.get('/scrape', function(req, res) {
	console.log('This is the scrape route');
	axios.get('https://www.pennlive.com/').then(function(response) {
		console.log('scraping pennlive');
		var $ = cheerio.load(response.data);
		console.log('this is the scrape route');
		// With cheerio, find each p-tag with the "title" class
		// (i: iterator. element: the current element)
		$(".article").each(function(i, element) {
			// Save the text of the element in a "title" variable
			var title = $(element).children().eq(1).find('h3').find('a').text();
			var link = $(element).children().eq(1).find('h3').find('a').attr('href');
			var img = $(element).children().eq(0).find('a').find('img').attr('src');

			var result = {
				title: title,
				link: link,
				img: img
			};
			console.log(result);
			// If this found element had both a title and a link
			// Insert the data in the Articles db
			//try .create if insert is not working
			db.Article
				.create(result)
				.then(function(inserted) {
					// Log the error if one is encountered during the query
					console.log(inserted);
				})
				.catch(function(err) {
					console.log(err);
				});
		});
		// Send a "Scrape Complete" message to the browser
		res.send('Scrape Complete');
	});
});
//clear button to delete from DB & page
router.delete('/clear', function (req, res) {
	db.Article.remove({} , function(data){
		console.log("clear")
		res.send("database clear");
	})
	});

	//routes for the saved articles
router.put("/saved/:id", function(req, res){
	db.Article.update({_id: req.params.id}, 
		{ $set: { saved: true } })
		.then(function (result){
		res.send("saved articles")
	})
});

//route to remove article from saved articles page
//once article is removed it will display on home page
router.put("/unsaved/:id", function(req, res){
	db.Article.updateOne({_id: req.params.id}, 
		{ $set: { saved: false } })
		.then(function (result){
		res.send("saved articles")
	})
});

// A DELETE route to REMOVE saved items from database
// apirouter.delete("/clear_saved", function (req, res){
// 	db.Item.remove({ saved: true }, function (result) {
// 	  res.send("Database cleared.")
// 	})
//   });
  
  // A DELETE route to REMOVE specific saved item from database
//   apirouter.delete("/delete_item/:id", function (req, res){
// 	db.Item.remove({ _id: req.params.id}, function (result) {
// 	  res.send("Item deleted.")
// 	})
//   });



//route that allows user to save articles and add it to their saved list page
router.get("/saved", function (req, res) {
    db.Article.find({ saved: true })
        .then(function (data) {
            // If we were able to successfully find, send them back to user
            var hbsObject = {
                articles: data
            };
            console.log("here is the object being sent to handlebars")
            console.log(hbsObject);
            res.render("saved", hbsObject);
        })
        .catch(function (err) {
            // If an error occurred, send it to the user
            res.json(err);
        });
    });

//app is what initializes express
module.exports = router;
