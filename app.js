//connection to express.js
const express = require('express');
const app = express();
//allows you to connect views to directories within views
const path = require('path');
//allows us to use inline javascript
const engine = require('ejs-mate');
//provides syntax to pass information into our Mongo database
const mongoose = require('mongoose');
//provides a log for activity such as log in.
const morgan = require('morgan')

//access to our Mentor user model
const Mentor = require('./models/user');

//allows us to use PUT and DELETE requests 
const methodOverride = require('method-override');

//form information in the 'select' categories.
const tiers = ['1', '2', '3'];
const fields = ['Psychology', 'Engineering', 'Biology', 'Physics', 'Arts', 'Trades', 'Content-Creation', 'Business'];
const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming']


//-----------MONGO / MONGOOSE DB CONNECTION-------------


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


//--------------------MIDDLEWARE--------------------


//Tells express to serve static files and parse the body as JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
//allows you to use ?method_ to turn POST requests into PUT / PATCH requests
app.use(methodOverride('_method'))
//allows us to use the ejs engine and syntax with .ejs files
app.engine('ejs', engine);

app.set('view engine', 'ejs');
//route to views folder
app.set('views', path.join(__dirname, 'views'));
//allows me to parse information from the body of the POST request
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))



//-------------------WEB PAGES-----------------


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
    const { field_of_study } = req.query
    if (field_of_study) {
        const mentors = await Mentor.find({ field_of_study })
        return res.render('explore/list', { mentors, field_of_study })
    } else {
        const mentors = await Mentor.find({})
        return res.render('explore/list', { mentors, field_of_study })
    }
})


//Mentor page from Mentee point of view
app.get('/explore/:id', async (req, res) => {
    const { id } = req.params
    const mentor = await Mentor.findById(id);
    res.render('explore/show', { mentor })
})

//tiers page explaining what tiers are 
app.get('/tiers', (req, res) => {
    res.render('explore/tiers')
})

//Mentor profile access - should be restricted by permissions
app.get('/restricted/:id', async (req, res) => {
    const { id } = req.params
    const mentor = await Mentor.findById(id);
    return res.render('restricted/profile', { mentor, fields, states, tiers })
})

//mentor additional profile information
app.put('/restricted/:id', async (req, res) => {
    const { id } = req.params
    const edited = await Mentor.findByIdAndUpdate(id, req.body,
        { runValidators: true, new: true })
    return res.redirect('/list')
})

//deletion of a mentor
app.delete('/restricted/:id', async (req, res) => {
    const { id } = req.params
    const userDeleted = await Mentor.findByIdAndDelete(id)
    return res.redirect('/list')
})

app.use((req, res) => {
    res.status(404)
    res.send('Not Found')
})


//---------------------LOCAL CONNECTION-----------------


app.listen(3000, () => {
    console.log("App is listening on Port 3000!")
})



