const { Router } = require("express");
const router = Router();
const { signupPost } = require("../controllers/userController");

router.get("/signup", (req, res) => {
  res.render("signup_form");
});

router.post("/signup", signupPost);

router.get("/", (req, res) => {
  res.send("homepage");
});

module.exports = router;
