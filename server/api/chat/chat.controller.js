

/* eslint-disable import/prefer-default-export,no-mixed-operators,no-unused-vars,max-len */
import crypto from 'crypto';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import DB from '../../config/firebase';

import { set, add } from '../../config/redis/redisoperation';
import Chat from './chat.model';

const ref = DB.ref('server');

/* --------------------------------- Creates a Data in the DB.---------------------------------*/

exports.getDatabyMsgSessionId = function (req, res, next) {
  console.log(`${req.params.user_mobile}_${req.params.sender_mobile}`);
  console.log(`${req.params.sender_mobile}_${req.params.user_mobile}`);
  Chat.find({ MsgSessionId: { $in: [`${req.params.user_mobile}_${req.params.sender_mobile}`, `${req.params.sender_mobile}_${req.params.user_mobile}`] } })
    .sort({ msg_timestamp: 1 }).select('-_id').exec((err, chat) => {
      if (err) return res.status(201).json({ success: false, message: 'Something went worng!' });
      if (!chat) return res.status(201).json({ success: false, message: 'Not Found!' });
      return res.status(200).json({ success: true, chat });
    });
};


exports.create = function (req, res, next) {
  // const chatRef = ref.child('chat');
  // const chatData = {
  //        msg_session_id: req.body.msg_session_id,
  //        msg_text: req.body.msg_text,
  //        user_mobile: req.body.msg_text,
  //        sender_mobile: req.body.msg_text,
  //      };

  //      chatRef.child(chatData.msg_session_id)
  //        .set(chatData);

  Chat.create(req.body, (err, chat) => {
    if (err) return res.status(201).json({ success: false, message: 'Something went worng!' });
    return res.status(201).json({ success: true, message: 'Chat successfully Created!' });
  });
};
