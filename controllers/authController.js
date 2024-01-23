import { hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const registerController = async (req,res) => {
    try {
        const requiredFields = ['name', 'email', 'password', 'phone', 'address'];
        const {name, email, password, phone, address} = req.body;
        if(!requiredFields.every(field => req.body[field])) {
            return res.send({ error: 'All fields are required' });
        }
        console.log('email:', req.body['email']);
        //exisiting user
        const exisitingUser = await userModel.findOne({email});
        if(exisitingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already register please login!'
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address
        }).save();

        return res.status(200).send({
            success: true,
            message: "Register successfull",
            user
        });
        
    } catch (error) {
        return res.status(505).send({
            success: false,
            message: "Error in Register",
            error
        })
    }
};

