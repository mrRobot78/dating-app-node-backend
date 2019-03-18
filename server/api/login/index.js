const express = require('express');
const controller = require('./login.controller');

const router = express.Router();

router.post('/', controller.index);
router.get('/', controller.get);

module.exports = router;
