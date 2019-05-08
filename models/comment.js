const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'default_header.png'
    },
    order_images: {
        type: Array,
        default: []
    },
    food_names: {
        type: Array,
        default: []
    },
    rated_at: Number,
    rating: Number,
    rating_text: String,
    reply: {
        content: String,
        created_at: String,
        time_spent_desc: String,
        username: String
    }
}, {collection: 'comments'});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
