module.exports = (app) => {
	const user = require('../controllers/user.controller.js');

	// Create a new user
	app.post('/user/add', user.create);

	// Retrieve all groups from user
	app.get('/user/groups', user.getGroups);

	//Retrieve all users
	app.get('/user/all', user.getUsers);
}