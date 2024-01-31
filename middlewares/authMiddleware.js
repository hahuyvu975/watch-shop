import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//Protected routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(403).send({
            success: false,
            message: "Access denied"
        });

        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: "Invalid token"
        });
    }
}

//admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access"
            });
        } else {
            next();
        }

    } catch (error) {
        return res.status(404).send({
            success: false,
            message: "You are NOT admin"
        })
    }
}

