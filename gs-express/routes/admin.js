const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {docTitle: 'Add Product Page', path: '/admin/add-product', productCSS: true, formCSS: true, activeAddProduct: true});
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/product => POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);

    products.push({title: req.body.title});
    res.redirect('/');
});
    
module.exports = {
    router,
    products
};