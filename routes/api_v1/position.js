var express = require('express');
var router = express.Router();
var controller = require('../../controllers/position');

/*
 * GET
 */
router.get('/', controller.list, controller.populate);
router.get('/:id', controller.show, controller.populate);
router.get('/search/:product_id/:store_id?', controller.search, controller.populate);
router.get('/invoice/:invoice_id', controller.invoice, controller.populate);

/*
 * POST
 */
router.post('/', controller.create, controller.populate);

/*
 * PUT
 */
router.put('/:id', controller.update, controller.populate);

/*
 * DELETE
 */
router.delete('/:id', controller.remove, controller.populate);

module.exports = router;