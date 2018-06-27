const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {
    OrderList
} = require('../models/orderlist');

// => localhost:3000/tables/
router.get('/', (req, res) => {
    OrderList.find((err, data) => {
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
                error: 'Error in Retriving OrderList :' + JSON.stringify(err, undefined, 2)
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

        OrderList.findById(req.params.id, (err, data) => {
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
                    error: 'Error in Retriving OrderList :' + JSON.stringify(err, undefined, 2)
                });
            }
        });
    }
});

router.post('/', (req, res) => {
    var orl = new OrderList({
        code: req.body.code,
        desc: req.body.desc,
        remarks: req.body.remarks,
        photo: req.body.photo,
    });
    orl.save((err, data) => {
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
                error: 'Error in OrderList Save :' + JSON.stringify(err, undefined, 2)
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

        var orl = {
            code: req.body.code,
            desc: req.body.desc,
            remarks: req.body.remarks,
            photo: req.body.photo,
        };
        OrderList.findByIdAndUpdate(req.params.id, {
            $set: orl
        }, {
            new: true
        }, (err, data) => {
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
                    error: 'Error in OrderList Update :' + JSON.stringify(err, undefined, 2)
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

        OrderList.findByIdAndRemove(req.params.id, (err, data) => {
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
                    error: 'Error in OrderList Delete :' + JSON.stringify(err, undefined, 2)
                });
            }
        });
    }
});

module.exports = router;