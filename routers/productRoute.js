import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getAllProductController, getSingleProductController, productPhotoController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router = express.Router();

//routes product

//create-product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//update product
router.put('/update-product/:id', requireSignIn, isAdmin, formidable(), updateProductController);

//get all product
router.get('/get-product', requireSignIn, isAdmin, getAllProductController);

//get single product
router.get('/single-product/:slug', requireSignIn, isAdmin, getSingleProductController)

//get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController);

export default router;