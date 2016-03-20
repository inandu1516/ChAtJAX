var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var Nick = req.query.Nickname;
    console.log('Nick = ' + Nick);
    res.render('chat', {title: 'Users', message: 'Hello there', nick: Nick});
});

module.exports = router;
