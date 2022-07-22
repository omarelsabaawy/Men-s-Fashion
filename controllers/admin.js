const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    });
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};


exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/:productId',
                editing: editMode,
                product: product
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const videoUrl = req.body.videoUrl;
    const quantity = req.body.quantity;
    const product = new Product(name, price, description, imageUrl, videoUrl, quantity, prodId);
    console.log(name, prodId)
    product
        .save()
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/manage-product');
        })
        .catch(err => console.log(err));
};


exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/manage-products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/admin/manage-product');
        })
        .catch(err => console.log(err));
};