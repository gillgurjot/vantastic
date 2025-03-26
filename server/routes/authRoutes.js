const express = require("express");
const {
  registerUser,
  userLogin,
  getAllUsers,
} = require("../controllers/authControllers");
const {
  registerValidation,
  loginValidation,
} = require("../helpers/validations");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerValidation, registerUser);

router.post("/login", loginValidation, userLogin);

router.get("/users", protect, getAllUsers);

module.exports = router;
