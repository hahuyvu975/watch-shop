import express from 'express'
import { registerController, loginController, testController, forgotPasswordController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//route object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || METHOD POST
router.post('/login', loginController);

router.get('/test', requireSignIn, isAdmin, testController);

// Forgot Passowrd || PORT
router.post('/forgot-password', forgotPasswordController);

//protected route auth user
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({
        message: true
    })
})

//protected route auth admin
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        message: true
    })
})
export default router;