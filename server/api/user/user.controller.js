/* eslint-disable import/prefer-default-export,no-mixed-operators,no-unused-vars,max-len,no-underscore-dangle,no-param-reassign,consistent-return */
import crypto from 'crypto';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import async from 'async';
import UserDiscoverySetup from '../userDiscoverySetup/userDiscoverySetup.model';

import DB from '../../config/firebase';

import { set, add } from '../../config/redis/redisoperation';

import { getUrl, setData } from '../minio/minio.controller';

const Users = require('./user.model');

// const RedisClient = require('../../config/redis').redisClient;

const ref = DB.ref('server');
// getcurrentDate
function getDateWithoutTime(date) {
  const currentDateTime = new Date(date).toLocaleString().split(',');
  let currentDate = currentDateTime[0];
  currentDate = currentDate.split('/');
  const day = parseInt(currentDate[0], 10) + 1;
  const month = parseInt(currentDate[1], 10);
  const year = parseInt(currentDate[2], 10);

  // Putting it all together
  return `${year}-${month}-${day}`;
}

function getLastUser() {
  return new Promise((resolve, reject) => {
    const usersRef = ref.child('users');
    usersRef.once('value', (snapshot) => {
      if (snapshot.exists()) {
        usersRef.limitToLast(1).on('child_added', (childSnapshot, err) => {
          const snap = childSnapshot.val();
          resolve(snap);
        });
      } else {
        const lastUser = {};
        lastUser.UserId = 0;
        resolve(lastUser);
      }
    });
  });
}

function checkUserExist(user) {
  return new Promise((resolve, reject) => {
    const usersRef = ref.child(`users/${user.mobile}`);
    usersRef.once('value').then((snap) => {
      resolve(snap.exists());
    });
  });
}

export function decodePassword(password) {
  // const key = crypto.createCipher(process.env.CRYPTO_ALGO, 'abc');// abc replace by some data
  const key = crypto.createCipher('aes-128-cbc', 'abc');// abc replace by some data
  let newPassword = key.update(password, 'utf8', 'hex');
  newPassword += key.final('hex');
  return newPassword;
}


async function userOperation(user) {
  const userExist = await checkUserExist(user);
  if (!userExist) {
    const lastUser = await getLastUser();
    return { lastUser, exist: false };
  }
  return { lastUser: null, exist: true };
}


