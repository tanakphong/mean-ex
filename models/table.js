const mongoose = require('mongoose');

var Table = mongoose.model('Table', {
    code: {
        type: String
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
    Table
}