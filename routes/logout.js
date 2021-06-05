var express = require('express');
var router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', (req, res, next) => {
    req.session.destroy((err) => {
        if(err){
            return (err);
        }

        res.clearCookie(process.env.SESS_NAME);
        res.redirect("/");
    });
});

module.exports = router;
