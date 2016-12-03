var express = require('express');
var router = express.Router();
var controller = require('../../controllers/product');

/*
 * GET
 */
router.get('/', controller.list);

/*
 * GET
 */
router.get('/:id', controller.show);

router.get('/search/:query/:limit?', controller.ean_name_search);

router.get('/:id/show_children', controller.show_children);

router.get('/:id_f/add_child/:id_c', controller.add_child);

router.get('/:id_f/remove_child/:id_c', controller.remove_child);

/*
 * POST
 */
router.post('/', controller.create);

/*
    Creates product as barcode and joins it with father
 */
router.post('/:id_f/barcodes/add/', controller.create_barcode, controller.add_child);

router.post('/barcodes/add/', controller.find_id_father_from_ean, controller.create_barcode, controller.add_child);

/*
 * PUT
 */
router.put('/:id', controller.update);

/*
 * DELETE
 */
router.delete('/:id', controller.remove);

module.exports = router;
