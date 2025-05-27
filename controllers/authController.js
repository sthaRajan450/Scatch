const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user)
      return res.status(401).send("You already have an account, please login!");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) res.send(err.message);
        else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          res.redirect("/shop");
        }
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user)
      return res
        .status(401)
        .send("Your account is not registered, please register");

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
      } else {
        res.send("incorrect password");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
