const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync")
//custom Error Handler
const ExpressError = require('../utils/ExpressError')
//access to our Mentor user model
const User = require('../models/user');
//access to Review model
const Review = require('../models/review');
const restricted = require('../controllers/restricted')
const { validateMentor, validateReview, loggedIn } = require('../middleware.js')

router.get('/restricted/:id', loggedIn, catchAsync(restricted.restrictedUserProfile))

router.put('/restricted/:id', loggedIn, validateMentor, catchAsync(restricted.updateUserProfile))

router.delete('/restricted/:id', loggedIn, catchAsync(restricted.deleteUser))

router.get('/dashboard/:id', loggedIn, catchAsync(restricted.mentorDashboard))

module.exports = router