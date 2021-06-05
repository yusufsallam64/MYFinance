var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  if(!req.session.userId) {
    res.redirect('/');
  } else {
    const { userId } = req.session;
    console.log(userId);
    res.render('dashboard', {style:'dashboard.css'});
  }
});

module.exports = router;
