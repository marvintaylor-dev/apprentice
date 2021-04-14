const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync")
const restricted = require('../controllers/restricted')
const { validateMentor, validateReview, loggedIn } = require('../middleware.js')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


router.route('/restricted/:id')
    .get(loggedIn, catchAsync(restricted.restrictedUserProfile)) //view user profile sensitive information
    .put(upload.single('profile_pic'), loggedIn, validateMentor, catchAsync(restricted.updateUserProfile))  //update user profile information
    .delete(loggedIn, catchAsync(restricted.deleteUser))  //delete user profile information


router.get('/dashboard/:id', loggedIn, catchAsync(restricted.mentorDashboard)) //view mentor dashboard

module.exports = router