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

            /* Save users */
    		user.save().then(data => { }).catch(err => {
		    	return res.status(500).send({
		    		message: "This user does not exist"
		    	});
		    });

            /* Save group */
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
            req.body.user.groups.push(req.body.group_name);
           
            /* Save group */
		    group.save().then(data => {
		    	res.send(data);
		    }).catch(err => {
		    	res.status(500).send({
		    		message: err.message
		    	});
		    });

            /* Save users */
            req.body.user.save().then(data => { }).catch(err => {
                return res.status(500).send({
                    message: "This user does not exist"
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
    	if (err || !req.body.group.users.includes(req.body.creator)) {
    		res.status(500).send({
    			message: "This group either does not exist or you are not a member"
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

            /* Save group */
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

            /* Checks if the group has already been upvoted by the user */
            var found = false;
            for (var i = 0; i < group.proposals[req.body.id].voters.length && found == false; i++) {
                if (group.proposals[req.body.id].voters[i] == req.body.user) {
                    found = true;
                }
            }

            /* Adds (or removes) a vote */
            if (found == false) {
                group.proposals[req.body.id].voters.push(req.body.user);
                group.proposals[req.body.id].score++;
            } else {
                group.proposals[req.body.id].voters.splice(i,1);
                group.proposals[req.body.id].score--;
            }
            
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
