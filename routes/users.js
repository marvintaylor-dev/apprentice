const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync")
//custom Error Handler
const ExpressError = require('../utils/ExpressError')
//access to our User model
const User = require('../models/user');
//access to Review model
const Review = require('../models/review');
const user = require('../controllers/user')
const { validateMentor, validateReview } = require('../middleware.js')


router.get('/login', user.loginPage)
/* router.post('/login/:id', user.userLogin) */
router.get('/signup', user.userSignup)
router.get('/path', user.selectPath)
router.post('/path', validateMentor, catchAsync(user.createUser))



module.exports = router