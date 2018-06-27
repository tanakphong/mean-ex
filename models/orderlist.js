const mongoose = require('mongoose');

var OrderList = mongoose.model('OrderList', {
    code: {
        type: String,
        unique: true
    },
    desc: {
        type: String
    },
    remarks: {
        type: String
    },
    photo: {
        type: String
    }
});

module.exports = {
    OrderList
};