import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify';

export const createCategoryController = async (req, res) => {
    try {
        const requiredField = ['name'];
        const { name } = req.body;

        if (!requiredField.every(field => req.body[field])) {
            return res.status(403).send({
                success: false,
                message: "All fields are required!"
            })
        }
        const exsistingCategory = await categoryModel.findOne({ name });
        if (exsistingCategory) return res.status(401).send({
            success: false,
            message: "This category is exsisted"
        });

        const newCategory = await new categoryModel({
            name, slug: slugify(name)
        }).save();

        return res.status(200).send({
            success: true,
            message: "Create category successfully",
            newCategory
        });
    } catch (error) {
        console.log("Error: Create Category!");
        return res.status(500).send({
            success: false,
            message: "Error in Create Category"
        });
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const updateCategory = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true });

        return res.status(200).send({
            success: true,
            message: "Updated successfully",
            updateCategory
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in update category"
        });
    }
};

export const getAllCategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        return res.status(202).send({
            success: true,
            message: "List Category",
            categories
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in get all category"
        });
    }
};

export const singleCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({ slug });
        if(!category) return res.status(401).send({
            success: false,
            message: 'Not found single category'
        }) 
        console.log(category)
        return res.status(200).send({
            success: true,
            message: "Category found successfully",
            category
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in finding category",
            error: error.message
        });
    }
};

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const removeCategory =  await categoryModel.findByIdAndDelete(id);
        
        return res.status(200).send({
            success: true,
            message: "Category removed successfully"
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in delete category",
            error: error.message
        });
    }
};