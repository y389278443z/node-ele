const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    activities: [{
        description: String,
        icon_color: String,
        icon_name: String,
        id: Number,
        name: String,
    }],
    address: String,
    delivery_mode: {
        color: String,
        id: Number,
        is_solid: Boolean,
        text: String
    },
    description: { type: String, default: "欢迎光临，用餐高峰期时请提前下单，谢谢合作！" },
    order_lead_time: { type: String, default: "" },
    distance: { type: String, default: "" },
    meter: { type: Number, default: 0 },
    float_delivery_fee: { type: Number, default: 0 },
    float_minimum_order_amount: { type: Number, default: 0 },
    id: Number,
    category: String,
    identification: {
        company_name: { type: String, default: "" },
        company_address: { type: String, default: "" },
        legal_person: { type: String, default: "" },
        licenses_number: { type: String, default: "" },
        business_scope: { type: String, default: "" },
        licenses_date: { type: String, default: "" }
    },
    image_path: { type: String, default: "" },
    is_new: { type: String, default: '1' },
    latitude: {type: String, required: true},
    longitude: {type: String, required: true},
    license: {
        business_license_image: { type: String, default: "" },
        catering_service_license_image: { type: String, default: "" },
    },
    name: {
        type: String,
        required: true
    },
    opening_hours: { type: Array, default: ["09:00-21:00"] },
    phone: {
        type: String,
        required: true
    },
    promotion_info: { type: String, default: "欢迎光临，用餐高峰期时请提前下单，谢谢合作！" },
    rating: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    recent_order_num: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    supports: [{
        description: String,
        icon_color: String,
        icon_name: String,
        name: String
    }],
}, {collection: 'shops'});


const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;

