var express = require('express');
var router = express.Router();

// IN THE FUTURE, ADD CHECKING TO SEE IF THAT ACCOUNT ALREADY EXISTS ***

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('registration', {style: 'registration.css',
                                layout: 'registration'});
});

router.post('/', function(req, res, next) {
    // console.log(req.body.username);
    // console.log(req.body.password);
    console.log(req.body);

    res.render('login', {style: 'login.css',
                        layout: 'login'});
    
});

module.exports = router;
