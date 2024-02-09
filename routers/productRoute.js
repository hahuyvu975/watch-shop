import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, getAllProductController, getSingleProductController, productPhotoController } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router = express.Router();

//routes product

//create-product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//get all product
router.get('/get-product', requireSignIn, isAdmin, getAllProductController);

//get single product
router.get('/single-product/:slug', requireSignIn, isAdmin, getSingleProductController)

//get photo
router.get('/product-photo/:pid', requireSignIn, isAdmin, productPhotoController)

export default router;