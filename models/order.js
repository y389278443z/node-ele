const mongoose = require('mongoose');

let count = 1;
let countId = {type: Number, default: () => count++};

const orderSchema = new mongoose.Schema({
    shop_name: String,
    total_address: String,
    order_list: Array,
    order_time: {
        type: Date,
        default: Date.now
    },
    id: countId,
    restaurant_id: Number,
    restaurant_image_url: String,
    restaurant_type: {
        type: Number,
        default: 0
    },
    user_id: String,
    total_amount: Number,
    total_quantity: Number
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;