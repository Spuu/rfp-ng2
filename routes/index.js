var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/api', require('./api'));

// leave rest for angular
router.all('/*', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

module.exports = router;
