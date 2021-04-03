const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync")
//custom Error Handler
const ExpressError = require('../utils/ExpressError')
//access to our Mentor user model
const Mentor = require('../models/mentor');
//access to our Mentee user model
const User = require('../models/user')
//access to Review model
const Review = require('../models/review');
const user = require('../controllers/user')
const { validateMentor, validateReview } = require('../middleware.js')


router.get('/login', user.loginPage)
/* router.post('/login/:id', user.userLogin) */
router.get('/signup', user.selectPath)
router.get('/mentee/new', user.menteeSignup)
router.get('/mentor/new', user.mentorSignup)
router.post('/mentor/new', user.createMentor)

module.exports = router