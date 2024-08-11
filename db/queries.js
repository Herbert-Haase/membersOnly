const pool = require("./pool");

async function createUser(firstName, lastName, email, password) {
  await pool.query(
    "INSERT INTO users (firstname, lastname, email, password, membershipstatus) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, email, password, "free Tier"]
  );
}

async function getUsers() {
  const users = await pool.query("SELECT * FROM users");
  return users;
}

module.exports = {
  createUser,
  getUsers,
};
