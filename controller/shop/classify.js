const classifyModel = require('../../models/classify');

async function getClassify(req, res, next) {
    const classify = await classifyModel.find({}, '-_id');
    if (classify && classify.length > 0) {
        res.send(classify);
    } else {
        res.send({
            status: -1,
            message: '没有数据'
        })
    }
}


module.exports = {
    getClassify
};
