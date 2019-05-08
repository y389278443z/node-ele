const menuModel = require('../../models/menu');
const commentModel = require('../../models/comment');

async function getMenu(req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.send({
            status: -1,
            message: '参数错误，请重新选择！'
        });
        return;
    }

    const menu = await menuModel.find({id: parseInt(id)});

    if (menu && menu.length > 0) {
        res.send(menu);
    } else {
        res.send({
            status: -1,
            message: '未获取到信息，请重新获取！'
        })
    }


}

async function getComment(req, res, next) {
    let page = req.query.page;
    let tag_name = req.query.tag_name;
    let gt, lt;
    if (tag_name == 0) {
        gt = 0;
        lt = 6;
    } else if (tag_name == 1) {
        gt = 3;
        lt = 6;
    } else {
        gt = 0;
        lt = 3;
    }
    const comment = await commentModel.find({$and: [{ rating: {$gte: gt}}, {rating: {$lt: lt}}]}).skip((page - 1) * 10).limit(10);
    if (comment && comment.length > 0) {
        res.send(comment);
    } else {
        res.send({
            status: -1,
            message: '未查询到相关信息，请重新查询！'
        })
    }
}


module.exports = {
    getMenu,
    getComment
};
