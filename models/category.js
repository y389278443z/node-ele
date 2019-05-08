const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    count: Number,
    image_url: String,
    id: String,
    ids: Array,
    sub_categories: Array,
    name: String
}, {collection: "category"});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;


