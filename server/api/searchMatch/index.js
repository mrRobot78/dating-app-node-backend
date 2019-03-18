const express = require('express');
const controller = require('./searchMatch.controller');

const isAuthenticated = require('../../auth/auth.service');

const router = express.Router();


module.exports = router;
