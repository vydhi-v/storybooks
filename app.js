const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();

//Passport config
require('./config/passport')(passport);

//Load routes
const auth = require('./routes/auth');

app.get('/',(req,res) => {
    res.send('Welcome to Storybooks!');
});

app.use('/auth',auth);

const port = process.env.PORT || 5000

app.listen(port,() => {
    console.log(`server started on port ${port}`);
});
