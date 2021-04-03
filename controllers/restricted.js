
//access to our Mentor user model
const Mentor = require('../models/mentor');
//access to Review model
const Review = require('../models/review');
const tiers = ['1', '2', '3'];
const fields = ['Psychology', 'Engineering', 'Biology', 'Physics', 'Arts', 'Trades', 'Content-Creation', 'Business'];
const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming']


//Mentor profile access - should be restricted by permissions
module.exports.restrictedMentorProfile = async (req, res) => {
    const { id } = req.params
    const mentor = await Mentor.findById(id);
    return res.render('restricted/profile', { mentor, fields, states, tiers })
}

//Update and edit mentor additional profile information
module.exports.updateMentorProfile = async (req, res) => {
    const { id } = req.params
    const edited = await Mentor.findByIdAndUpdate(id, req.body,
        { runValidators: true, new: true })
    req.flash('success', 'Successfully updated your profile!')
    return res.redirect('/list')
}

//deletion of a mentor
module.exports.deleteMentor = async (req, res) => {
    const { id } = req.params
    const userDeleted = await Mentor.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted Mentor profile')
    return res.redirect('/list')
}