export function create(req, res) {
  const password1 = decodePassword(req.body.password);
  const user1 = {
    Name: null,
    MobileNumber: req.body.mobile,
    Email: req.body.email,
    Password: password1,
    Gender: null,
    DOB: null,
    locality: req.body.locality,
    InterestedIn: null,
    School: null,
    Company: null,
    Job: null,
    Lat: req.body.lat,
    Long: req.body.long,
    Image: [{
      Name: null,
      IsActive: false,
    }],
  };

  Users.create(user1).then((result) => {
    const user = result;
    user.Password = null;
    user.IsActive = null;
    // jwt.sign({ user }, process.env.JWT_SECKERT_KEY, (err, token) => {
    jwt.sign({ user }, 'seckertkey', (err, token) => {
      if (err) {
        return res.send({ status: false, msg: 'Something went wrong', data: user });
      }
      add(`${user.MobileNumber}login`, token);
      return res.send({ status: true, msg: 'Profile is created successfully', data: user, token });
    });
  }).catch((err) => {
    if (err.errmsg.includes('MobileNumber')) {
      return res.send({ status: false, msg: 'Mobile Number Already Register' });
    } else if (err.errmsg.includes('Email')) {
      return res.send({ status: false, msg: 'Email Already Register' });
    }
    return res.send({ status: false, msg: 'Something Went Wrong' });
  });

  // userOperation(req.body).then((obj) => {
  //   console.log('obj', obj);
  //   if (!obj.exist) {
  //     console.log('eeee');
  //     const usersRef = ref.child('users');
  //     const userID = obj.lastUser.UserId + 1;
  //     const password = decodePassword(req.body.password);
  //     const user = {
  //       UserId: userID,
  //       Name: null,
  //       MobileNumber: req.body.mobile,
  //       Email: req.body.email,
  //       Password: password,
  //       Gender: null,
  //       DOB: null,
  //       locality: req.body.locality,
  //       InterestedIn: null,
  //       School: null,
  //       Company: null,
  //       Job: null,
  //       Lat: req.body.lat,
  //       Long: req.body.long,
  //     };
  //     usersRef.child(user.MobileNumber)
  //       .set(user);
  //     delete user.Password;
  //     delete user.UserId;
  //     jwt.sign({ user }, process.env.JWT_SECKERT_KEY, (err, token) => {
  //       if (err) {
  //         return res.send({ status: false, msg: 'Something went wrong', data: user });
  //       }
  //       add(`${user.MobileNumber}login`, token);
  //       return res.send({ status: true, msg: 'Profile is created succesfully', data: user, token });
  //     });
  //     // have to delete password
  //   } else {
  //     return res.send({ status: false, msg: 'Mobile Already Register', data: null });
  //   }
  // }).catch((err) => {
  //   console.log('ee', err);
  //   return res.send({ status: false, msg: 'Profile is not created please try again', data: null });
  // });
}
export function update(req, res) {
  async.waterfall([
      function(done) {
        const user = {
          Name: req.body.name,
          Gender: req.body.gender,
          DOB: req.body.DOB,
          InterestedIn: req.body.interest,
          School: req.body.school,
          Company: req.body.company,
          Job: req.body.job,
          AboutMe: req.body.AboutMe
        };
        if (!user.InterestedIn) {
          delete user.InterestedIn;
        }
        if (!user.Name) {
          delete user.Name;
        }
        if (!user.Gender) {
          delete user.Gender;
        }
        if (!user.DOB) {
          delete user.DOB;
        }
        if (!user.School) {
          delete user.School;
        }
        if (!user.Company) {
          delete user.Company;
        }
        if (!user.Job) {
          delete user.Job;
        }
        const condition = { _id: req.authData._id };
        Users.findOneAndUpdate(condition, user, { new: true }).then((result) => {
          const userResult = result;
          userResult.Password = null;
          userResult._id = null;
          userResult.IsActive = null;
          // return res.send({ status: true, msg: 'Profile Updated Successfully', data: userResult });
            done(null, userResult);
        }).catch((err) => {
          // console.log(err);
          res.status(201).json({ success: false, message: 'Something went worng!' });
        });
      },
  // ----------------------------------------------------------------------------//
      function(userResult, done) {
        // Create a new image model and fill the properties
        let newUserDiscoverySetup = new UserDiscoverySetup();
        newUserDiscoverySetup.MobileNumber = userResult.MobileNumber;
        newUserDiscoverySetup.MinDistance = '0';
        newUserDiscoverySetup.MaxDistance = '0';
        newUserDiscoverySetup.MinAge = '0';
        newUserDiscoverySetup.MaxAge = '0';
        newUserDiscoverySetup.Language = 'English';
        // newUserDiscoverySetup.CurrLoc = [req.body.curr_lat, req.body.curr_lng];
        newUserDiscoverySetup.save(err => {
            if (err)return res.sendStatus(400);
          return res.send({ status: true, msg: 'Profile Updated Successfully', data: userResult });
        });
      },
    ], function(err) {
      if (err) return next(err);
  });


 
  // DB.ref(`server/users/${req.body.phone}`).update(user);
  // res.send({ status: true, msg: 'Profile Updated Suceesfully', data: null });
}

export function updateUserLocality(req, res) {
   Users.findOne({MobileNumber: req.params.MobileNumber}).exec(function(err, user) {
      if (err) return handleError(res, err);
      if (!user) return res.status(403).send('User does not exist!'); // Return error if username is not found in database
        user.locality = req.body.locality; 
        user.save(function(err) {
          if (err) return handleError(res, err);
            return res.status(200).send({status: true, message: 'User has been successfully updated.' }); // Return success message
        });
    });
}

