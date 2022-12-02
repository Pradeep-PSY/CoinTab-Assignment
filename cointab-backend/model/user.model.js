const { model, Schema } = require('mongoose');

const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    phone: { type: String, required: true}
})

const userModel = model('user', userSchema);

module.exports = userModel;