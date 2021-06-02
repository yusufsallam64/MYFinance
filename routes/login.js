var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {style: 'login.css',
                        layout: 'login'});
});

router.post('/', function(req, res, next) {
    res.render('dashboard', { title: ' Home Page ',
                              style: 'dashboard.css'});
})

module.exports = router;
