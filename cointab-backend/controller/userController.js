const { Router } = require('express');
const bcrypt = require('bcrypt');
const userController = Router();

userController.post('/user', async (req, res) => {
    const { name, email, password, phone } = req.body;

    bcrypt.hash(password, 8, async function (err, hash) {
        if (err) {
          return res.send("singup failed");
        }
    
        const new_user = new userModel({ email, name, password: hash, phone});
    
        await new_user.save();
    
        res.send("signup successfull");
      });
})

module.exports = userController;