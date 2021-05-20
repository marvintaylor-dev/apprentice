const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync")
const explore = require('../controllers/explore')
const { validateMentor, validateReview, loggedIn, isAuthor } = require('../middleware.js')



router.get('/explore', validateReview, catchAsync(explore.showExplore)) //render explore page

router.get('/list', catchAsync(explore.userList)) //view list of users registered as mentors

router.get('/explore/:id', catchAsync(explore.viewMentorProfile)) //render individual mentor page

router.post('/explore/:id/reviews', loggedIn, catchAsync(explore.createReview)) //create a review for a mentor

router.delete('/explore/:id/reviews/:reviewId', isAuthor, loggedIn, catchAsync(explore.deleteReview)) //delete your review of a mentor

router.post('/explore/:id/mentor', loggedIn, catchAsync(explore.requestMentorship)) //add to mentee array

router.get('/messages', loggedIn, catchAsync(explore.messageMentor)) // message mentor from the show page

module.exports = router;