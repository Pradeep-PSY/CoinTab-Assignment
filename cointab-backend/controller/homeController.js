const { Router } = require('express');
const authentication = require('../middleware/authentication');
const userModel = require('../model/user.model');

const homeController = Router();

homeController.post('/', authentication, async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email },{ _id:0, password:0, __v:0 });

    res.send(user);

})

module.exports = homeController;