
const categoryModel = require('../../models/category');

async function getCategory(req, res, next) {
    const category = await categoryModel.find({}, '-_id');
    if (category) {
        res.send(category)
    } else {
        res.send({
            status: -1,
            message: '没有数据'
        })
    }
}


module.exports = {
    getCategory
};