const pool = require('./pool');

async function addUser(firstName, lastName, username, password) {
    await pool.query("INSERT INTO users (firstName, lastName, username, password, membership, admin) VALUES ($1, $2, $3, $4, 'basic', 'false')", [firstName, lastName, username, password]);
}

async function upgradeUser(id) {
    await pool.query("UPDATE users SET membership = 'vip' WHERE id = $1", [id]);
}

async function upgradeAdmin(id) {
    await pool.query("UPDATE users SET admin = 'true' WHERE id = $1", [id]);
}

async function addMessage(title, timestamp, text, username) {
    await pool.query("INSERT INTO messages (title, timestamp, text, username) VALUES ($1, $2, $3, $4)", [title, timestamp, text, username]);
}

async function getMessages() {
    const { rows } = await pool.query("SELECT id, title, timestamp, text, username FROM messages");
    return rows;
}

async function deleteMessage(id) {
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

module.exports = { addUser, upgradeUser, upgradeAdmin, addMessage, getMessages, deleteMessage };