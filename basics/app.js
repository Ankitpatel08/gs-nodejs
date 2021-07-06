/**
 * Node JS: Javascript runtime; based on js engine: v8 (google)
 * Run JS code anywhere
 * Code Modules: http, https, fs, path, os
 */

// need to import module
const http = require('http');

// custom imports
const routes = require('./routes');

// creating server which will accept request, event loop
const server = http.createServer(routes.handler);

// define port for created server
server.listen(3000);
