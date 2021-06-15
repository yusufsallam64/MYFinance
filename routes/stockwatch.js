var express = require('express');
var router = express.Router();
const { spawn } = require('child_process');


/* GET home page. */
router.get('/', function(req, res, next){
    console.log('hi')
    res.render('stockwatch', {style: 'stockwatch.css'});
});


router.post('/', function(req, res, next) {
    let price;
    const stockdata = spawn('python', ['webscraping/main.py']);
    const ticker = req.body.tickervalue
    stockdata.stdin.write(JSON.stringify(ticker))
    
    stockdata.stdout.on('data', function(data) {
        price = (data.toString());
        let scriptreturn = (price.split("'", [-1]));
        console.log(scriptreturn);
        let currentprice = scriptreturn[1];
        let percentchange = scriptreturn[3];
        let companyname = scriptreturn[5];
        let ticker = (companyname.split('(', [-1]))[1].slice(0, -1);
        console.log(ticker);
        res.render('stockwatch', {style:'stockwatch.css',
                                  price: currentprice,
                                  percentchange: percentchange,
                                  companyname: companyname,
                                  ticker: ticker
                                
                                });
    });

    stockdata.stdin.end();

});

module.exports = router;
