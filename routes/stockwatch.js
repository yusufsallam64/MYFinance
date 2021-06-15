var express = require('express');
var router = express.Router();
const { insertStock } = require('../db/stockwatch.js');
const { spawn } = require('child_process');

// for this do type validation and make sure that you have the correct types going into the database

router.post('/', function(req, res, next) {
    insertStock(req.session.userId, req.query.tickervalue, req.body.pba, req.body.shares);
    res.redirect('/stockwatch');
});

router.get('/', function(req, res, next){
    if(!req.session.userId) {
        res.redirect('/');
    } else {
        if (req.query.tickervalue){
            let price;
            const stockdata = spawn('python', ['webscraping/main.py']);
            const ticker = req.query.tickervalue;
            stockdata.stdin.write(JSON.stringify(ticker))
            
            stockdata.stdout.on('data', function(data) {
                price = (data.toString());
                let scriptreturn = (price.split("'", [-1]));
                console.log(scriptreturn);
                if(scriptreturn[0] === "err"){
                    console.log("caca");
                    res.render('stockwatch', {style:'stockwatch.css',
                                              errorretrieving: true,
                                              ticker: ticker
                                              });
                } else {
                    let currentprice = scriptreturn[1];
                    let percentchange = scriptreturn[3];
                    let companyname = scriptreturn[5];
                    res.render('stockwatch', {style:'stockwatch.css',
                                            price: currentprice,
                                            percentchange: percentchange,
                                            companyname: companyname,
                                            ticker: ticker
                                            });
                }
            });
            stockdata.stdin.end();
        } else {
            res.render('stockwatch', {style:'stockwatch.css'});
        }
    }
});

module.exports = router;
