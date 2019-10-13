module.exports = (app) => {
	const group = require('../controllers/group.controller.js');

	// Get list of all groups
	app.get('/group/all', group.getAllGroups);

	// Create new group
	app.post('/group/new', group.newGroup);

	// Add user to group
	app.post('/group/user', group.addUser);

	// Get list of users in group
	app.post('/group/user/all', group.getUsers);

	// Add new proposal
	app.post('/group/proposal/add', group.addProposal);

	// Get list of proposals
	app.get('/group/proposal/get', group.getProposals);

	// Vote on a proposal
	app.post('/group/proposal/vote', group.voteProposal);
}