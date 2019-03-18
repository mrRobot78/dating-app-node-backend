const express = require('express');
const controller = require('./userDiscoverySetup.controller');
const isAuthenticated = require('../../auth/auth.service');

const router = express.Router();

router.get('/:mobileNumber', controller.GetUserDiscoverySetupDataById); // no authrization
router.post('/', controller.Create); // no authrization
router.put('/:mobileNumber', controller.Update); // no authrization

module.exports = router;
