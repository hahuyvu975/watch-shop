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
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in create product",
            error: error.message
        });
    }
};

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
            message: "Error in get all products",
            error: error.message
        })
    }
};

export const getSingleProductController = async (req, res) => {
    try {
        const { slug } = req.params;

        const product = await productModel
            .findOne({ slug })
            .select('-photo')
            .populate('categories');

        if (!product) return res.status(500).send({
            success: false,
            message: "Not found product by slug"
        });

        return res.status(200).send({
            success: true,
            message: "Get single product successfully",
            product
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in get single product",
            error: error.message
        });
    }
};

export const productPhotoController = async (req, res) => {
    try {
        const { pid } = req.params;

        const product = await productModel.findById(pid).select("photo");
        if (!product.photo.data) return res.status(500).send({
            success: false,
            message: "Not found photo",
        });

        return res
            .status(200)
            .set("Content-type", product.photo.contentType)
            .send((product.photo.data));

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in get photo",
            error: error.message
        });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const removeProduct = await productModel.findByIdAndDelete(id);
        if (!removeProduct) return res.status(500).send({
            success: false,
            message: "Not found product to remove",
        });

        return res.status(200).send({
            success: true,
            message: "Remove product successfully",
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in delete photo",
            error: error.message
        });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { name } = req.fields;
        const { photo } = req.files;
        
        if (photo.size > 1000000) return res.status(500).send({
            success: false,
            message: "Photo should be less than 1mb"
        })

        const product = await productModel.findByIdAndUpdate(req.params.id,
            {
                ...req.fields,
                photo: {
                    data: fs.readFileSync(photo.path),
                    contentType: photo.type
                },
                slug: slugify(name)
            },
            {
                new: true
            });

        return res
            .status(200)
            .send({
                success: true,
                message: "Updated photo successfully",
                product
            });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in update photo",
            error: error.message
        });
    }
}

