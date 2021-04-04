const mongoose = require('mongoose');
const User = require('../models/user')

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

//needs people to insert here


User.insertMany(newUsers)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
