#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");

// tables trainers, types, pokemon
const SQL = `
DROP TABLE IF EXISTS messages;
DROP VIEW IF EXISTS usersfullname;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR ( 255 ),
  lastname VARCHAR ( 255 ),
  email VARCHAR ( 255 ),
  password VARCHAR ( 255 ),
  membershipstatus VARCHAR ( 255 )
);

CREATE VIEW usersfullname AS
  SELECT id, firstname || lastname AS fullname, firstname, lastname, email, password, membershipstatus
  FROM users;

CREATE TABLE messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  text VARCHAR ( 255 ),
  users_id INTEGER,
  timestamp TIMESTAMP,
    CONSTRAINT fk_users FOREIGN KEY(users_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);


`;

async function main() {
  console.log("seeding...");
  const client = new Client(argv[2]);
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
