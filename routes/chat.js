var express = require('express');
var router = express.Router();

//Al rebre petició del client a localhost-.3000/chat carga la view ==> chat.jade
router.get('/', function (req, res) {
    res.render('chat');
});

module.exports = router;