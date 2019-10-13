const User = require('../models/user.model.js');

exports.create = (req, res) => {
	if (!req.body.user) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    /* If user already exists, it does not create another one */
    const promise = User.exists({ user: req.body.user }); 
    if (promise == false) {
        const user = new User({
        	user: req.body.user,
            groups: []
        })
    }
    // Save the note in the database
    user.save().then(data => {
    	res.send(data);
    }).catch(err => {
    	res.status(500).send({
    		message: err.message
    	});
    });

}

exports.getGroups = (req, res) => {
    if (!req.body.user) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    const query = User.findOne({ user: req.body.user });
    query.exec(function (err, user) {
        if (err) {
            res.status(500).send({
                message: "This group does not exist"
            });
        } else {
            res.send(user.groups);
        }
    });
}

exports.getUsers = (req, res) => {
    User.find().then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};