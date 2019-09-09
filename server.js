const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

// const bodyParser = require('body-parser');
const books = require('./routes/api/books');
const user = require('./routes/api/user');
const auth = require('./routes/api/auth');
const path = require('path');
// Express Initialization
const app = express();


//  Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongodbURI');             //require('./config/keys').mongodbURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
        .then(()=> console.log('Mongodb connected'))
        .catch(error=> console.log(error));


app.use('/api/books', books);
app.use('/api/user', user);
app.use('/api/auth',auth);

const port = process.env.PORt || 5000;
app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
})


module.exports = app;

