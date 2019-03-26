const express = require('express');
const controller = require('./userImgGallery.controller');
import { UPLOAD_PATH, upload } from '../../app';

const isAuthenticated = require('../../auth/auth.service');

const router = express.Router();

router.get('/get-image-by-id/:imgId', controller.GetImageById); // no authrization
router.get('/:MobileNumber', controller.GetAllImageByMobileNumber); // no authrization
router.post('/:MobileNumber', upload.single('image'), controller.create); // no authrization
router.patch('/:MobileNumber/:imgId', controller.deleteImgById); // no authrization


module.exports = router;
