const express = require('express');
const app = express();
//allows you to connect views to directories within views
const path = require('path');
//allows us to use inline javascript
const engine = require('ejs-mate');
//provides syntax to pass information into our Mongo database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./models/user');
const Mentor = require('./models/user');
const methodOverride = require('method-override');
const tiers = ['1', '2', '3'];
const fields = ['Psychology', 'Engineering', 'Biology', 'Physics', 'Arts', 'Trades', 'Content-Creation', 'Business'];
const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming']

const blah = "blah"

//connects Mongoose to Mongo database
mongoose.connect('mongodb://localhost:27017/apprentice', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log('OH NO, MONGO CONNECTION ERROR!!')
        console.log(err)
    })

//confirm database connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



//route to public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
//allows you to use ?method_ to turn POST requests into PUT / PATCH requests
app.use(methodOverride('_method'))

app.engine('ejs', engine);

app.set('view engine', 'ejs');
//route to views folder
app.set('views', path.join(__dirname, 'views'));
//allows me to parse information from the body of the POST request
app.use(express.urlencoded({ extended: true }))

//home page
app.get('/', (req, res) => {
    res.render('home')
})

//login page
app.get('/login', (req, res) => {
    res.render('users/login')
})

//choose a path page
app.get('/signup', (req, res) => {
    res.render('users/signup')
})

//mentee sign up page
app.get('/mentee/new', (req, res) => {
    res.render('users/mentee')
})

//mentor sign up page
app.get('/mentor/new', (req, res) => {
    res.render('users/mentor', { fields, states })
})

//create a new mentor
app.post('/list', async (req, res) => {
    const newMentor = new Mentor(req.body);
    await newMentor.save()
    console.log(req.body)
    return res.redirect('/list')
})

//mentee vs mentor page
app.get('/faq', (req, res) => {
    res.render('explore/faq')
})

//show the list of academic subjects
app.get('/explore', async (req, res) => {
    const mentors = await Mentor.find({})
    res.render('explore/explore', { fields, mentors })
})

//show the list of mentors
app.get('/list', async (req, res) => {
    const { field } = req.query
    if (field) {
        const mentors = await Mentor.find({ field })
        return res.render('explore/list', { mentors })
    } else {
        const mentors = await Mentor.find({})
        return res.render('explore/list', { mentors })
    }
})


//Mentor page from Mentee point of view
app.get('/explore/:id', async (req, res) => {
    const { id } = req.params
    const mentor = await Mentor.findById(id);
    res.render('explore/show', { mentor })
})

//need access to profile in order to edit information

//tiers page explaining what tiers are 
app.get('/tiers', (req, res) => {
    res.render('explore/tiers')
})

app.get('/restricted/:id', async (req, res) => {
    const { id } = req.params
    const mentor = await Mentor.findById(id);
    return res.render('restricted/profile', { mentor, fields, states, tiers })
})

app.put('/restricted/:id', async (req, res) => {
    const { id } = req.params
    const edited = await Mentor.findByIdAndUpdate(id, req.body,
        { runValidators: true, new: true })
    return res.redirect('/list')
})

app.delete('/restricted/:id', async (req, res) => {
    const { id } = req.params
    const userDeleted = await Mentor.findByIdAndDelete(id)
    return res.redirect('/list')
})

app.listen(3000, () => {
    console.log("App is listening on Port 3000!")
})



