
const Mentor = require("../models/mentor");
const User = require("../models/user");


//login page
module.exports.loginPage = (req, res) => {
    res.render('users/login')
}

/* module.exports.userLogin = async (req, res) => {
    const { username, em }
}
 */
//choose a path page
module.exports.selectPath = (req, res) => {
    res.render('users/signup')
}

//mentee sign up page
module.exports.menteeSignup = (req, res) => {
    res.render('users/mentee')
}

//mentor sign up page
module.exports.mentorSignup = (req, res) => {
    res.render('users/mentor')
}

//create a new mentor
module.exports.createMentor = async (req, res) => {
    const newMentor = new Mentor(req.body);
    await newMentor.save()
    console.log(req.body)
    req.flash('success', 'Successfully created Mentor')
    return res.redirect('/list')
}
