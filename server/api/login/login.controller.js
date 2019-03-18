/* eslint-disable import/prefer-default-export,consistent-return,no-underscore-dangle */
import jwt from 'jsonwebtoken';

import DB from '../../config/firebase';
import { decodePassword } from '../user/user.controller';
import { set, add } from '../../config/redis/redisoperation';

const Users = require('../user/user.model');

const ref = DB.ref('server');
export function index(req, res) {
  // const usersRef = ref.child(`users/${req.body.mobile}`);
  Users.findOne({ MobileNumber: req.body.mobile }).then((result) => {
    const user = JSON.parse(JSON.stringify(result));
    if (user) {
      if (user.Password === decodePassword(req.body.password)) {
        delete user.Password;
        delete user.IsActive;
        // jwt.sign({ user }, process.env.JWT_SECKERT_KEY, (err, token) => {
        jwt.sign({ user }, 'seckertkey', (err, token) => {
          if (err) {
            return res.send({ status: false, msg: 'Something went wrong', data: user });
          }
          add(`${user.MobileNumber}login`, token);
          delete user._id;
          return res.send({ status: true, msg: 'Login successfully', data: user, token });
        });
      } else { return res.send({ status: false, msg: 'Login Not successfully', data: null }); }
    } else {
      return res.send({ status: false, msg: 'Account not Found', data: null });
    }
  });
}

export function get(req, res) {
  res.send({ data: 'work' });
}
