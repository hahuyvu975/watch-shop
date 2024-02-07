import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify';

export const createCategoryController = async (req, res) => {
    try {
        const requiredField = ['name'];
        const { name } = req.body

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
        })
    } catch (error) {
        console.log("Error: Create Category!");
        return res.status(404).send({
            success: false,
            message: "Error in Create Category"
        })
    }
}