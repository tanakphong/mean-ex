const mongoose = require('mongoose');

var Role = mongoose.model('Role', {
    code: {
        type: String
    },
    desc: {
        type: String
    }
});

module.exports = {
    Role
};