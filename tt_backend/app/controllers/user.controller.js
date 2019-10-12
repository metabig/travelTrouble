const User = require('../models/user.model.js');

exports.create = (req, res) => {
	if (!req.body.user) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    const user = new User({
    	user: req.body.user,
        groups: []
    })

    // Save the note in the database
    user.save().then(data => {
    	res.send(data);
    }).catch(err => {
    	res.status(500).send({
    		message: err.message
    	});
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