const express = require('express');
const controller = require('./user.controller');
const isAuthenticated = require('../../auth/auth.service');

const router = express.Router();

router.get('/:MobileNumber', controller.GetUserDataByMobileNumber); // no authrization
router.post('/', controller.create); // no authrization

router.patch('/', isAuthenticated.isAuthenticated, controller.update);
router.patch('/update-user-locality/:MobileNumber', isAuthenticated.isAuthenticated, controller.updateUserLocality);
router.post('/otp', controller.userOTP); // no authrization
router.patch('/updatepassword', controller.updatePassword); // no authrization
router.get('/', controller.get);
router.patch('/image', isAuthenticated.isAuthenticated, controller.updateImage);
module.exports = router;