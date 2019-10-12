const Group = require('../models/group.model.js');
const User = require('../models/user.model.js');

exports.getAllGroups = (req, res) => {
	Group.find().then(groups => {
        res.send(groups);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.newGroup = (req, res) => {
	if (!req.body.group_name || !req.body.user) {
        return res.status(400).send({
            message: "Incomplete information provided"
        });
    }

    const group = new Group({
    	group_name: req.body.group_name,
    	users: [req.body.user],
    	proposals: []
    });

    const query = User.findOne({ user: req.body.user });
    query.exec(function (err, user) {
    	if (err) {
    		res.status(500).send({
    			message: "This group does not exist"
    		});
    	} else {
    		user.groups.push(req.body.group_name);

    		user.save().then(data => { }).catch(err => {
		    	return res.status(500).send({
		    		message: "This user does not exist"
		    	});
		    });

		    group.save().then(data => {
		    	res.send(data);
		    }).catch(err => {
		    	return res.status(500).send({
		    		message: err.message
		    	});
		    });
    	}
    });
};

exports.addUser = (req, res) => {
	if (!req.body.user || !req.body.group) {
        return res.status(400).send({
            message: "You must provide a user and a group"
        });
    }

    const query = Group.findOne({ group_name: req.body.group });
    
    query.exec(function (err, group) {
    	if (err) {
    		res.status(500).send({
    			message: "This group does not exist"
    		});
    	} else {
		    group.users.push(req.body.user); // No ha d'afegir usuaris que no existeixen

		    group.save().then(data => {
		    	res.send(data);
		    }).catch(err => {
		    	res.status(500).send({
		    		message: err.message
		    	});
		    });
    	}
    });
};

exports.getUsers = (req, res) => {
	if (!req.body.group) {
        return res.status(400).send({
            message: "You must provide a group"
        });
    }

	const query = Group.findOne({ group_name: req.body.group });
	query.exec(function (err, group) {
		if (err) {
    		res.status(500).send({
    			message: "This group does not exist"
    		});
    	} else {
    		res.send(group.users);
    	}
	});
};

exports.addProposal = (req, res) => {
	if (!req.body.group || !req.body.creator || !req.body.flight || !req.body.price) {
        return res.status(400).send({
            message: "Incomplete information provided"
        });
    }

    const query = Group.findOne({ group_name: req.body.group });

    query.exec(function (err, group) {
    	if (err) {
    		res.status(500).send({
    			message: "This group does not exist"
    		});
    	} else {
		    group.proposals.push({
		    	id: group.proposals.length,
		    	creator: req.body.creator,
		    	flight: req.body.flight,
		    	price: req.body.price,
		    	score: 0,
		    	voters: []
		    });

		    group.save().then(data => {
		    	res.send(data);
		    }).catch(err => {
		    	res.status(500).send({
		    		message: err.message
		    	});
		    });
    	}
    });
};

exports.getProposals = (req, res) => {
	if (!req.body.group) {
        return res.status(400).send({
            message: "You must provide a group"
        });
    }

	const query = Group.findOne({ group_name: req.body.group });
	query.exec(function (err, group) {
		if (err) {
    		res.status(500).send({
    			message: "This group does not exist"
    		});
    	} else {
    		res.send(group.proposals);
    	}
	});
};

exports.voteProposal = (req, res) => {
	if (!req.body.user || !req.body.group || !req.body.id) {
        return res.status(400).send({
            message: "You must provide a user , a group and a proposal id"
        });
    }

    const query = Group.findOne({ group_name: req.body.group });
    
    query.exec(function (err, group) {
    	if (err) {
    		res.status(500).send({
    			message: "This group does not exist"
    		});
    	} else {
		    group.proposals[req.body.id].voters.push(req.body.user);
		    group.proposals[req.body.id].score++;

		    group.save().then(data => {
		    	res.send(data);
		    }).catch(err => {
		    	res.status(500).send({
		    		message: err.message
		    	});
		    });
    	}
    });
};