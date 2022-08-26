const { User } = require('../models');
module.exports = {
	// Get all Users
	getUsers(req, res) {
		User.find()
			.then((users) => res.json(users))
			.catch((err) => res.status(500).json(err));
	},
	// Get a user
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select('-__v')
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No user with that ID' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Create a user
	createUser(req, res) {
		User.create(req.body)
			.then((user) => res.json(user))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// Delete a user
	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.userId })

			.then(() => res.json({ message: 'user Deleted' }))
			.catch((err) => res.status(500).json(err));
	},
	// Add Friend
	addFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.body.userId },
			{ $addToSet: { friends: req.body.userId } },
			{
				new: true,
				runValidators: true,
			}
		)
			.then((user) => res.json(user))
			.catch((err) => res.status(500).send(err));
	},
	//Remove Friend
	deleteFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } },
			{
				runValidators: true,
				new: true,
			}
		)
			.then((user) => res.json(user))
			.catch((err) => res.status(500).send(err));
	},
};
