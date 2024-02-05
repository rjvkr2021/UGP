const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER,
    name TEXT,
    room TEXT
)`);

const addUser = async ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO users (userid, name, room) VALUES (?, ?, ?)`;
        db.run(query, [id, name, room], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes > 0);
            }
        });
    });
};

const getUser = async (userid) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT name, room FROM users WHERE userid = ?`;
        db.get(query, [userid], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const getUsersInRoom = async (room) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE room = ?`;
        db.all(query, [room], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const removeUser = async (id) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM users WHERE userid = ?`;
        db.run(query, [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes > 0);
            }
        });
    });
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };