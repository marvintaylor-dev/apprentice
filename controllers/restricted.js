
//access to our Mentor user model
const User = require('../models/user');
//access to Review model
const Review = require('../models/review');
const { cloudinary } = require('../cloudinary');
const paths = ['Mentor', 'Mentee'];
const tiers = ['1', '2', '3'];
const fields = ['Psychology', 'Engineering', 'Biology', 'Physics', 'Arts', 'Trades', 'Content-Creation', 'Business'];
const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming']


//Mentor profile access - should be restricted by permissions
module.exports.restrictedUserProfile = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id);
    return res.render('restricted/profile', { user, fields, states, tiers, paths })
}

//Update and edit mentor additional profile information
module.exports.updateUserProfile = async (req, res, next) => {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, { ...req.body });
    try {
        user.avatar = ({ url: req.file.path, filename: req.file.filename })
        await user.save();
        if (req.body.deleteImage) {
            await cloudinary.uploader.destroy(user.avatar.filename);
            await user.updateOne({ $unset: { avatar: { filename: req.body.deleteImage } } })
        }
        req.flash('success', 'Successfully updated your profile!')
        return res.redirect('/list')
    } catch (e) {
        if (req.body.deleteImage) {
            await cloudinary.uploader.destroy(user.avatar.filename);
            await user.updateOne({ $unset: { avatar: { filename: req.body.deleteImage } } })
        }
        req.flash('success', 'Successfully updated your profile!')
        return res.redirect('/list')
    }
}


//deletion of a mentor
module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Mentor profile')
    return res.redirect('/list')
}

module.exports.mentorDashboard = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id);
    return res.render('restricted/dashboard', { user })
}


