var express = require('express');
var router = express.Router();

var Counterparty = require('../models/counterparty')

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/lalalala', function(req, res) {

    console.log('tu jestem');
    var cpty = new Counterparty({ name : 'Zooleszcz' });
    console.log('tu bylem');
    cpty.save(function (err) {
        if (err) {
            console.log(err);
            res.json({ error : err });
        } else {
            console.log('meow');
            res.json({ cpty : cpty });
        }
    });
});

module.exports = router;
