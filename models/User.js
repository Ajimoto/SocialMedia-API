const { Schema, Types } = require('mongoose');
const thoughtsSchema = require('./Thoughts');

const userSchema = new Schema({
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
});
const User = model('user', userSchema);
module.exports = User;
