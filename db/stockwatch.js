const db = require('./db');

function insertStock(user_id, ticker, PBA, amount){
    return db.queryPromise('INSERT INTO stocks(user_id, ticker, pba, amount) VALUES (?, ?, ?, ?)', [user_id, ticker, PBA, amount]);
}

module.exports = {
    insertStock : insertStock
};