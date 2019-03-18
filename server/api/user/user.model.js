import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  Name: { type: String },

  MobileNumber: { type: String, unique: true, required: true },
  Email: { type: String, unique: true, required: true },
  Gender: { type: String },
  InterestedIn: { type: String },
  School: { type: String },
  Company: { type: String },
  Job: { type: String },
  Password: { type: String},
  DOB: { type: Date },
  locality:  {
      CountryCode: { type: String },
      CountryName: { type: String },
      CountryFlag: { type: String },
      CountryLanguage: { type: String }
  },

  AboutMe: { type: String },


  // CurrLoc: { index: '2d', type: [Number] },
  CurrLoc: {
   type: { type: String },
   coordinates: []
  },
  Lat: { type: Number },
  Long: { type: Number },
  IsActive: { type: Boolean, required: true, default: true },
  Profile: { type: String },
  Images: [{
    imgId: String,
    filename: String,
    originalname: String,
    // indexNumber: String,
    imgUrl: String,
    profile: { type: Boolean, default: false },
    created: { type: Date, default: Date.now }
  }],

  liked: [{ MobileNumber : String }]

});


userSchema.index({ CurrLoc: "2dsphere" });
module.exports = mongoose.model('User', userSchema);

// export default function (sequelize, DataTypes) {
//   return sequelize.define('UserDetails', {
//     UserId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//
//     },
//     Name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     MobileNumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     Email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     Gender: {
//       type: DataTypes.TINYINT, // 1 male 0 female
//       allowNull: false,
//     },
//     Password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     DOB: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     FirstLogin: {
//       type: DataTypes.TINYINT, // 1->yes 0->no
//       allowNull: false,
//     },
//     IsActive: {
//       type: DataTypes.TINYINT,
//       allowNull: false,
//     },
//   }, {
//     freezeTableName: true,
//   });
// }
