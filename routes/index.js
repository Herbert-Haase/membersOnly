const { Router } = require("express");
const router = Router();

router.get("/signup", (req, res) => {
  res.render("signup_form");
});

router.post("signup", (req, res) => {
  //
});

module.exports = router;
