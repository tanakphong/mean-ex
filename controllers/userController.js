const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {
    User
} = require('../models/user');

// => localhost:3000/user/
router.get('/', (req, res) => {
    User.find((err, data) => {
        if (!err) {
            if (Object.keys(data).length) {
                res.json({
                    return: true,
                    data
                });
            } else {
                res.status(404).send({
                    return: false,
                    error: `Not found`
                });
            }
        } else {
            res.status(400).send({
                return: false,
                error: 'Error in Retriving User :' + JSON.stringify(err, undefined, 2)
            });
        }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send({
            return: false,
            error: 'Not found id : ' + req.params.id
        });
    } else {

        User.findById(req.params.id, (err, data) => {
            if (!err) {
                res.json({
                    return: true,
                    data
                });
            } else {
                res.status(400).send({
                    return: false,
                    error: 'Error in Retriving User :' + JSON.stringify(err, undefined, 2)
                });
            }
        });
    }
});

router.post('/', (req, res) => {
    var user = new User({
        displayname: req.body.displayname,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    });
    user.save((err, data) => {
        if (!err) {
            res.json({
                return: true,
                data
            });
        } else {
            res.status(400).send({
                return: false,
                error: 'Error in User Save :' + JSON.stringify(err, undefined, 2)
            });
        }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send({
            return: false,
            error: 'Not found id : ' + req.params.id
        });
    } else {

        var user = {
            displayname: req.body.displayname,
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        };
        User.findByIdAndUpdate(req.params.id, {
            $set: user
        }, {
            new: true
        }, (err, data) => {
            if (!err) {
                res.json({
                    return: true,
                    data
                });
            } else {
                res.status(400).send({
                    return: false,
                    error: 'Error in User Update :' + JSON.stringify(err, undefined, 2)
                });
            }
        });
    }
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404).send({
            return: false,
            error: 'Not found id : ' + req.params.id
        });
    } else {

        User.findByIdAndRemove(req.params.id, (err, data) => {
            if (!err) {
                res.json({
                    return: true,
                    data
                });
            } else {
                res.status(400).send({
                    return: false,
                    error: 'Error in User Delete :' + JSON.stringify(err, undefined, 2)
                });
            }
        });
    }
});

module.exports = router;