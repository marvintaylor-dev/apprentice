if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

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
//access to our User model
const User = require('./models/user');
//access to Review model
const Review = require('./models/review');
//custom Error Handler
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
const port = process.env.PORT || 3000;


//messaging
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const formatMessage = require('./public/javascripts/messages.js')
const botname = 'Chat Bot'
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./public/javascripts/users')

//connect to passport
const passport = require('passport')
const LocalStrategy = require('passport-local')

//Route connections to access webpages
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
app.use(express.static(path.join(__dirname, 'views')));
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
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error');
    next()
})


//authenticate method comes from passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()))
//methods to store or unstore our user session. Also comes from passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// ---------- MESSAGING VIA SOCKET.IO ---------

//socket.broadcast.emit = notifies everyone except the user
//socket.emit = only notifies the user
//io.emit = notifies everyone

//run when the client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // welcome current user
        socket.emit('message', formatMessage(botname, 'Welcome to Apprentice Chat!'));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit('message', formatMessage(botname, `${user.username} has joined the chat`));

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io
            .to(user.room)
            .emit('message', formatMessage(user.username, msg));
    })

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room)
                .emit('message', formatMessage(botname, `${user.username} has left the chat`));

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });

})




//-------------------WEB PAGES------------------//

//home page
app.get('/', (req, res) => {
    res.render('home')
})

app.use('/', userRoutes)
app.use('/', exploreRoutes)
app.use('/', restrictedRoutes)

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


server.listen(port, () => {
    console.log(`App is listening on Port ${port}!`)
})



