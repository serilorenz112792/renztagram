const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
require('dotenv').config()
//app.use(express.json())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

let DB = process.env.MONGO_URI
let DB2 = process.env.LOCAL_MONGO_URI
mongoose.connect(DB2, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, () => {
    try {
        console.log("connected on mongo")
    }
    catch (err) {
        console.log(err)
    }
})
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', require('./router/auth'))
app.use('/api/user', require('./router/user'))
app.use('/api/post', require('./router/post'))

//Serve static assets if we're in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(process.env.PORT, () => { console.log(`running on port: ${process.env.PORT}`) })