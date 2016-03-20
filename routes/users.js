var express = require('express');
var router = express.Router();

// GET method route
router.get('/', function (req, res) {
    console.log('Nickname = ' + req.query.Nickname);
    var responseText = 'Requested at: ' + Date.now();
    console.log('GET request to /users at: ' + responseText);
    res.render('users', { title: 'Users', message: 'Hello there', name: 'Inge' });
});

module.exports = router;
