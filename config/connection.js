const { connect, connection } = require('mongoose');

connect('mongodb://localhost/ajiBookDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = connection;
