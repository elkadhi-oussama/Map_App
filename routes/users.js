const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register

router.post("/Register", async (req, res) => {
  try {
    //hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //saved new user
    const user = await newUser.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//login

router.post("/Login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).send({ msg: "bad credential" });
    }
    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).send({ msg: "bad credential" });
    }
    //send user
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = router;
