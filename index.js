const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const {
    mongoose
} = require('./db.js');

var employeeController = require('./controllers/employeeController.js');
var userController = require('./controllers/userController.js');
var roleController = require('./controllers/roleController.js');
var tableController = require('./controllers/tableController.js');
var orderListController = require('./controllers/orderListController.js');
var orderController = require('./controllers/orderController.js');

var app = express();
app.use(bodyParser.json());
app.use('/employee', verifyToken, employeeController);
app.use('/users', verifyToken, userController, function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).send({
                return: false,
                error: 'Forbiden'
            });
        } else {
            next();
        }
    });
});
app.use('/tables', verifyToken, tableController, function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).send({
                return: false,
                error: 'Forbiden'
            });
        } else {
            next();
        }
    });
});
app.use('/orderlists', verifyToken, orderListController, function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).send({
                return: false,
                error: 'Forbiden'
            });
        } else {
            next();
        }
    });
});
app.use('/orders', verifyToken, orderController, function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).send({
                return: false,
                error: 'Forbiden'
            });
        } else {
            next();
        }
    });
});
app.use('/role', verifyToken, roleController);

app.post('/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }

    jwt.sign({
        user
    }, 'secretkey', {
        expiresIn: '60000s'
    }, (err, token) => {
        res.json({
            token
        });
    });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

app.listen(3000, () => console.log('Server start this port : 3000'));