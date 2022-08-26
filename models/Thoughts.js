const { Schema, Types } = require('mongoose');
const User = require('./User');

const thoughtsSchema = new Schema(
	{
		thoughtText: {
			type: String,
			min_length: 1,
			max_length: 280,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		userName: User.userName,
		reactions: [Reaction],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);
thoughtsSchema.virtual('reactions').get(function () {
	return this.Reaction.length;
});
const Thoughts = model('thoughts', thoughtsSchema);
module.exports = Thoughts;
