const User = require("../models/user");
const passport = require("passport");
const io = require("socket.io");

//login page
module.exports.loginPage = (req, res) => {
  res.render("users/login");
};

//login authentication
module.exports.userLogin = async (req, res) => {
  req.flash("success", "welcome back!");
  const redirectUrl = req.session.returnTo || "/explore";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logoutPage = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/login");
};

//User sign up page
module.exports.userSignup = (req, res) => {
  res.render("users/signup");
};

//choose a path page
module.exports.selectPath = (req, res) => {
  res.render("users/path");
};
//create a new user
module.exports.createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return nextTick(err);
      req.flash("success", "Successfully created User!");
      console.log(user);
      return res.redirect("/path");
    });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("signup");
  }
};
