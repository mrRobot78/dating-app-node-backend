import mongoose from 'mongoose';

const LocalitySchema = mongoose.Schema({

  CountryCode: { type: String },
  CountryName: { type: String },
  CountryFlag: { type: String },
  CountryLanguage: { type: String }
});

module.exports = mongoose.model('locality', LocalitySchema);
