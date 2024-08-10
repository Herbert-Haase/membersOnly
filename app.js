const express = require("express");
const app = express();
const indexRouter = require("./routes/index.js");

// modules
require("dotenv").config();

// settings
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Express app listening on localhost:" + PORT);
});
