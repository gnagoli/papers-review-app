const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: {type: String, default: null},
    last_name: {type: String, default: null},
    email: {type: String, default: null},
    password: {type: String, default: null},
    role: {type: String, default: 'REVIEWER'},
    token: {type: String, default: null},
})

module.exports = mongoose.model('user', userSchema);
