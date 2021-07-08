const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    const products = adminData.products;

    // express: Render method to compile and generate html from template file
    res.render('shop', 
    { products: products, docTitle: 'shop', path: '/shop', hasProducts: products.length > 0, productCSS: true, activeShop: true });

    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;