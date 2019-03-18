import mongoose from 'mongoose';

const redisSchema = mongoose.Schema({
  key: { type: String, default: 0, unique: true, required: true },
  value: { type: String, required: true },
});

module.exports = mongoose.model('redis', redisSchema);
