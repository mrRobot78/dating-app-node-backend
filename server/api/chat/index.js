const express = require('express');
const controller = require('./chat.controller');
const isAuthenticated = require('../../auth/auth.service');

const router = express.Router();

router.get('/getData/byMsgSessionId/:user_mobile/:sender_mobile', controller.getDatabyMsgSessionId); // no authrization

router.post('/', controller.create); // no authrization

// router.patch('/', isAuthenticated.isAuthenticated, controller.update);
// router.post('/otp', controller.userOTP); // no authrization
// router.patch('/updatepassword', controller.updatePassword); // no authrization
// router.get('/', isAuthenticated.isAuthenticated, controller.get);
module.exports = router;
