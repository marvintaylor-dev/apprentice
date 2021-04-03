//access to our Mentor user model
const Mentor = require('../models/mentor');
//access to Review model
const Review = require('../models/review');

//create a new mentor
module.exports.createMentor = async (req, res) => {
    const newMentor = new Mentor(req.body);
    await newMentor.save()
    console.log(req.body)
    req.flash('success', 'Successfully created Mentor Profile')
    return res.redirect('/list')
}

//show the list of mentors
module.exports.mentorList = async (req, res) => {
    const { field_of_study } = req.query
    if (field_of_study) {
        const mentors = await Mentor.find({ field_of_study })
        return res.render('explore/list', { mentors, field_of_study })
    } else {
        const mentors = await Mentor.find({})
        return res.render('explore/list', { mentors, field_of_study })
    }
}