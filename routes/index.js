const express = require('express');
const router = express.Router();
const eA = require('../helpers/auth');

//Index route
router.get('/', eA.ensureGuest, (req,res) => {
    res.render('index/welcome');
});

router.get('/dashboard',eA.ensureAuthenticated, (req,res)=>{
    res.render('index/dashboard');
});

router.get('/about',(req,res)=>{
    res.render('index/about');
});

module.exports = router;