const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Express Initialization
const app = express();


//  Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongodbURI;

// Connect to Mongo

mongoose.connect(db, { useNewUrlParser: true })
        .then(()=> console.log('Mongodb connected'))
        .catch(error=> console.log(error));

const port = process.env.PORt || 5000;

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
})


