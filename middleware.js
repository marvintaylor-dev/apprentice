const { userSchema, reviewSchema } = require('./schemas.js')
//access to our Mentor user model
const User = require('./models/user');
//access to Review model
const Review = require('./models/review');
//custom Error Handler
const ExpressError = require('./utils/ExpressError');
const review = require('./models/review');

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
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in');
        return res.redirect('/login')
    }
    next()
}

module.exports.isAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/explore/${id}`)
    }
    next();
}


/*
My solution to isAuthor - because I didn't understand req.params and what was available on the request object
const { id } = req.params
const username = req.session.passport.user
const users = await User.findOne({ 'username': username })
const reviews = await Review.find({})
for (let review of reviews) {
    if (!users._id.equals(review.author)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/explore/${id}`)
    }
} */