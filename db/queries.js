const pool = require('./pool');

async function addUser(firstName, lastName, username, password) {
    await pool.query("INSERT INTO users (firstName, lastName, username, password, membership) VALUES ($1, $2, $3, $4, 'basic')", [firstName, lastName, username, password]);
}

module.exports = { addUser }