var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var articleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true,
		unqiue: true
	},
	img:{
     type: String
	},
	Comment: {
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	},
	saved: {
		type: Boolean,
		default: false
	}
});

var Article = (module.exports = mongoose.model('Article', articleSchema));

module.exports = Article;
