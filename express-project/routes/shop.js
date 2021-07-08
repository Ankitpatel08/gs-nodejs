const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    const products = adminData.products;

    // express: Render method to compile and generate html from template file
    res.render('shop', 
    { products: products, docTitle: 'shop', path: '/shop'});
});

module.exports = router;