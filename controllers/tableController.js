const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {
    Table
} = require('../models/table');

// => localhost:3000/tables/
router.get('/', (req, res) => {
    Table.find((err, data) => {
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
                error: 'Error in Retriving Table :' + JSON.stringify(err, undefined, 2)
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

        Table.findById(req.params.id, (err, data) => {
            if (!err) {
                res.json({
                    return: true,
                    data
                });
            } else {
                res.status(400).send({
                    return: false,
                    error: 'Error in Retriving Table :' + JSON.stringify(err, undefined, 2)
                });
            }
        });
    }
});

router.post('/', (req, res) => {
    var tbl = new Table({
        code: req.body.code,
        desc: req.body.desc,
        remarks: req.body.remarks,
        photo: req.body.photo,
    });
    tbl.save((err, data) => {
        if (!err) {
            res.json({
                return: true,
                data
            });
        } else {
            res.status(400).send({
                return: false,
                error: 'Error in Table Save :' + JSON.stringify(err, undefined, 2)
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

        var tbl = {
            code: req.body.code,
            desc: req.body.desc,
            remarks: req.body.remarks,
            photo: req.body.photo,
        };
        Table.findByIdAndUpdate(req.params.id, {
            $set: tbl
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
                    error: 'Error in Table Update :' + JSON.stringify(err, undefined, 2)
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

        Table.findByIdAndRemove(req.params.id, (err, data) => {
            if (!err) {
                res.json({
                    return: true,
                    data
                });
            } else {
                res.status(400).send({
                    return: false,
                    error: 'Error in Table Delete :' + JSON.stringify(err, undefined, 2)
                });
            }
        });
    }
});

module.exports = router;