const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db');

db.run(`CREATE TABLE IF NOT EXISTS database (
    socket_id INTEGER PRIMARY KEY,
    user_name TEXT,
    user_room TEXT,
    message_id INTEGER,
    message_text TEXT
)`);

const addMessage = async ({ socket_id, user_name, user_room, message_text }) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO database (user_name, user_room, message_id, message_text) VALUES (?, ?, ?, ?)`;
        db.run(query, [user_name, user_room, 1, message_text], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes > 0);
            }
        });
    });
};

module.exports = { addMessage };