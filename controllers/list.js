//access to our Mentor user model
const User = require('../models/user');
//access to Review model
const Review = require('../models/review');


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