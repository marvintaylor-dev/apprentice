
//access to our Mentor user model
const User = require('../models/user');
//access to Review model
const Review = require('../models/review');
const Note = require('../models/notes');
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
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const user = require('../models/user');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })



//Mentor profile access - should be restricted by permissions
module.exports.restrictedUserProfile = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id);
    return res.render('restricted/profile', { user, fields, states, tiers, paths })
}

//Update and edit mentor additional profile information
module.exports.updateUserProfile = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: `${req.body.location.city},${req.body.location.state}`,
        limit: 1
    }).send()
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, { ...req.body });
    user.geometry = geoData.body.features[0].geometry;
    await user.save();
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
    const user = await User.findById(id).populate({
        path: 'notes',
        populate: {
            path: 'author'
        },
        path: 'reviews',
        populate: {
            path: 'author'
        }
    });
    if (!user) {
        req.flash('error', 'Cannot find that mentor');
        return res.redirect('/list')
    }

    const mentees = await User.findById(user.mentees);
    const notes = await Note.find({})

    return res.render('restricted/dashboard', { user, id, mentees, notes })
}


module.exports.updateNote = async (req, res) => {
    const { id, noteId } = req.params

    const user = await User.findById(id).populate({
        path: 'notes',
        populate: {
            path: 'author'
        }
    });

    const updatedNote = await Note.findByIdAndUpdate(noteId, req.body.note, function (err, docs) {
        if (err) {
            req.flash('error', 'Could not update your note.')
            res.redirect(`/dashboard/${user._id}`)
        }
        else {
            console.log('Successful update');
        }
    });
    await updatedNote.save()
    await user.save()
    req.flash('Success', 'Your note has been updated.')
    return res.redirect(`/dashboard/${user._id}`)
}

module.exports.mentorDashboardCreateNote = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id);
    const note = new Note(req.body.note);
    note.author = req.user._id;
    user.notes.push(note);
    await note.save();
    await user.save();
    req.flash('success', 'Successfully posted a note!')
    return res.redirect(`/dashboard/${user._id}`)
}

module.exports.mentorDashboardDeleteNote = async (req, res) => {
    const { id, noteId } = req.params;
    await User.findByIdAndUpdate(id, { $pull: { notes: noteId } });
    await Note.findByIdAndDelete(noteId);
    req.flash('success', 'Successfully deleted the note!')
    res.redirect(`/dashboard/${id}`)
}

module.exports.deleteMentee = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id);
    const index = user.mentees.indexOf(req.body.deleteMentee)
    if (req.body.deleteMentee) {
        user.mentees.splice(index, 1)
        req.flash('success', `Removed mentee.`)
    }
    await user.save();
    return res.redirect(`/dashboard/${user._id}`);
}

module.exports.getChat = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id);
    return res.render('restricted/chat', { user })
}

module.exports.getMessages = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    return res.render('restricted/messages', { user })
}

