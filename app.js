const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const app = express();

//Load User model
require('./models/UserModel');

//Passport config
require('./config/passport')(passport);

//Load routes
const auth = require('./routes/auth');

//Load keys
const keys = require('./config/keys');

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(keys.mongoURI)
         .then(()=> console.log('MongoDB connected'))
         .catch(err => console.log(err));

         //express-session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Set globals
app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    next();
});


app.get('/',(req,res) => {
    res.send('Welcome to Storybooks!');
});

app.use('/auth',auth);

const port = process.env.PORT || 5000

app.listen(port,() => {
    console.log(`server started on port ${port}`);
});
