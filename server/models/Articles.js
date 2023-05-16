const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    postText : {
        type : String,
    },
    author : {
        type : String
    },
    createdOn : {
        type : String,
        default : new Date().toLocaleDateString(),
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    likes : {
        type : [{likedBy : String}]
    },

    comments : {
        type : [{
            commentedBy : String,
            commentBody : String,
            firstName : String, 
            lastName : String,
            createdOn :  {
                type : String,
                default : new Date().toLocaleDateString()
            }
        }]
    }

});


const Article = mongoose.model('Article', articleSchema);

module.exports = Article;