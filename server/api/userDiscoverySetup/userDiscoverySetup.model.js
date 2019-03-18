import * as mongoose from 'mongoose'
export var usrDiscoverySetupSchema = new mongoose.Schema({
    MobileNumber: { type: String, required: true },
    MinDistance: String,
    MaxDistance: String,
    MinAge: String,
    MaxAge: String,
    IntrestedInMale: {type: Boolean, default: false},
    IntrestedInFemale: {type: Boolean, default: false},
    Language: String,
    // CurrLoc: { index: '2d', type: [Number] }
});
 
module.exports = mongoose.model('usrDiscoverySetup', usrDiscoverySetupSchema);