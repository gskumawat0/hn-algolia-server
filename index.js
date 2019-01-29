require("dotenv").config()
var express = require("express");
var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");
var authRoutes = require("./routes/auth");
var auth = require('./middleware/auth');
var db = require("./models");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.json({message: "Make a POST requst to /api/auth/signup to signup"});
});

// app.use('/api/users/:id/messages',
//         auth.loginRequired, auth.ensureCorrectUser,
//         // messagesRoutes
//         );
        
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, process.env.IP, function(){
  console.log(`Server is listening on port ${PORT}`);
});

let mongodburl = process.env.DATABASEURL;


