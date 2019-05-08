const mongoose = require('mongoose');

let counter = 1;
let counterId = {type: Number, default: () => counter++};

const userInfoSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'default_header.png'
    },
    balance: {
        type: Number,
        default: 0
    },
    email: '',
    is_email_valid: false,
    is_mobile_valid: false,
    mobile: String,
    username: String,
    user_id: String,
    regist_time: String,
    id: counterId,
    point: {
        type: Number,
        default: 0
    }
});


const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;