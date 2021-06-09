var express = require('express');
const { findUser } = require('../db/usersignup');
const redirectHome = require('../server');
var router = express.Router();
const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.userId) {
        res.redirect('/dashboard');
    } else {
        res.render('login', {style: 'login.css',
                            layout: 'login'});
    }
});

router.post('/', function(req, res, next) {
    if(req.session.userId) {
        res.redirect('/dashboard');
    } else {
        findUser(req.body.username).then((results) => {
            if(results.length > 0){
                bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                    if(err){
                        return (err);
                    }
                    
                    if(result) {
                        req.session.userId = results[0].user_id;
                        console.log(req.session.userId);
                        res.redirect('/dashboard');
                    } else {
                        console.log("invalid password --> try again");
                        res.render('login', {style: 'login.css',
                                     layout: 'login',
                                     invalid : true});
                    };
                });
            } else {
                console.log("invalid username --> does not exist");
                res.render('login', {style: 'login.css',
                                     layout: 'login',
                                     invalid : true});
            }
        }).catch((err) => {   
            next(err);
        });
    };
});

module.exports = router;
