var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'RFP v1.0' });
});

['cpty', 'position', 'store'].forEach(function(entry) {
    var GenericRouter = rootRequire('routes/generic');
    var routes = new GenericRouter(entry);

    router.route('/' + entry)
        .get(routes.list.bind(routes))
        .post(routes.create.bind(routes));

    router.route('/' + entry + '/id/:id')
        .get(routes.show.bind(routes))
        .put(routes.update.bind(routes))
        .delete(routes.remove.bind(routes));
});

router.use('/', require('./invoice'));
router.use('/', require('./product'));

module.exports = router;
