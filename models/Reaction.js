const { Schema, Types } = require('mongoose');
const User = require('./User');

reactionSchema = new Schema({
	reactText: {
		type: String,
		required: true,
		maxLength: 280,
	},
	userName: User.userName,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
const Reaction = model('reaction', reactionSchema);
module.exports = Reaction;
