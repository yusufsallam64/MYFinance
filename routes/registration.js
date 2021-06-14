var express = require('express');
const { insertUser, findUser } = require('../db/usersignup');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 12;
// IN THE FUTURE, ADD CHECKING TO SEE IF THAT ACCOUNT ALREADY EXISTS ***

/* GET home page. */
router.get('/', (req, res, next) => {
    if(req.session.userId) {
        res.redirect('/dashboard');
      } else {
        res.render('registration', {style: 'registration.css',
                                    layout: 'registration'});
      }

});

router.post('/', function(req, res, next) {
    if(req.session.userId) {
        res.redirect('/dashboard');
    } else {
        let username = req.body.username;
        findUser(username).then((results) => {
            if(results.length > 0){
                res.render('registration', { style : 'registration.css',
                                             layout : 'registration',
                                             accountExists : true});
                return;
            } else {
                console.log(req.body);
                bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                    insertUser(username, hash).then(()=> {
                        console.log(req.body);
                        console.log(req.session);
                        res.redirect('/');
                    }).catch((err) => {
                        next(err);
                    });
                })
            }
        }).catch((err) => {
            next(err);
        })
    }
});

module.exports = router;
