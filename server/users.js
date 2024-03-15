const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("database.db");

db.run(`CREATE TABLE IF NOT EXISTS database (
    socket_id TEXT,
    user_name TEXT,
    user_room TEXT,
    message_id INTEGER PRIMARY KEY AUTOINCREMENT,
    message_text TEXT
)`);

const addMessage = async ({ socket_id, user_name, user_room, message_text }) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO database (socket_id, user_name, user_room, message_text) VALUES (?, ?, ?, ?)`;
        db.run(query, [socket_id, user_name, user_room, message_text], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
};

module.exports = {addMessage};