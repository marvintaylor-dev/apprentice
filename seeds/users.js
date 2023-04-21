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
const faker = require('faker')


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
    for (let i = 0; i < 50; i++) {
        const first = faker.name.firstName();
        const last = faker.name.lastName();
        const random100 = Math.floor(Math.random() * 100);
        const random1000 = Math.floor(Math.random() * 1000);
        const salary = Math.floor(Math.random() * 200000) + 1000;
        const email = faker.internet.email(first, last);
        const password = 'elf';
        try {
            const user = new User({
                job_title: faker.name.jobTitle(),
                name: {
                    first: first,
                    last: last
                },
                email: email,
                username: `${first}${random100}`,
                password: password,
                age: random100,
                tier: sample(['1', '2', '3']),
                salary: salary,
                location: {
                    city: locations[random1000].city,
                    state: locations[random1000].state,
                    zip: locations[random1000].rank
                },
                geometry: {
                    type: "Point",
                    coordinates: [
                        locations[random100].longitude,
                        locations[random1000].latitude,
                    ]
                },
                job_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor omnis, quas perspiciatis ipsum unde corrupti optio, praesentium ducimus error ullam iste. Rem a illo facilis veritatis aliquid fugiat ut molestiae. Quae sint laboriosam nulla neque excepturi assumenda possimus?',
                education_required: sample(['High School Diploma', 'College Degree', 'Post Graduate Degree', 'Certificate', 'Skills']),
                field_of_study: sample(fields),
                path: sample(['Mentor', 'Mentee']),
                profile_pic: {
                    url: String,
                    filename: String
                }
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