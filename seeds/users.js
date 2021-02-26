const mongoose = require('mongoose');
const User = require('../models/user');
const Mentor = require('../models/user')

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



const newMentees = [
    {
        name: {
            first: 'Buddy',
            last: 'Love'
        },
        email: 'duuuude@mail.com',
        username: 'thegeneral',
        password: 'thatGuy',
        age: '59',
        occupation: 'hobo',
        interest: 'WWF',
        starting: 1,
        location: {
            city: 'Hoboken',
            state: 'NJ',
            zipcode: 56721
        }
    },
    {
        name: {
            first: 'Canary',
            last: 'Ranchero'
        },
        email: 'bird@mail.com',
        username: 'Tweetr',
        password: 'chirp',
        age: '19',
        occupation: 'flight attendant',
        interest: 'flying',
        starting: 3,
        location: {
            city: 'lincoln',
            state: 'NE',
            zipcode: 15721
        }
    },
    {
        name: {
            first: 'John',
            last: 'Smith'
        },
        email: 'plain@mail.com',
        username: 'Imnormal',
        password: 'boring',
        age: '35',
        occupation: 'accountant',
        interest: 'counting',
        starting: 1,
        location: {
            city: 'Manhattan',
            state: 'NY',
            zipcode: 87201
        }
    }
]

const newMentors = [
    {
        job_title: 'Animator',
        name: {
            first: 'Gandolf',
            last: 'TheGray'
        },
        salary: '45,000',
        job_description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas fuga, perspiciatis consequuntur officiis ea quis saepe exercitationem similique esse cumque impedit, aspernatur sint excepturi? Quibusdam mollitia eius sed.',
        education_required: 'High School Diploma',
        field_of_study: 'Art'
    },
    {
        job_title: 'Business Owner',
        name: {
            first: 'Ebenezer',
            last: 'Scrooge'
        },
        salary: '207,000',
        job_description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas fuga, perspiciatis consequuntur officiis ea quis saepe exercitationem similique esse cumque impedit, aspernatur sint excepturi? Quibusdam mollitia eius sed.',
        education_required: 'High School Diploma',
        field_of_study: 'Business'
    },
    {
        job_title: 'Soccer Coach',
        name: {
            first: 'Randy',
            last: 'Marsh'
        },
        salary: '35,000',
        job_description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas fuga, perspiciatis consequuntur officiis ea quis saepe exercitationem similique esse cumque impedit, aspernatur sint excepturi? Quibusdam mollitia eius sed.',
        education_required: 'B.S. in Physical Education',
        field_of_study: 'Physical Education'
    },
    {
        job_title: 'Software Engineer',
        name: {
            first: 'Sanjay',
            last: 'Patel'
        },
        salary: '135,000',
        job_description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas fuga, perspiciatis consequuntur officiis ea quis saepe exercitationem similique esse cumque impedit, aspernatur sint excepturi? Quibusdam mollitia eius sed.',
        education_required: 'Coding Bootcamp',
        field_of_study: 'Computers'
    }
]


User.insertMany(newMentees)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })

Mentor.insertMany(newMentors)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
