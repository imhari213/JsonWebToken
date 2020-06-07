var express = require('express');
var router = express.Router();
var JWT = require('jsonwebtoken');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Test Deployment by Jenkins....'
  });
});


router.get('/Authenticate', (req, res) => {
  var user = {
    "username": "Hari",
    "password": "admin"
  }
  //creating token
  JWT.sign(user, 'Hari', { expiresIn:'30s' } , (err, token) => {
    err ? res.json({
      "message": "error while generating token"
    }) : console.log(token);
    res.json({
      token
    });
  })
})



router.get('/users', verifyToken, (req, res) => {

  JWT.verify(req.token, 'Hari', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      var users = {
        "user 1": "A",
        "user 2": "B",
        "user 3": "C",
        "user 4": "D"
      }
      res.json({
        users,
        authData
      });
    }
  })




})

function verifyToken(req, res, next) {
  var bearerheader = req.headers['authorization'];

  // console.log(bearerheader);
  // const Bearer = bearerheader.split('');
  // const beareToken = Bearer[1];
  // console.log(beareToken);
  if (typeof bearerheader !== undefined) {
    //console.log(bearerheader);
    const Bearer = bearerheader.split(' ');
  // console.log(Bearer);
    const beareToken = Bearer[1];
    console.log(beareToken);
    req.token = beareToken;
    next()
  } else {
    res.sendStatus(403);
  }
}


module.exports = router;
