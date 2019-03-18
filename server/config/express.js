/* eslint-disable global-require,no-unused-vars,quotes */
/**
 * Express configuration
 */

import express from 'express';
// import favicon from 'serve-favicon';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';


import passport from 'passport';

import config from './environment';


export default function (app) {
  const env = process.env.NODE_ENV;

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(cors());
  }

  if (env === 'production') {
    // app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(cors());
  }


  // app.set('views', `${config.root}/server/views`);
  // app.engine('html', require('ejs').renderFile);
  // app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(methodOverride());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Expose-Headers', 'Authorization');
    next();
  });
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use((error, req, res, next) => {
    res.status(500).send('500: Internal Server Error');
  });

  if (env === 'development' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
