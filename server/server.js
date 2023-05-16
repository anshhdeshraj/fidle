//DECLARING VARIABLES
require('dotenv').config();
const { application } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const server = express();
const session = require('express-session');
const passport = require('passport');
const PORT = process.env.PORT;
const bodyParser = require('body-parser')
const MONGODB_URL = process.env.MONGODB_URL;

const cors = require('cors');
server.use(cors());

 


//USING BODY-PARSER
server.use(bodyParser.json())

//DECLARING ROUTES
server.use('/', require('./routes/index'));

server.use(express.urlencoded({ extended: true }));


//CONNECTING TO DATABASE
mongoose.connect(MONGODB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(() => console.log(`<<MONGODB CONNECTED>>`))
.catch(err => console.log(err));


//RUNNING THE SERVER 
server.listen(PORT, ()=>{
    console.log(`<<SERVER AT ${PORT}>>`);
});