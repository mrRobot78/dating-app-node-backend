/* eslint-disable import/prefer-default-export,max-len */

// const redisClient = require('./index').redisClient;
const redis = require('../../models/redis.model');
//
// export function set(key, value) {
//   redisClient.set(key, value);
// }

export function add(key, value) {
  return redis.findOneAndUpdate({ key }, { $set: { value } }, { upsert: true }).then(result => result);
}

export function getValue(key) {
  return new Promise((resolve, reject) => {
    redis.findOne({ key }).then(result => resolve(result));
  });
}
