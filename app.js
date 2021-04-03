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
const Mentor = require('./models/mentor');
//access to Review model
const Review = require('./models/review');
//custom Error Handler
const User = require('./models/user')
const ExpressError = require('./utils/ExpressError')
//allows us to use PUT and DELETE requests 
const methodOverride = require('method-override');
const Joi = require('joi');
//allows us to parse cookies
const cookieParser = require('cookie-parser')
//allows us to use sessions
const session = require('express-session')
//flashes a message before redirecting
const flash = require('connect-flash')

//connect to passport
const passport = require('passport')
const LocalStrategy = require('passport-local')

//Route connections to access webpages
const listRoutes = require('./routes/list')
const exploreRoutes = require('./routes/explore')
const restrictedRoutes = require('./routes/restricted')
const userRoutes = require('./routes/users');



//-----------MONGO / MONGOOSE DB CONNECTION-------------

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


//--------------------MIDDLEWARE--------------------//


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
app.use(express.urlencoded({ extended: true }));
//allows use of 'dev' version of morgan. 
//app.use(morgan('dev'))
//use cookie parser on every request
app.use(cookieParser());
//connect flash
app.use(flash());

const sessionConfig = {
    secret: 'badsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 3600000 * 24 * 7,
        maxAge: 3600000 * 24 * 7
    }
}

app.use(session(sessionConfig))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error');
    next()
})

//authenticate method comes from passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()))
//methods to store or unstore our user session. Also comes from passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//-------------------WEB PAGES------------------//

//home page
app.get('/', (req, res) => {
    res.render('home')
})

app.use('/', userRoutes)
app.use('/list', listRoutes)
app.use('/explore', exploreRoutes)
app.use('/restricted/:id', restrictedRoutes)

//mentee vs mentor page
app.get('/faq', (req, res) => {
    res.render('explore/faq')
})
//tiers page explaining what tiers are 
app.get('/tiers', (req, res) => {
    res.render('explore/tiers')
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!'
    res.status(statusCode).render('error', { err });
})

//---------------------LOCAL CONNECTION-----------------


app.listen(3000, () => {
    console.log("App is listening on Port 3000!")
})



