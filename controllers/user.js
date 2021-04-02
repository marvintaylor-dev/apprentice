
const fields = ['Psychology', 'Engineering', 'Biology', 'Physics', 'Arts', 'Trades', 'Content-Creation', 'Business'];
const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming']



//login page
module.exports.loginPage = (req, res) => {
    res.render('users/login')
}

//choose a path page
module.exports.selectPath = (req, res) => {
    res.render('users/signup')
}

//mentee sign up page
module.exports.menteeSignup = (req, res) => {
    res.render('users/mentee')
}

//mentor sign up page
module.exports.mentorSignup = (req, res) => {
    res.render('users/mentor', { fields, states })
}