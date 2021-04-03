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
const list = require('../controllers/list')
const { validateMentor, validateReview } = require('../middleware.js')

router.post('/', validateMentor, catchAsync(list.createMentor))

router.get('/', catchAsync(list.mentorList))

module.exports = router;