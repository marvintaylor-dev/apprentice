const mongoose = require('mongoose');
const User = require('../models/user');
const Schema = mongoose.Schema;
const Review = require('../models/review');
const { first, last } = require('./names');
const { jobs } = require('./title');
const locations = require('./location');
const fields = ['Psychology', 'Engineering', 'Biology', 'Physics', 'Arts', 'Trades', 'Content-Creation', 'Business'];
const passport = require('passport');
const Joi = require('joi');


//connects Mongoose to Mongo database
mongoose.connect('mongodb://localhost:27017/apprentice', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async (req, res) => {
    await User.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random10 = Math.floor(Math.random() * 10);
        const random100 = Math.floor(Math.random() * 100);
        const random1000 = Math.floor(Math.random() * 1000);
        const salary = Math.floor(Math.random() * 200000) + 1000;
        const email = `${sample(first.splice(0, 2))}${random100}@gmail.com`
        const password = 'elf';
        try {
            const user = new User({
                job_title: sample(jobs),
                name: {
                    first: sample(first),
                    last: sample(last)
                },
                email: email,
                username: `${sample(last)}${random100}`,
                password: password,
                age: random100,
                tier: sample(['1', '2', '3']),
                salary: salary,
                location: {
                    city: locations[random1000].city,
                    state: locations[random1000].state,
                    zip: locations[random1000].rank
                },
                job_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis, quas perspiciatis ipsum unde corrupti optio, praesentium ducimus error ullam iste. Rem a illo facilis veritatis aliquid fugiat ut molestiae. Quae sint laboriosam nulla neque excepturi assumenda possimus?',
                education_required: sample(['High School Diploma', 'College Degree', 'Post Graduate Degree', 'Certificate', 'Skills']),
                field_of_study: sample(fields),
                path: sample(['Mentor', 'Mentee'])
            })
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, err => {
                if (err) return nextTick(err);
                console.log(user)
            })
            await user.save();
        } catch (e) {
            console.log(e.message);
        }
    }
}




seedDB().then(() => {
    mongoose.connection.close();
})