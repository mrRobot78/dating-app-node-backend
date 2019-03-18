import * as mongoose from 'mongoose'
 
// // Interface for TS
// export interface IImageModel extends mongoose.Document {
//     filename: string; 
//     originalName: string; 
//     desc: string;
//     created: Date;
//   };
 
  // Actual DB model
export var imageSchema = new mongoose.Schema({
    MobileNumber: { type: String, required: true },
    filename: String,
    originalName: String,
    indexNumber: String,
    url: String,
    profile: { type: Boolean, default: false },
    created: { type: Date, default: Date.now }
});
 
module.exports = mongoose.model('userImgGallery', imageSchema);