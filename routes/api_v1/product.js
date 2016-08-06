var express = require('express');
var router = express.Router();
var controller = require('../../controllers/product');

/*
 * GET
 */
router.get('/', function(req, res) {
    controller.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function(req, res) {
    controller.show(req, res);
});

router.get('/search/:query/:limit?', function(req, res) {
    controller.ean_name_search(req, res);
});

// router.get('/:id_f/add_child/:id_c', function(req, res) {
//     controller.add_child(req, res);
// });

/*
 * POST
 */
router.post('/', function(req, res) {
    controller.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function(req, res) {
    controller.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function(req, res) {
    controller.remove(req, res);
});

module.exports = router;
