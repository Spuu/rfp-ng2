var express = require('express');
var router = express.Router();
var controller = require('../../controllers/cpty');

/*
 * GET
 */
router.get('/', controller.list);

/*
 * GET
 */
router.get('/:id', controller.show);

/*
 * POST
 */
router.post('/', controller.create);

/*
 * PUT
 */
router.put('/:id', controller.update);

/*
 * DELETE
 */
router.delete('/:id', controller.remove);

module.exports = router;