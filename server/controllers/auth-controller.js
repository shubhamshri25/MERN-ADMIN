const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to MERN ADMIN dashboard ");
  } catch (error) {
    console.log(error);
  }
};

// regitering the user
const register = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ messsage: "User already exist" });
    }

    const createdUser = await User.create({
      username,
      email,
      password,
      phone,
    });

    // console.log(createdUser);

    res.status(201).json({
      messsage: "Registration successfull",
      token: await createdUser.generateToken(),
      userId: createdUser._id.toString(),
    });
  } catch (error) {
    res.status(500).json("Internal server error ");
  }
};

// logging the user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credtials" });
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        message: "Login successfull",
        token: await userExist.generateToken(),
        id: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error ");
  }
};

// to get the user data
const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);

    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

module.exports = {
  home,
  register,
  login,
  user,
};
