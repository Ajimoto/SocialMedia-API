const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thought');

const userSchema = new Schema(
	{
		userName: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please fill a valid email address'],
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'thoughts',
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);
userSchema.virtual('friendsList').get(function () {
	return this.friends.length;
});
const User = model('user', userSchema);
module.exports = User;
