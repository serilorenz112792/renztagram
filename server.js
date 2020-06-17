const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () => {
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