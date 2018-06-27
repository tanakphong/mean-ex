const express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {
    Role
} = require('../models/role');

// => localhost:3000/role/
router.get('/', (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).send({
                return: false,
                error: 'Forbiden'
            });
        } else {

            Role.find((err, data) => {
                if (!err) {
                    // res.send(docs);
                    res.json({
                        return: true,
                        authData,
                        data
                    });
                } else {
                    res.sendStatus(404);
                    console.log('Error in Retriving Role :' + JSON.stringify(err, undefined, 2));
                }
            });
        }
    });
});

router.get('/:id', (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).send({
                return: false,
                error: 'Forbiden'
            });
        } else {
            if (!ObjectId.isValid(req.params.id))
                res.status(404).send({
                    error: `Not found id : ${req.params.id}`
                });

            Role.findById(req.params.id, (err, data) => {
                if (!err) {
                    res.send(data);
                } else {
                    res.status(400).send({
                        error: JSON.stringify(err, undefined, 2)
                    });
                    console.log('Error in Retriving Role :' + JSON.stringify(err, undefined, 2));
                }
            });

        }
    });

});

router.post('/', (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).send({
                return: false,
                error: 'Forbiden'
            });
        } else {
            var role = new Role({
                code: req.body.code,
                desc: req.body.desc,
            });
            role.save((err, data) => {
                if (!err) {
                    res.send(data);
                } else {
                    res.status(400).send({
                        error: JSON.stringify(err, undefined, 2)
                    });
                }
            });


        }
    });
});

router.put('/:id', (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).send({
                return: false,
                error: 'Forbiden'
            });
        } else {
            if (!ObjectId.isValid(req.params.id))
                res.status(404).send({
                    error: `Not found id : ${req.params.id}`
                });

            var role = {
                code: req.body.code,
                desc: req.body.desc,
            };
            Role.findByIdAndUpdate(req.params.id, {
                $set: role
            }, {
                new: true
            }, (err, data) => {
                if (!err) {
                    res.send(data);
                } else {
                    res.status(400).send({
                        error: JSON.stringify(err, undefined, 2)
                    });
                    console.log('Error in Role Update :' + JSON.stringify(err, undefined, 2));
                }
            });

        }
    });

});

router.delete('/:id', (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).send({
                return: false,
                error: 'Forbiden'
            });
        } else {
            if (!ObjectId.isValid(req.params.id))
                res.status(404).send({
                    error: `Not found id : ${req.params.id}`
                });

            Role.findByIdAndRemove(req.params.id, (err, data) => {
                if (!err) {
                    res.send(data);
                } else {
                    res.status(400).send({
                        error: JSON.stringify(err, undefined, 2)
                    });
                    console.log('Error in Role Delete :' + JSON.stringify(err, undefined, 2));
                }
            });

        }
    });

});

module.exports = router;