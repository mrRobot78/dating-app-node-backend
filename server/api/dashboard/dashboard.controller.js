/* eslint-disable import/prefer-default-export,no-mixed-operators,no-param-reassign,no-unused-vars */
import DB from '../../config/firebase';
import async from 'async';
import { getUrl } from '../minio/minio.controller';

const Users = require('../user/user.model');

const ref = DB.ref('server');
function rad(x) {
  return x * Math.PI / 180;
}

function getDistance(p1, p2) {
  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.long - p1.long);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d; // returns the distance in meter
}

export function profile(req, res) {
  // const usersRef = ref.child('users');
  Users.find({ IsActive: 1 }).then((snapshot) => {
    const allUser = [];
    const lat = req.authData.Lat;
    const long = req.authData.Long;
    const p1 = {
      lat,
      long,
    };
    console.log(p1);
    snapshot.forEach((item) => {
      if (req.authData.MobileNumber !== item.MobileNumber) { allUser.push(item); }
    });
    const userArr = [];
    allUser.forEach((item) => {
      const p2 = {
        lat: item.Lat,
        long: item.Long,

      };
      if (p1.lat && p1.long && p2.lat && p2.long) {
        const dist = getDistance(p1, p2);
        console.log('dd', dist);
        if (dist < 5000) {
          delete item.Password;
          item.Distance = dist;
          userArr.push(item);
        }
      }
    });
    userArr.forEach((item, index) => {
      if (item.Images.length > 0) {
        const fileName = item.Images[item.Images.length - 1].Name;
        getUrl(fileName).then((url) => {
          item.Profile = url;
          if (userArr.length === index + 1) {
            res.send(userArr);
          }
        }).catch((err) => {
          item.Profile = null;
          if (userArr.length === index + 1) {
            res.send(userArr);
          }
        });
      } else {
        item.Profile = null;
        if (userArr.length === index + 1) {
          console.log('aa');
          res.send(userArr);
        }
      }
    });
  });
}


exports.GetAllUser = function(req, res) {
    Users.find({}, (err, user) => {
      if (err)return res.status(403).send(err);
      if (!user) return res.status(201).json({ success: false, message: 'Not Found!' });
      const index = user.findIndex(obj => obj.MobileNumber === req.params.MobileNumber);
      user.splice(index, 1);
      return res.status(200).json({ success: true, user });
    })
};


exports.LikePerson = function(req, res, next) {
    Users.findOne({MobileNumber: req.params.MobileNumber}, (err, user) => {
        if (err)return res.status(403).send(err);
        
    })
};







