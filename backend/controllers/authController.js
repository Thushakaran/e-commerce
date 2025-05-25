const catchAsyncError = require('../middlewares/catchAsyncError')
const User = require('../models/userModel')
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwt')

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, avatar } = req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });
    sendToken(user, 201, res)
})

//Login User - /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    //finding the user database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    if (!await user.isValidPassword(password)) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 201, res)

})

// logout - /api/v1/logout
exports.logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
        .status(200)
        .json({
            success: true,
            message: "Loggedout"
        })
}

// forgot password - /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    const resetToken = user.getResetToken();
    await user.save({ validateBeforeSave: false })

    // let BASE_URL = process.env.FRONTEND_URL;
    // if (process.env.NODE_ENV === "production") {
    //     BASE_URL = `${req.protocol}://${req.get('host')}`
    // }

    // create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/password/reset/${resetToken}`;

    const message = `Your password reset url is as follow \n\n ${resetUrl} \n\n If you have not requested this email, then ingnore it.`;

    try {
        sendEmail({
            email: user.email,
            subject: "Karan Password recovery",
            message
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
})