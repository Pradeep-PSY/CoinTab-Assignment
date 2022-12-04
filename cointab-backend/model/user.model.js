const { model, Schema } = require('mongoose');

const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    
    count: { type: Number, default: 0 },
    logTime: [],
    block: { type:Boolean, default: false}
})

const userModel = model('user', userSchema);

module.exports = userModel;