var express = require('express');
var router = express.Router();
const { getStocks, removeStocks} = require('../db/dashboard.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  if(!req.session.userId) {
    res.redirect('/');
  } else {
    const { userId } = req.session;
    let ticker = req.query.ticker;
    let pba = req.query.pba;
    let shares = req.query.shares;
    let deleted = req.query.delete;

    if(ticker && pba && shares && (deleted === "false")){
      getStocks(userId).then((results) => {
        if(results.length === 0){
          res.render('dashboard', {style: 'dashboard.css'});
        } else {
          res.render('dashboard', {style: 'dashboard.css',
                                   stock: results,
                                   searchedticker: ticker,
                                   purchaseprice: pba,
                                   shares: shares});
          return;
        }
      }).catch((err) => {
        console.log(err);
      })

    } else if (ticker && pba && shares && (deleted === "true")){
      removeStocks(userId, ticker, pba, shares).then(() => {
        res.redirect('/dashboard')
      }).catch((err) => {
        console.log(err);
      });
    } else {
      getStocks(userId).then((results) => {
        console.log(results);
        if(results.length === 0){
          res.render('dashboard', {style: 'dashboard.css'});
          return;
        } else {
          res.render('dashboard', {style: 'dashboard.css',
                                   stock: results});
          return;
          }
      }).catch((err) => {
        console.log(err);
      })
    }
}});



module.exports = router;
