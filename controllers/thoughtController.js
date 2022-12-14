const { Thought } = require('../models');
module.exports = {
	// Get all thoughts
	getThoughts(req, res) {
		Thought.find()
			.then((thoughts) => res.json(thoughts))
			.catch((err) => res.status(500).json(err));
	},
	// Get a thought
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select('-__v')
			.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No thought with that ID' })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Create a thought
	createThought(req, res) {
		Thought.create(req.body)
			.then((thought) => res.json(thought))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// Delete a thought
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })

			.then(() => res.json({ message: 'Thought Deleted' }))
			.catch((err) => res.status(500).json(err));
	},
	createReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true }
		)
			.then((thought) => {
				if (thought) {
					return res.json(thought);
				}
				return res.status(404).json({ message: 'No thought with that ID' });
			})
			.catch((err) => res.status(500).send(err));
	},
	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { _id: req.body.reactionId } } },
			{ runValidators: true, new: true }
		)
			.then((thought) => {
				if (thought) {
					return res.json(thought);
				}
				return res.status(404).json({ message: 'No thought with that ID' });
			})
			.catch((err) => res.status(500).send(err));
	},
};
