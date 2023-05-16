const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require("passport");
const axios = require("axios").create({baseUrl: "/status"})
var grad = require("gradient-from-image")

//LOADING USER MODEL
const User = require('../models/User');
const { response } = require('express');

//LOADING POSTS MODEL
const Article = require('../models/Articles');

router.post('/createuser', (req, res) => {
    const user = req.body;
    const password = user.password;
    const newUser = new User({
        email : user.email,
        password : user.password,
        country : user.country,
        day_of_birth : user.day_of_birth,
        month_of_birth : user.month_of_birth,
        year_of_birth : user.year_of_birth,
    });
    const hashing = async (password) => {f
        const salt = await bcrypt.genSalt(10)
        newUser.password  = await bcrypt.hash(password, salt);
        newUser.save()
        .then(user => console.log(user));
    }

    hashing(password);
});

router.post('/login', (req, response) => {
   const userData = req.body;
   const email = userData.email;
   const password = userData.password;
   User.findOne({email:email})
   .then((user) => {
    if(user){
        bcrypt.compare(password, user.password, function(err, res) {
            if (res) {
              return response.status(200).json({success: 'true'});
            } else {
              return response.status(200).json({success: 'false',type :'password', msg: 'Passwords do not match'});
            }
          });
    }else if (!user){
        response.status(200).json({type :'email', msg : 'User does not exists'})
    }
   })
})

router.get('/', (req, res) => {
    res.send('SERVER RUNNING...');
})

router.post('/user', (req, response) => {
    const email = req.body.email;
    const userAvatar = req.body.avatar.uri;
    User.findOne({email:email})
    .then((user) => {
     if(user){ 
        grad.gr(userAvatar).then(gradient =>{
            response.status(200).json({user : user, gradient : gradient})
        });
     }else if (!user){
         return null 
     }
    })


router.post('/createarticle', (req, res) => {
    const author = req.body.writer;
    const article = req.body.article;
    console.log('REQUEST RECIEVED...')
    User.findOne({email:author})
    .then(user => {
        if(user){
            const newArticle = new Article({
                postText : article,
                author : author,
                firstName : user.firstName,
                lastName : user.lastName,
            })
            newArticle.save()
            .then(article => {
                console.log(article)
                res.json({msg: 'POST ADDED !'})
            });
        };
    });
});

});

router.post('/posts', (req, res) => {
    Article.find({})
    .then(posts =>{
        res.json(posts);
        console.log('REQUEST MADE FOR POSTS DATA')
    })
    .catch(err => {
        res.json({msg : 'ERROR FETCHING POSTS'});
    });
});


router.post('/likepost', (req, res) => {
    const userEmail = req.body.email;
    const postID = req.body.postID;
    Article.findOne({_id : postID})
    .then(article => {
           
    })
});

// router.post('/fetchcomments', (req, res) => {
//     const userEmail = req.body.email;
//     const postID = req.body.postID;
//     Article.findOne({_id : postID})
//     .then(article => {
//           res.send 
//     })
// })

router.post('/postcomment', (req, res) => {
    const commentedBy = req.body.commentedBy;
    const postID = req.body.postID;
    const commentBody = req.body.commentBody;
    User.findOne({email : commentedBy})
    .then(user => {
        Article.findByIdAndUpdate(postID, {$push : { comments : { commentedBy : commentedBy, commentBody : commentBody, firstName : user.firstName, lastName : user.lastName}}})
        .then(article => {
            res.json({msg : 'Comment Added Successfully'})
        })
    })
});

router.post('/fetchcomments', (req, res) => {
    const postID = req.body.postID;
    Article.findById(postID)
    .then(article => {
        const comments = article.comments;
        res.json({comments : comments});
       
    })
})

module.exports = router;