var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'RFP v1.0' });
});

router.use('/cpty', require('./cpty'));
router.use('/store', require('./store'));
router.use('/position', require('./position'));
router.use('/sub-position', require('./sub-position'));
router.use('/invoice', require('./invoice'));
router.use('/product', require('./product'));

module.exports = router;
