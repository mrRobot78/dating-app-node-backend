import mongoose from 'mongoose';
import { registerEvents } from './chat.events';

// var ChatSchema = new Schema({
const ChatSchema = mongoose.Schema({

  MsgSessionId: { type: String },
  MsgText: { type: String },
  MsgTimestamp: { type: Date, default: Date.now },
  Delivered: { type: Boolean },
  Read: { type: Boolean },
  Sender: {
    Name: String,
    MobileNumber: String,
  },
  User: {
    Name: String,
    MobileNumber: String,
  },
  // sender_mobile:      { type: String },
  // User:        { type: String }

  // sender : {
  //     type : mongoose.Schema.Types.ObjectId,
  //     ref : 'User'
  // },
  //   : { type: Date },
  // messages : [
  //     {
  //         message : String,
  //         meta : [
  //             {
  //                 user : {
  //                     type : mongoose.Schema.Types.ObjectId,
  //                     ref : 'User'
  //                 },
  //                 delivered : Boolean,
  //                 read : Boolean
  //             }
  //         ]
  //     }
  // ],
  // is_group_message : { type : Boolean, default : false },
  // participants : [
  //     {
  //         user :  {
  //             type : mongoose.Schema.Types.ObjectId,
  //             ref : 'User'
  //         },
  //         delivered : Boolean,
  //         read : Boolean,
  //         last_seen : Date
  //     }
  // ]
});

registerEvents(ChatSchema);
module.exports = mongoose.model('chat', ChatSchema);
