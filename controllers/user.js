
const User = require("../models/user");


//login page
module.exports.loginPage = (req, res) => {
    res.render('users/login')
}

/* module.exports.userLogin = async (req, res) => {
    const { username, em }
}
 */

//User sign up page
module.exports.userSignup = (req, res) => {
    res.render('users/signup')
}


//choose a path page
module.exports.selectPath = (req, res) => {
    res.render('users/path')
}
//create a new mentor
module.exports.createUser = async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save()
    console.log(req.body)
    req.flash('success', 'Successfully created User!')
    return res.redirect('/path')
}


//mentee sign up page
/* module.exports.menteeSignup = (req, res) => {
    res.render('users/mentee')
} */

