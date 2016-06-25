var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'RFP v1.0' });
});

['cpty', 'invoice', 'position', 'product', 'store'].forEach(function(entry) {
    var GenericRouter = rootRequire('routes/generic');
    var routes = new GenericRouter(entry);

    router.route('/' + entry)
        .get(routes.get)
        .post(routes.post);

    router.route('/' + entry + '/id/:id')
        .get(routes.get_id)
        .put(routes.put_id)
        .delete(routes.delete_id);
});

module.exports = router;
