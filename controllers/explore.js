//access to our Mentor user model
const Mentor = require('../models/mentor');
//access to Review model
const Review = require('../models/review');
const fields = ['Psychology', 'Engineering', 'Biology', 'Physics', 'Arts', 'Trades', 'Content-Creation', 'Business'];

//show the list of all mentors
module.exports.showExplore = async (req, res) => {
    const mentors = await Mentor.find({})
    res.render('explore/explore', { fields, mentors })
}

//create a new review
module.exports.createReview = async (req, res) => {
    const { id } = req.params
    const mentor = await Mentor.findById(id);
    const review = new Review(req.body.review)
    mentor.reviews.push(review)
    await review.save();
    await mentor.save();
    req.flash('success', 'Successfully left a review!')
    return res.redirect(`/explore/${mentor._id}`);
}

//delete a review
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Mentor.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted the review!')
    res.redirect(`/explore/${id}`)
}

module.exports.viewMentorProfile = async (req, res) => {
    const { id } = req.params
    const reviews = await Review.find({})
    const mentor = await Mentor.findById(id).populate('reviews');
    res.render('explore/show', { mentor, reviews })
}

