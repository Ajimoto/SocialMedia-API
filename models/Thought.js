const { Schema, model } = require('mongoose');
const User = require('./User');
const Reaction = require('./Reaction');

const thoughtsSchema = new Schema(
	{
		thoughtText: {
			type: String,
			minLength: 1,
			maxLength: 280,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		userName: {
			type: String,
			required: true,
		},
		reactions: [Reaction],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);
thoughtsSchema.virtual('reactionList').get(function () {
	return this.reactions.length;
});
const Thought = model('thoughts', thoughtsSchema);
module.exports = Thought;
