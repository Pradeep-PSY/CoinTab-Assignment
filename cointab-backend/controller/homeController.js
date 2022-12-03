const { Router } = require('express');
const userModel = require('../model/user.model');

const homeController = Router();

homeController.get('/', async (req, res) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email: email },{ _id:0, password:0, __v:0 });

    res.send(user);

})

module.exports = homeController;