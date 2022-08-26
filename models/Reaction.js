const { Schema } = require('mongoose');
const User = require('./User');

reactionSchema = new Schema({
	reactText: {
		type: String,
		required: true,
		maxLength: 280,
	},
	userName: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
// const Reaction = model('reaction', reactionSchema);
module.exports = reactionSchema;
