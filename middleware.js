const { userSchema, reviewSchema } = require('./schemas.js')
//access to our Mentor user model
const User = require('./models/user');
//access to Review model
const Review = require('./models/review');
//custom Error Handler
const ExpressError = require('./utils/ExpressError')

module.exports.validateMentor = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.loggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in');
        return res.redirect('/login')
    }
    next()
}