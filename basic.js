'use strict';

var express = require('express');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var app = express();

var secret = 'mysecretkey';
var users = [
  {user: 'dickeyxxx', pass: 'foo'}
];

app.get('/login', function (req, res) {
  let user = _.find(users, {user: req.query.user});
  if (user.pass === req.query.pass) {
    let token = jwt.sign({user: user.user}, secret);
    res.send(token);
  } else {
    res.sendStatus(401);
  }
});

app.get('/me', function (req, res) {
  let decoded = jwt.verify(req.query.token, secret);
  let me = _.find(users, {user: decoded.user});
  res.send(me);
});

var server = app.listen(3000, function () {
  console.log('Server is running on port', server.address().port);
});
