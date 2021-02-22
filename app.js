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

app.get('/makeuser', async (req, res) => {
    const newUser = new User({
        name: {
            first: 'Dude',
            last: 'Love'
        },
        email: 'duuuude@mail.com',
        username: 'thegeneral',
        password: 'bootydude',
        age: 59,
        occupation: 'hobo',
        interest: 'WWF',
        starting: 3,
        location: {
            city: 'Hoboken',
            state: 'NJ',
            zipcode: 56721
        }
    })
    await newUser.save()
    res.send(newUser)
})


//route to public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.engine('ejs', engine);

app.set('view engine', 'ejs');
//route to views folder
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('users/login')
})

app.get('/signup', (req, res) => {
    res.render('users/signup')
})

app.post('/signup/:id', (req, res) => {
    res.send('Hello')
})

app.get('/faq', (req, res) => {
    res.render('users/faq')
})

app.listen(3000, () => {
    console.log("App is listening on Port 3000!")
})



//fake user template
/* const newUser = new User({
        name: {
            first: 'Marvin',
            last: 'Taylor'
        },
        email: 'marvin@mailcom',
        username: 'mrfunky',
        password: 'cake',
        age: 32,
        occupation: 'bum',
        interest: 'Web Dev',
        starting: 3,
        location: {
            city: 'Las Vegas',
            state: 'NV',
            zipcode: 89108
        }
    }) */