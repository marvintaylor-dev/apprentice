const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync")
//custom Error Handler
const ExpressError = require('../utils/ExpressError')
//access to our Mentor user model
const Mentor = require('../models/mentor');
//access to Review model
const Review = require('../models/review');
const restricted = require('../controllers/restricted')
const { validateMentor, validateReview } = require('../middleware.js')

router.get('/', catchAsync(restricted.restrictedMentorProfile))

router.put('/', validateMentor, catchAsync(restricted.updateMentorProfile))

router.delete('/', catchAsync(restricted.deleteMentor))

module.exports = router