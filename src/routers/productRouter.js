const express = require('express');
const upload = require('../middlewares/uploadFile');
const runValidation = require('../validators');
const { isloggedin, isloggedOut, isAdmin } = require('../middlewares/auths');
const { handleCreateCategory, handleGetCategory, handleGetCategories, handleUpdateCategory, handleDeleteCategory } = require('../controllers/categoryController');
const { validateCategory } = require('../validators/category');
const { handleCreateProduct, handleGetProduct, handleGetProducts, handleUpdateProduct, handleDeleteProduct } = require('../controllers/productController');
const productRouter = express.Router();


// post /api/product
productRouter.post('/create-product',upload.single("image"), handleCreateProduct);
productRouter.get('/', handleGetProducts);
productRouter.get('/:slug', handleGetProduct);
// categoryRouter.get('/', handleGetCategories);
// categoryRouter.get('/:slug', handleGetCategory);
productRouter.put('/:slug', handleUpdateProduct);
productRouter.delete('/:slug', handleDeleteProduct);




module.exports = productRouter