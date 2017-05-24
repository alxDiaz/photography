var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtOptions');

// Our user model
const User           = require("../model/user");

// Bcrypt let us encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;


router.post("/login", function(req, res) {
  
  if(req.body.username && req.body.password){
    var username = req.body.username;
    var password = req.body.password;
  }

  if (username === "" || password === "") {
    res.status(401).json({message:"fill up the fields"});
    return;
  }

  User.findOne({ "username": username }, (err, user)=> {
  	
  	if( ! user ){
	    res.status(401).json({message:"no such user found"});
	  } else {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        console.log(isMatch);
        if (!isMatch) {
          res.status(401).json({message:"passwords did not match"});
        } else {
          var payload = {id: user._id};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({message: "ok", token: token});    
        }
      });  
    }
  })
});

router.post("/signup", (req, res, next) => {
  var name = req.body.name;
  var password = req.body.password;
  var avatar = req.body.avatar;
  var birthDate = req.body.birthDate;
  var mail = req.body.mail;
  var neighborhood = req.body.neighborhood;
  var role = "USER"

  if (!name || !password || !mail || !neighborhood) {
    res.status(400).json({ message: "Provide all the data" });
    return;
  }

  User.findOne({ mail }, "mail", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'user exist' });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      name,
      password: hashPass,
      avatar,
      birthDate,
      mail,
      neighborhood,
      role
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        var payload = {id: user._id};
        console.log('user', user);
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({message: "ok", token: token});    
      	// res.status(200).json(user);
      }
    });
  });
});



module.exports = router;
