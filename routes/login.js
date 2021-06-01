var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {style: 'login.css',
                        layout: 'login'});
});

module.exports = router;
