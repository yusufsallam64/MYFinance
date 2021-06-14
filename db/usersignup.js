const db = require('./db');

// const insert_new_user = `INSERT INTO user,
//                          VALUES (?, ?)`;

function insertUser(username, password){
    return db.queryPromise(`INSERT INTO user(name, password) VALUES (?, ?)`, [username, password]);
}

function findUser(username){
    return db.queryPromise(`SELECT * from user WHERE name = ?`, [username]);   
}

function uniqueUsername(username){
    return db.queryPromise(`SELECT * from user WHERE name = ?`, [username]);
}

module.exports = {
    insertUser : insertUser,
    findUser : findUser,
    uniqueUsername : uniqueUsername
};