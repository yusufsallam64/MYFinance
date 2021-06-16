const db = require('./db');

function getStocks(user_id){
    return db.queryPromise('SELECT * from stocks where user_id = ?', [user_id]);
}

function removeStocks(user_id, ticker, pba, shares){
    return db.queryPromise('DELETE FROM stocks where user_id = ? and ticker = ? and pba = ? and amount = ? LIMIT 1', [user_id, ticker, pba, shares]);
}

function purchaseInfo(user_id){
    return db.queryPromise('Select ticker, pba, amount from stocks where user_id = ?', [user_id]);
}

module.exports = {
    getStocks: getStocks,
    removeStocks: removeStocks,
    purchaseInfo: purchaseInfo
};