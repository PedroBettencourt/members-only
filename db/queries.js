const pool = require('./pool');

async function addUser(firstName, lastName, username, password) {
    await pool.query("INSERT INTO users (firstName, lastName, username, password, membership) VALUES ($1, $2, $3, $4, 'basic')", [firstName, lastName, username, password]);
}

async function upgradeUser(id) {
    await pool.query("UPDATE users SET membership = 'vip' WHERE id = $1", [id]);
}

async function addMessage(title, timestamp, text, username) {
    await pool.query("INSERT INTO messages (title, timestamp, text, username) VALUES ($1, $2, $3, $4)", [title, timestamp, text, username]);
}

async function getMessages() {
    const { rows } = await pool.query("SELECT title, timestamp, text, username FROM messages");
    return rows;
}

module.exports = { addUser, upgradeUser, addMessage, getMessages };