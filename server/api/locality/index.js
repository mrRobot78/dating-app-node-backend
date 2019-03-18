const express = require('express');
const controller = require('./locality.controller');
const isAuthenticated = require('../../auth/auth.service');

const router = express.Router();

router.get('/', controller.index);
// router.get('/:id', auth.hasRole('supadmin'), controller.show);
router.post('/', controller.create);
// router.put('/:id', auth.hasRole('supadmin'), controller.update);
// router.delete('/:id', auth.hasRole('supadmin'), controller.destroy);
module.exports = router;