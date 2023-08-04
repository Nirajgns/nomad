const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const asyncWrapper = require("../utils/asyncWrapper");

//function for creating a token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "29d",
  });
};

//login user
const loginUser = asyncWrapper(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: 3 * 24 * 60 * 60 * 1000,
    // }); use for sending secure token to client
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// signup a user
const signupUser = asyncWrapper(async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    const user = await User.signup(email, password, name, phone);

    // create a token
    const token = createToken(user._id);
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: 3 * 24 * 60 * 60 * 1000,
    // });
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get user profile
const getUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`invalid user id`);
  }

  const foundUser = await User.findById(id);

  if (!foundUser) {
    return res.status(404).send(`No user with id: ${id}`);
  }
  res.json({ foundUser });
});

module.exports = { signupUser, loginUser, getUser };
