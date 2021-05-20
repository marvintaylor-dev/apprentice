//access to our Mentor user model
const User = require('../models/user');
//access to Review model
const Review = require('../models/review');
const fields = ['Psychology', 'Engineering', 'Biology', 'Physics', 'Arts', 'Trades', 'Content-Creation', 'Business'];
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

//show the explore page
module.exports.showExplore = async (req, res) => {
    const users = await User.find({})
    res.render('explore/explore', { fields, users })
}

//show the list of mentors
module.exports.userList = async (req, res) => {
    const { field_of_study } = req.query
    if (field_of_study) {
        const users = await User.find({ field_of_study })
        return res.render('explore/list', { users, field_of_study })
    } else {
        const users = await User.find({})
        return res.render('explore/list', { users, field_of_study })
    }
}

//create a new review
module.exports.createReview = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id);
    const review = new Review(req.body.review)
    review.author = req.user._id
    user.reviews.push(review)
    await review.save();
    await user.save();
    req.flash('success', 'Successfully left a review!')
    return res.redirect(`/explore/${user._id}`);
}

//delete a review
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await User.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted the review!')
    res.redirect(`/explore/${id}`)
}

//show detailed mentor profile view
module.exports.viewMentorProfile = async (req, res) => {
    const { id } = req.params
    const idArray = [];
    const reviews = await Review.find({})
    const users = await User.find({})
    for (let user of users) {
        idArray.push(user.id)
    }
    const user = await User.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    });
    if (!user) {
        req.flash('error', 'Cannot find that mentor');
        return res.redirect('/list')
    }
    res.render('explore/show', { user, idArray, reviews })
}


// Request Mentorship
module.exports.requestMentorship = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id);
    user.mentees.push(req.user)
    await user.save();
    req.flash('success', `Successfully became ${user.username.toUpperCase()}'s newest MENTEE!`)
    return res.redirect(`/explore/${user._id}`);
}

module.exports.messageMentor = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    return res.render('explore/messages', { user })
}