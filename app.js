const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

//Bpodyparser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Load models
require('./models/UserModel');
require('./models/StoryModel');

//Passport config
require('./config/passport')(passport);

//Load routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');
//Load keys
const keys = require('./config/keys');

//Handlebars helpers
const hbsHelpers = require('./helpers/hbs');

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(keys.mongoURI)
         .then(()=> console.log('MongoDB connected'))
         .catch(err => console.log(err));

app.engine('handlebars',exphbs({
    helpers:{
        truncate: hbsHelpers.truncate,
        stripHTMLTags: hbsHelpers.stripHTMLTags,
        formatDate: hbsHelpers.formatDate
    },
    defaultLayout: 'main'
}));
app.set('view engine','handlebars');

//app.use(cookieParser());
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

//Map routes
app.use('/',index);
app.use('/auth',auth);
app.use('/stories',stories);

const port = process.env.PORT || 5000

app.listen(port,() => {
    console.log(`server started on port ${port}`);
});

//Static resource directory
app.use(express.static(path.join(__dirname,'public')));