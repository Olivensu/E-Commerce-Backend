const express = require('express');
const upload = require('../middlewares/uploadFile');
const runValidation = require('../validators');
const { isloggedin, isloggedOut, isAdmin } = require('../middlewares/auths');
const { handleCreateCategory, handleGetCategory, handleGetCategories, handleUpdateCategory, handleDeleteCategory } = require('../controllers/categoryController');
const { validateCategory } = require('../validators/category');
const { handleCreateProduct, handleGetProduct, handleGetProducts, handleUpdateProduct, handleDeleteProduct, handleGetProductByShop } = require('../controllers/productController');
const Product = require('../models/productModel');
const productRouter = express.Router();
const { successResponse } = require('../controllers/responceController');


// post /api/product
productRouter.post('/create-product',upload.single("image"), handleCreateProduct);
productRouter.get('/', handleGetProducts);
productRouter.get('/:id', handleGetProduct);
productRouter.get('/shop/:shopSlug', handleGetProductByShop);
// categoryRouter.get('/', handleGetCategories);
// categoryRouter.get('/:slug', handleGetCategory);
productRouter.put('/:id',upload.single("image"), handleUpdateProduct);
productRouter.delete('/:id', handleDeleteProduct);

productRouter.post('/review/:id', async(req,res,next)=>{
    try {
        const id = req.params.id;
        const {name, date, review, rating} = req.body;
        const product = await Product.findById(id);
        product.reviews.push({
            name:name,
            date:date,
            rating:rating,
            review:review
        })
        await product.save();
        return successResponse(res, {
            statusCode: 200,
            message: `Review updated successfully`,
            payload: product.reviews,
          });
    } catch (error) {
        next(error);
    }
})

module.exports = productRouter