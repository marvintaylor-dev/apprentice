//access to our Mentor user model
const User = require('../models/user');
//access to Review model
const Review = require('../models/review');
const fields = ['Psychology', 'Engineering', 'Biology', 'Physics', 'Arts', 'Trades', 'Content-Creation', 'Business'];


//show the list of all mentors
module.exports.showExplore = async (req, res) => {
    const users = await User.find({})
    res.render('explore/explore', { fields, users })
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

module.exports.viewMentorProfile = async (req, res) => {
    const { id } = req.params
    const reviews = await Review.find({})
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
    res.render('explore/show', { user, reviews })
}

