const express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {
    Employee
} = require('../models/employee');

// => localhost:3000/employees/
router.get('/', (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            Employee.find((err, data) => {
                if (!err) {
                    // res.send(docs);
                    res.json({
                        message: 'Post created...',
                        authData,
                        data
                    });
                } else {
                    res.sendStatus(404);
                    console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2));
                }
            });
        }
    });
});

router.get('/:id', (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (!ObjectId.isValid(req.params.id))
                res.status(404).send({
                    error: `Not found id : ${req.params.id}`
                });

            Employee.findById(req.params.id, (err, data) => {
                if (!err) {
                    res.send(data);
                } else {
                    res.status(400).send({
                        error: JSON.stringify(err, undefined, 2)
                    });
                    console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2));
                }
            });

        }
    });

});

router.post('/', (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            var emp = new Employee({
                name: req.body.name,
                position: req.body.position,
                office: req.body.office,
                salary: req.body.salary,
            });
            emp.save((err, data) => {
                if (!err) {
                    res.send(data);
                } else {
                    res.status(400).send({
                        error: JSON.stringify(err, undefined, 2)
                    });
                    console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2));
                }
            });


        }
    });
});

router.put('/:id', (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (!ObjectId.isValid(req.params.id))
                res.status(404).send({
                    error: `Not found id : ${req.params.id}`
                });

            var emp = {
                name: req.body.name,
                position: req.body.position,
                office: req.body.office,
                salary: req.body.salary,
            };
            Employee.findByIdAndUpdate(req.params.id, {
                $set: emp
            }, {
                new: true
            }, (err, data) => {
                if (!err) {
                    res.send(data);
                } else {
                    res.status(400).send({
                        error: JSON.stringify(err, undefined, 2)
                    });
                    console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2));
                }
            });

        }
    });

});

router.delete('/:id', (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (!ObjectId.isValid(req.params.id))
                res.status(404).send({
                    error: `Not found id : ${req.params.id}`
                });

            Employee.findByIdAndRemove(req.params.id, (err, data) => {
                if (!err) {
                    res.send(data);
                } else {
                    res.status(400).send({
                        error: JSON.stringify(err, undefined, 2)
                    });
                    console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
                }
            });

        }
    });

});

module.exports = router;