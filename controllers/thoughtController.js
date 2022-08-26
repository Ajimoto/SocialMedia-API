const { Thought } = require('../models');
module.exports = {
	// Get all thoughts
	getThoughts(req, res) {
		Course.find()
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
};
