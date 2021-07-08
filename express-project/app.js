// core packages
// const http = require('http');
const path = require('path');

// Third party packages
const express = require('express');
const parser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
// app.use((req, res, next) => {
//     console.log('in the middleware');

//     // Allow the request to continue to the next middleware in line
//     next();
// });

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// body parser for received requests
app.use(parser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.router);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {docTitle: 'Page not found', path: '404'});
});

// Express shorthand syntax to create server and listen on port
app.listen(3000);

// const server = http.createServer(app);
// server.listen(3000);
