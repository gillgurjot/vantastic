const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../helpers/generateToken");

//Register User
const registerUser = async (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  const fullName = req.body.fullName;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ username });
    if (user) {
      res.status(400).json("User already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
      user = await User.create({
        username,
        fullName,
        password: secPass,
      });

      res.status(200).json({
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        isAdmin: user.isAdmin,
        authToken: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
    process.exit();
  }
};

//User Login
const userLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json("Incorrect Credentials");
    } else {
      const passMatch = await bcrypt.compare(password, user.password);

      if (!passMatch) {
        res.status(401).json("Incorrect Credentials");
      } else {
        res.status(200).json({
          id: user._id,
          username: user.username,
          fullName: user.fullName,
          isAdmin: user.isAdmin,
          authToken: generateToken(user._id),
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
    process.exit();
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    res.status(401).json("Unauthorized Request");
    return;
  }
  try {
    const users = await User.find({ isAdmin: { $ne: true } }).select(
      "id username fullName"
    );
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
    process.exit();
  }
};

module.exports = { registerUser, userLogin, getAllUsers };
