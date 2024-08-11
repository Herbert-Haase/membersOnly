const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "Not a valid email adress";
const passwordErr = "must be atleast 5 characters long.";
const repeatpwErr = "Passwords are not identical.";

const validateUser = [
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email").trim().isEmail().withMessage(emailErr),
  body("password").isLength({ min: 5 }).withMessage(`Password ${passwordErr}`),
  body("repeatpassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(repeatpwErr),
];

exports.signupPost = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body);
      return res.status(400).render("signup_form", {
        errors: errors.array(),
        user: req.body,
      });
    }
    const { firstname, lastname, email, password } = req.body;
    try {
      const hashedPw = await bcrypt.hash(password, 10);
      await db.createUser(firstname, lastname, email, hashedPw);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }),
];
