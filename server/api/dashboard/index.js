const express = require('express');
const controller = require('./dashboard.controller');
const isAuthenticated = require('../../auth/auth.service');

const router = express.Router();

// router.get('/:lat/:long', isAuthenticated.isAuthenticated, controller.profile);


router.post('/liked/:MobileNumber', controller.LikePerson);

router.get('/getAllUser/:MobileNumber', controller.GetAllUser);



module.exports = router;
