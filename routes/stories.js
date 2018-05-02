const express = require('express');
const router = express.Router();
const eA = require('../helpers/auth');

//Stories index
router.get('/',(req,res) => {
    res.render('stories/index')
});

//Add Story form
router.get('/add',eA.ensureAuthenticated, (req,res) => {
    res.render('stories/add')
});



module.exports = router;