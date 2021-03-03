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
const Mentor = require('./models/user')


//connects Mongoose to Mongo database
mongoose.connect('mongodb://localhost:27017/apprentice', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
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

app.engine('ejs', engine);

app.set('view engine', 'ejs');
//route to views folder
app.set('views', path.join(__dirname, 'views'));
//allows me to parse information from the body of the POST request
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('users/login')
})

app.get('/signup', (req, res) => {
    res.render('users/signup')
})

app.get('/mentee', (req, res) => {
    res.render('users/mentee')
})

app.get('/mentor', (req, res) => {
    res.render('users/mentor')
})

app.get('/faq', (req, res) => {
    res.render('explore/faq')
})

app.get('/explore', (req, res) => {
    res.render('explore/explore')
})

app.get('/list', async (req, res) => {
    const mentors = await Mentor.find({})
    res.render('explore/list', { mentors })
})


app.get('/explore/:id', async (req, res) => {
    const { id } = req.params
    const mentor = await Mentor.findById(id);
    res.render('explore/show', { mentor })
})

app.get('/tiers', (req, res) => {
    res.render('explore/tiers')
})

app.post('/tiers', (req, res) => {
    console.log(req.body)
    res.send('new mentor')
})

app.listen(3000, () => {
    console.log("App is listening on Port 3000!")
})



