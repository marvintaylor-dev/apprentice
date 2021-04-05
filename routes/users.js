const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync")
//custom Error Handler
const ExpressError = require('../utils/ExpressError')
//access to our User model
const User = require('../models/user');
const user = require('../controllers/user')
const { validateMentor, validateReview } = require('../middleware.js')
const passport = require('passport')


router.get('/login', user.loginPage)
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.userLogin)
router.get('/signup', user.userSignup)
router.get('/path', user.selectPath)
router.post('/path', validateMentor, catchAsync(user.createUser))



module.exports = router