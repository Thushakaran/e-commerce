const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/products').get(isAuthenticatedUser, getProducts);
router.route('/createProducts').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/product/:id')
    .get(getSingleProduct)
    .put(updateProduct)
    .delete(deleteProduct)

module.exports = router