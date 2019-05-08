
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classifySchema = new Schema({
    id: Number,
    image_url: String,
    is_in_serving: Boolean,
    title: String
}, { collection: "classify"});

const Classify = mongoose.model('classify', classifySchema);

module.exports = Classify;