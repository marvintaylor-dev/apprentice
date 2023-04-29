const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const restricted = require("../controllers/restricted");
const {
  isAuthor,
  validateMentor,
  validateReview,
  loggedIn,
  isAuthorized,
} = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const User = require("../models/user");

router
  .route("/restricted/:id")
  .get(loggedIn, isAuthorized, catchAsync(restricted.restrictedUserProfile)) //view user profile sensitive information
  .put(
    loggedIn,
    upload.single("avatar"),
    validateMentor,
    isAuthorized,
    catchAsync(restricted.updateUserProfile)
  ) //update user profile information
  .delete(loggedIn, isAuthorized, catchAsync(restricted.deleteUser)); //delete user profile information

router.put(
  "/user/:id",
  loggedIn,
  isAuthorized,
  catchAsync(restricted.updatePath)
);

router.get(
  "/dashboard/:id",
  loggedIn,
  isAuthorized,
  catchAsync(restricted.mentorDashboard)
); //view mentor dashboard

router.post(
  "/dashboard/:id/notes",
  loggedIn,
  isAuthorized,
  catchAsync(restricted.mentorDashboardCreateNote)
); //create a note

/* router.get('/dashboard/:id/edit/:noteId', loggedIn, isAuthorized, catchAsync(restricted.mentorDashboard)) */
router.post(
  "/dashboard/:id/edit/:noteId",
  loggedIn,
  isAuthorized,
  catchAsync(restricted.updateNote)
); //update note

router.delete(
  "/dashboard/:id/notes/:noteId",
  loggedIn,
  catchAsync(restricted.mentorDashboardDeleteNote)
);

router.get("/chat", loggedIn, restricted.getChat);

router.get(
  "/messages?room=:id",
  loggedIn,
  validateMentor,
  catchAsync(restricted.getMessages)
);

router.put(
  "/dashboard/:id",
  loggedIn,
  isAuthorized,
  catchAsync(restricted.deleteMentee)
);

module.exports = router;
