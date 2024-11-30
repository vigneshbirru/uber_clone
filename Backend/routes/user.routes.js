const express = require('express');
const router = express.Router();
const usercontroller = require("../controllers/user.controller");
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth_middlewares');


router.post(
    '/register',
    [
        body('fullname.firstname')
            .isLength({ min: 3 })
            .withMessage('First name must be at least 3 characters long'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    usercontroller.registerUser
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    usercontroller.loginUser
)

router.get('/profile', authMiddleware.authUser, usercontroller.getUserProfile );

router.get('/logout',authMiddleware.authUser, usercontroller.logoutUser)


module.exports = router;