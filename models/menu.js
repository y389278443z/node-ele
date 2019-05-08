const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
    id: Number,
    menu:{
        type: Array,
        default: []
    },
    ratings: {
        compare_rating: Number,
        food_score: Number,
        item_good_score: Number,
        order_rating_amount: Number,
        overall_score: Number,
        package_score: Number,
        rider_score: Number,
        service_score: Number,
        shop_score: Number,
        taste_score: Number,
        tags: [{
            count: Number,
            name: String,
            unsatisfied: Boolean
        }]
    }
}, {collection: 'menu'});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;


// [{
//     name: String,
//     description: String,
//     icon_url: String,
//     id: Number,
//     restaurant_id: Number,
//     type: Number,
//     is_selected: Boolean,
//     foods: [{
//         activity: {
//             type: Object,
//             default: null
//         },
//         attributes: {
//             type: Array,
//             default: []
//         },
//         attrs: Array,
//         category_id: Number,
//         description: String,
//         image_path: String,
//         is_featured: Number,
//         item_id: Number,
//         month_sales: Number,
//         name: String,
//         rating: Number,
//         rating_count: Number,
//         restaurant_id: Number,
//         satisfy_count: Number,
//         satisfy_rate: Number,
//         specfoods: [{
//             name: String,
//             item_id: Number,
//             food_id: Number,
//             original_price: Number,
//             packing_fee: Number,
//             price: Number,
//             promotion_stock: Number,
//             recent_rating: Number,
//             restaurant_id: Number,
//             sku_id: String,
//             sold_out: Boolean,
//             specs: Array,
//             stock: Number
//         }],
//         tips: String,
//         specifications: {
//             type: Array,
//             default: []
//         }
//     }]
// }]



// {
//     activity_type: String,
//         applicable_quantity: Number,
//     applicable_quantity_detail_text: String,
//     applicable_quantity_text: String,
//     applicable_quantity_text_color: String,
//     benefit_text: String,
//     description: String,
//     discount: Number,
//     fixed_price: Number,
//     icon_color: String,
//     icon_name: String,
//     name: String,
//     image_text: String,
//     quantity_condition: Number
// }

