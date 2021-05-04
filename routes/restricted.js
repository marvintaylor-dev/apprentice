const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync")
const restricted = require('../controllers/restricted')
const { validateMentor, validateReview, loggedIn } = require('../middleware.js')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

const User = require('../models/user')

router.route('/restricted/:id')
    .get(loggedIn, catchAsync(restricted.restrictedUserProfile)) //view user profile sensitive information
    .put(loggedIn, upload.single('avatar'), validateMentor, catchAsync(restricted.updateUserProfile))  //update user profile information
    .delete(loggedIn, catchAsync(restricted.deleteUser))  //delete user profile information

router.get('/dashboard/:id', loggedIn, catchAsync(restricted.mentorDashboard)) //view mentor dashboard

router.get('/chat', loggedIn, restricted.getChat);

router.get('/messages/:id', loggedIn, catchAsync(restricted.getMessages));

router.put('/dashboard/:id', loggedIn, catchAsync(restricted.deleteMentee));

module.exports = router