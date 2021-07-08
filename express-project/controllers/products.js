const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', 
        {docTitle: 'Add Product Page', path: '/admin/add-product'});
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const product = new Product(req.body.title);

    product.save();

    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        // express: Render method to compile and generate html from template file
        res.render('shop', 
        { products: products, docTitle: 'shop', path: '/shop'});
    });
};