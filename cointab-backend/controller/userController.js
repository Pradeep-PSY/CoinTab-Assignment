const { Router } = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");
const userController = Router();

userController.post("/user", async (req, res) => {
  const { name, email, password, phone } = req.body;

  bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      return res.send("singup failed");
    }

    const new_user = new userModel({ email, name, password: hash, phone });

    await new_user
      .save()
      .then(() =>  res.send("signup successfull"))
      .catch(() => res.send("user already exists"));

   
  });
});

module.exports = userController;
