const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
	group_name: String,
	users: [String],
	proposals: [{
		id: String,
		creator: String,
		flight: String,
		price: String,
		score: Number,
		voters: [String]
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model('Group', GroupSchema);