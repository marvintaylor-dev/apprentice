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
const explore = require('../controllers/explore')
const { validateMentor, validateReview, loggedIn } = require('../middleware.js')



router.get('/', validateReview, catchAsync(explore.showExplore))

router.get('/:id', catchAsync(explore.viewMentorProfile))

router.post('/:id/reviews', loggedIn, catchAsync(explore.createReview))

router.delete('/:id/reviews/:reviewId', loggedIn, catchAsync(explore.deleteReview))


module.exports = router;