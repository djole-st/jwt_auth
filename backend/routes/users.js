var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/register', function(req,res,next){
  var new_user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  let promise = new_user.save();

  promise.then(function(doc){
    return res.status(201).json(doc);
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Error registering user.'});
  })

});

module.exports = router;
