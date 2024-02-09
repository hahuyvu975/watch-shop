import productModel from "../models/productModel.js"
import fs from 'fs';
import slugify from 'slugify';

export const createProductController = async (req, res) => {
    try {
        const requiredFields = ['name', 'description', 'price', 'categories', 'quantity'];
        const { name, slug, description, price, categories, quantity, shipping } = req.fields;
        const { photo } = req.files;
        
        if (!requiredFields.every(field => req.fields[field])) {
            return res.status(500).send({
                success: false,
                message: "All fields are required"
            });
        };

        if (!photo && photo.size > 1000000) return res.status(500).send({
            success: false,
            message: "Photo is required and should be less than 1mb"
        });
        const product = await new productModel({
            ...req.fields, slug: slugify(name)
        });
        console.log(photo.path);
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        };
        await product.save();
        return res.status(200).send({
            success: true,
            message: "Create product successfully",
            product
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in create product",
            error: error.message
        })
    }
}