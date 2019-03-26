const express = require('express');
const controller = require('./user.controller');
const isAuthenticated = require('../../auth/auth.service');

const router = express.Router();

router.get('/:MobileNumber', controller.GetUserDataByMobileNumber); // no authrization
router.post('/', controller.create); // no authrization

router.patch('/', isAuthenticated.isAuthenticated, controller.update);
router.patch('/update-user-locality/:MobileNumber', controller.updateUserLocality);
router.post('/otp', controller.userOTP); // no authrization
router.patch('/updatepassword', controller.updatePassword); // no authrization
router.get('/', controller.get);
router.patch('/image', isAuthenticated.isAuthenticated, controller.updateImage);
module.exports = router;



// "Images": [
//         {
//             "profile": false,
//             "_id": {
//                 "$oid": "5c90f59de6deee06cfb29628"
//             },
//             "imgId": "5c90f59db6f0b0cf060000016360205875",
//             "filename": "image-1553003933854",
//             "originalname": "aud1.jpg",
//             "imgUrl": "http://localhost:9000/api/user-img-gallery/get-image-by-id/5c90f59db6f0b0cf060000016360205875",
//             "created": {
//                 "$date": "2019-03-19T13:58:53.971Z"
//             }
//         }
//     ],