export function get(req, res) {
  // Users.findById(req.authData._id, { _id: 0, Password: 0, IsActive: 0 }).then((user) => {
  //   if (user.Images.length > 0) {
  //     let index = 0;
  //     console.log(user.Images.length);
  //     async.eachSeries(
  //       user.Images,
  //       (q, next) => {
  //         index += 1;
  //         getUrl(q.Name).then((url) => {
  //           q.URL = url;
  //           if (user.Images.length === index) {
  //             return res.send({ status: true, msg: 'User Information', data: user });
  //           }
  //           next();
  //         }).catch((url) => {
  //           q.URL = url;
  //           if (user.Images.length === index) {
  //             return res.send({ status: true, msg: 'User Information', data: user });
  //           }
  //           next();
  //         });
  //       });
  //   } else return res.send({ status: true, msg: 'User Information1', data: user });
  // });
    Users.find({}, (err, user) => {
      if (err)return res.status(403).send(err);
      if (!user) return res.status(201).json({ success: false, message: 'Not Found!' });
      return res.status(200).json({ success: true, user });
    })
}


export function userOTP(req, res) {
  if (req.body.isSendOTP) {
    // const OTP = Math.floor(1000 + Math.random() * 9000);
    // RedisClient.set(`OTP${req.body.code}${req.body.phone}`, OTP, (err, reply) => {
    //   if (err) {
    //     return res.send({ status: false, msg: 'Something went wrong', data: null });
    //   }
    //   // send otp logic here
    //   console.log(OTP);
    axios.post('https://api.authy.com/protected/json/phones/verification/start', {
      via: 'sms',
      country_code: req.body.code,
      phone_number: req.body.phone,
      code_length: 4,
    // }, { headers: { 'X-Authy-API-Key': process.env.OTP_SECURITY_API_KEY } })
    }, { headers: { 'X-Authy-API-Key': 'Tdzm51468GNJZO07rvzLIy0Ljb8T60Lc' } })
      .then(response => res.send({ status: true, msg: 'OTP is send on Phone number', data: req.body }))
      .catch((err) => {
        return res.send({ status: false, msg: 'Something went wrong', data: err });
      });

    // });
  } else {
  //   axios.get(`https://api.authy.com/protected/json/phones/verification/check?X-Authy-API-Key=
  // ${process.env.OTP_SECURITY_API_KEY}&phone_number=
  // ${req.body.phone}&country_code=${req.body.code}&verification_code=${req.body.otp}`,
  //   { headers: { 'X-Authy-API-Key': process.env.OTP_SECURITY_API_KEY } })
  //     .then(response => res.send({ status: true, msg: 'OTP is correct', data: req.body }))
  //     .catch(err => res.send({ status: false, msg: 'OTP is wrong', data: null }));



axios.get(`https://api.authy.com/protected/json/phones/verification/check?X-Authy-API-Key=
  ${'Tdzm51468GNJZO07rvzLIy0Ljb8T60Lc'}&phone_number=
  ${req.body.phone}&country_code=${req.body.code}&verification_code=${req.body.otp}`,
    { headers: { 'X-Authy-API-Key': 'Tdzm51468GNJZO07rvzLIy0Ljb8T60Lc' } })
      .then(response => res.send({ status: true, msg: 'OTP is correct', data: req.body }))
      .catch(err => res.send({ status: false, msg: 'OTP is wrong', data: null }));

    // RedisClient.get(`OTP${req.body.code}${req.body.phone}`, (err, otp) => {
    //   if (err) {
    //     return res.send({ status: false, msg: 'Something went wrong', data: null });
    //   } else if (otp === req.body.otp) {
    //     RedisClient.del(`OTP${req.body.code}${req.body.phone}`);
    //     return res.send({ status: true, msg: 'OTP is correct', data: req.body });
    //   }
    //   return res.send({ status: false, msg: 'OTP is wrong', data: null });
    // });
  }
}

exports.GetUserDataByMobileNumber = function (req, res, next) {
 Users.findOne({ MobileNumber: req.params.MobileNumber}).exec((err, user) => {
      if (err) return res.status(201).json({ success: false, message: 'Something went worng!' });
      if (!user) return res.status(201).json({ success: false, message: 'Not Found!' });
      return res.status(200).send(user);
    });
};

export function updatePassword(req, res) {
  const user = {
    Password: decodePassword(req.body.password),
  };
  // DB.ref(`server/users/${req.body.phone}`).update(user);
  const condition = { MobileNumber: req.body.phone };
  Users.findOneAndUpdate(condition, user).then((result) => {
    return res.send({ status: true, msg: 'Password Updated Successfully' });
  }).catch((err) => {
    console.log(err);
  });
}
export function updateImage(req, res) {
  req.body.fromWhere = 'user';
  setData(req, res);
}
