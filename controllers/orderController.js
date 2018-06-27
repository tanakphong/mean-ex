const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {
    Order
} = require('../models/order');

// => localhost:3000/tables/
router.get('/', (req, res) => {
    Order.find((err, data) => {
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
                error: 'Error in Retriving Order :' + JSON.stringify(err, undefined, 2)
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

        Order.findById(req.params.id, (err, data) => {
            if (!err) {
                if (data === null) {
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
                    error: 'Error in Retriving Order :' + JSON.stringify(err, undefined, 2)
                });
            }
        });
    }
});

router.post('/', (req, res) => {
    var ord = new Order({
        table: req.body.table,
        orderlist: req.body.orderlist,
        remarks: req.body.remarks,
        amount: req.body.amount,
        status: req.body.status,
    });
    ord.save((err, data) => {
        if (!err) {
            if (data === null) {
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
                error: 'Error in Order Save :' + JSON.stringify(err, undefined, 2)
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

        var ord = {
            table: req.body.table,
            orderlist: req.body.orderlist,
            remarks: req.body.remarks,
            amount: req.body.amount,
            status: req.body.status,
        };
        Order.findByIdAndUpdate(req.params.id, {
            $set: ord
        }, {
            new: true
        }, (err, data) => {
            if (!err) {
                if (data === null) {
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
                    error: 'Error in Order Update :' + JSON.stringify(err, undefined, 2)
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

        Order.findByIdAndRemove(req.params.id, (err, data) => {
            if (!err) {
                if (data === null) {
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
                    error: 'Error in Order Delete :' + JSON.stringify(err, undefined, 2)
                });
            }
        });
    }
});

module.exports = router;