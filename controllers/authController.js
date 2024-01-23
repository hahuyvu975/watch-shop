import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const requiredFields = ['name', 'email', 'password', 'phone', 'address'];
        const { name, email, password, phone, address } = req.body;
        if (!requiredFields.every(field => req.body[field])) {
            return res.send({ error: 'All fields are required' });
        }
        console.log('email:', req.body['email']);
        //exisiting user
        const exisitingUser = await userModel.findOne({ email });
        if (exisitingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already register please login!'
            });
        };

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
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const requiredLogin = ['email', 'password'];
        if (!requiredLogin.every(field => req.body[field])) {
            return res.status(404).send({
                success: false,
                message: 'Email or password is required'
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).send({
            success: false,
            message: "Not found user"
        })
        const matchPassword = await comparePassword(password, user.password);
        if (!matchPassword) return res.status(404).send({
            success: false,
            message: "Invalid email or password"
        })

        //token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        return res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    };
};

export const testController = (req, res) => {
    return res.status(400).send({
        message: 'Access successfully'
    });
};

