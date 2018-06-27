const mongoose = require('mongoose');

var User = mongoose.model('User', {
    displayname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
});

module.exports = {
    User
};