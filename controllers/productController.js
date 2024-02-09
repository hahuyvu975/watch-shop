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

        const product = new productModel({
            ...req.fields, slug: slugify(name)
        });

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

export const getAllProductController = async (req, res) => {
    try {
        //---extension if divide data by page
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const products = await productModel
            .find({})
            .select("-photo")
            .limit(10)
            .skip(skip)
            .sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: "List Products",
            countTotal: products.length,
            products
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in create product",
            error: error.message
        })
    }
}