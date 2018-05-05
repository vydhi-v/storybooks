const express = require('express');
const router = express.Router();
const eA = require('../helpers/auth');
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');

//Stories index
router.get('/',(req,res) => {
    Story.find({
        status: 'public'
    })
    .populate('user')
    .then(stories => {
        res.render('stories/index', {
            stories: stories
        });
    });
    
});

//Add Story form
router.get('/add',eA.ensureAuthenticated, (req,res) => {
    res.render('stories/add')
});

//Process add story
router.post('/', (req,res) =>{
    console.log(req.body);
    let allowComments = false;
    if(req.body.allowComments){
        allowComments = true;
    }

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id        
    }

    //Save the story
    new Story(newStory)
        .save()
        .then(story => {
            res.redirect(`/stories/show/${story.id}`)
        });    
});

//show single story
router.get('/show/:id',(req,res)=>{
    Story.findOne({
        _id : req.params.id
    })
    .populate('user')
    .then(story => {
        res.render('stories/show',{
            story:story
        });
    });    
});

module.exports = router;