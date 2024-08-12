const pool = require("./pool");

async function createUser(firstName, lastName, email, password) {
  await pool.query(
    "INSERT INTO users (firstname, lastname, email, password, membershipstatus) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, email, password, "free Tier"]
  );
}

async function getUser(email) {
  const { rows } = await pool.query(
    "SELECT * FROM usersfullname WHERE email = $1",
    [email]
  );
  return rows[0];
}

async function getUsers() {
  const users = await pool.query("SELECT * FROM users");
  return users;
}

module.exports = {
  createUser,
  getUser,
  getUsers,
};
