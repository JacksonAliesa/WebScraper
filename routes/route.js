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
			// var articleDate = $(element).children().eq(1).find('section').find('a').attr('href');

			var result = {
				title: title,
				link: link
				// articleDate: articleDate
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

router.delete('/clear', function (req, res) {
	db.Article.remove({} , function(data){
		console.log("clear")
		res.send("database clear");
	})
	});
//grab article from DB
// Route for getting all Articles from the db
// app.get("/articles", function(req, res) {
//   // Grab every document in the Articles collection
//   db.Article.find({})
//     .then(function(dbArticle) {
//       // If we were able to successfully find Articles, send them back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });

//app is what initializes express
module.exports = router;
