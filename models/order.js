const mongoose = require('mongoose');

var Order = mongoose.model('Order', {
    table: String,
    orderlist: String,
    remarks: String,
    amount: Number,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = {
    Order
};