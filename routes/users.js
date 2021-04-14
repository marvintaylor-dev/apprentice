const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync")
const user = require('../controllers/user')
const { validateMentor, validateReview, loggedIn } = require('../middleware.js')
const passport = require('passport')


router.route('/login')
    .get(user.loginPage) //rendered login form
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.userLogin)  //perform login
router.get('/logout', user.logoutPage) //logout
router.get('/signup', user.userSignup) //view registration or signup page

router.route('/path')
    .get(user.selectPath) //render path page
    .post(validateMentor, catchAsync(user.createUser)) //create a new user





module.exports = router