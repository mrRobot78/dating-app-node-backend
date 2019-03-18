/* eslint-disable max-len,import/prefer-default-export,no-shadow,consistent-return */
import jwt from 'jsonwebtoken';

// const redisClient = require('../config/redis').redisClient;
const redis = require('../config/redis/redisoperation');


/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 401
 */

export function isAuthenticated(req, res, next) {
  const bearerHeader = req.header('Authorization');
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    // jwt.verify(token, process.env.JWT_SECKERT_KEY, (err, authData) => {
    jwt.verify(token, 'seckertkey', (err, authData) => {
      if (err || typeof authData === 'undefined') {
        res.status(401).json({ success: false, msg: 'Unauthorised access3' });
      } else {
        redis.getValue(`${authData.user.MobileNumber}login`).then((reply) => {
          if (reply.value === token) {
            // redisClient.set(`${authData.user.PM_User_MobileNumber}`, `${req.token}`);
            // redisClient.expire(`${authData.user.PM_User_MobileNumber}`, process.env.IDEL_SESSION_TIME); // session time
            req.authData = authData.user;
            return next();
          }
          res.status(401).json({ success: false, msg: 'Unauthorised access1' });
        });
      }
    });
  } else {
    res.status(401).json({ success: false, msg: 'Unauthorised access4' });
  }
  // });
}
