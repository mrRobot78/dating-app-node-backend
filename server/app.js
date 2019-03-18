/**
 * Main application file
 */

import express from 'express';
import http from 'http';

import connectMongo from './config/mongo';
import CONFIG from './config/environment';
import expressConfig from './config/express';
import registerRoutes from './routes';

// ---------
const bodyParser = require("body-parser");

import multer from 'multer'
import  cors from 'cors'
const app = express();

// Generell properties
export let UPLOAD_PATH = '/uploads'

// app.use('/uploads', express.static('uploads'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
 
// Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
export let upload = multer({ storage: storage })
 
// // Initialise App
// export const app = express();
app.use(cors());
 
// // Load our routes
// var routes = require('./routes');
 
// // Setup Database
// let uri = 'mongodb://localhost/imageupload';
// mongoose.connect(uri, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Connected to MongoDb');
//     }
// });
 
// // App startup
// app.listen(PORT, function () {
//     console.log('listening on port: ' + PORT);
// });

// ----------------------------------------------------//


const log = console;
// Setup server

connectMongo().then((res) => {
  console.log(res);
  // startServer();
})
  .catch((err) => {
    console.log(err);
    log.error('Server failed to start due to error: %s', err);
  });
const server = http.createServer(app);

// expressConfig(app);
// registerRoutes(app);

app.use('/node_modules', express.static(__dirname + '/node_modules'));

// var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: CONFIG.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);


// Start server
function startServer() {
  server.listen(CONFIG.PORT, CONFIG.IP, () => {
    log.log('Express server listening on %d, in %s mode', CONFIG.PORT, app.get('env'));
  });
}

setImmediate(startServer);


// Expose app
module.exports = app;
exports = module.exports;


/**
 * Main application file
 */

// import express from 'express';
// import http from 'http';

// import connectMongo from './config/mongo';
// import CONFIG from './config/environment';
// import expressConfig from './config/express';
// import registerRoutes from './routes';

// const log = console;
// // Setup server
// const app = express();
// const server = http.createServer(app);

// expressConfig(app);
// registerRoutes(app);
// const socketio = require('socket.io')(server, {
//   serveClient: CONFIG.env !== 'production',
//   path: '/socket.io-client',
// });
// require('./config/socketio').default(socketio);
// require('./config/express').default(app);
// require('./routes').default(app);
// // Start server
// function startServer() {
//   server.listen(CONFIG.PORT, CONFIG.IP, () => {
//     log.log('Express server listening on %d, in %s mode', CONFIG.PORT, app.get('env'));
//   });
// }
// connectMongo().then((res) => {
//   console.log(res);
//   startServer();
// })
//   .catch((err) => {
//     console.log(err);
//     log.error('Server failed to start due to error: %s', err);
//   });

// // Expose app
// module.exports = app;
// exports = module.exports;
