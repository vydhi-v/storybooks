const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controller for /auth routes

//Auth
router.get('/google', passport.authenticate('google', {scope:['profile', 'email']}));

//Auth Callback
router.get('/google/callback',
        passport.authenticate('google', {failureRedirect:'/'}),
        //Successful authentication, redirect home
        (req,res)=>{
            res.redirect('/dashboard');
        }
);

router.get('/verify',(req,res) => {
    if(req.user){
        console.log(req.user);
    }else{
        console.log('Not Auth');
    }
});

router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/');
})

module.exports = router;