const path = require('path');

const express = require('express');

const router = express.Router();

router.use(express.static(path.join('public')));

const adminController = require('../controllers/admin');
const authController = require('../controllers/auth');

//add new product
router.get('/add-product', adminController.getAddProduct);
router.post('/postAdd-product', adminController.postAddProduct);

router.post('/postNewUser', authController.postNewUser);

//manage products
// router.get('/manage-product', adminController.getProducts);
// //delete products
// router.post('/delete-product', adminController.postDeleteProduct);
// //edit products
// router.get('/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

module.exports = {
    'routes': router,
};