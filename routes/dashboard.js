var express = require('express');
var router = express.Router();
const { getStocks, removeStocks, purchaseInfo } = require('../db/dashboard.js');
const { spawn } = require('child_process');

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
          res.redirect('/stockwatch')
          return;
        } else {
          purchaseInfo(userId).then((results) => {
            let combinedvals = [];
            for(var x = 0; x < results.length; x++){
              console.log(x)
              console.log(results[x])
              combinedvals.push(`${results[x].ticker} ${results[x].pba} ${results[x].amount}`);
            }
            
            console.log(combinedvals);
            const stockdata = spawn('python', ['webscraping/calculatetotals.py']);
            stockdata.stdin.write(JSON.stringify(combinedvals))
            
            stockdata.stdout.on('data', function(data) {
                price = (data.toString());
                let scriptreturn = (price.split("'", [-1]));
                console.log(scriptreturn);
            });

            stockdata.stdin.end();

            res.render('dashboard', {style: 'dashboard.css',
                                    stock: results,
                                    home: true});
            return;
        })};
      }).catch((err) => {
        console.log(err);
      });
    }
}});


module.exports = router;
