const mongoose = require('mongoose');

let count = 1;
let countId = {type: Number, default: () => count++};


const addressSchema = new mongoose.Schema({
    address: String,
    address_detail: String,
    agent_fee: Number,
    city_id: Number,
    city_name: String,
    deliver_amount: {
        type: Number,
        default: 20
    },
    name: String,
    phone: String,
    phone_bk: String,
    geohash: String,
    sex: Number,
    create_at: {
        type: Date,
        default: Date.now
    },
    user_id: String,
    id: countId,
    tag_type: {
        type: Number,
        default: 1,
    }
}, {collection: "address"});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;