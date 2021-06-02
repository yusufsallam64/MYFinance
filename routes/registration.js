var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('registration', {style: 'registration.css',
                                layout: 'registration'});
});

module.exports = router;
