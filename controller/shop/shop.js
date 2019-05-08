const shopModel = require('../../models/shop');
const getDistance = require('../../utils').getDistance;


async function getClassifyList(req, res, next) {
    let geohash = req.query.geohash;
    if (!geohash) {
        res.send({
            status: -1,
            message: '缺少位置信息，请重新选择地址！'
        });
        return;
    }
    let kind = req.query.kind;
    let page = req.query.page;
    let sortBy = req.query.sort_by;
    let isNew = req.query.isNew;
    let isNear = req.query.isNear;
    let obj = {};
    if (sortBy) {
        obj[sortBy] = -1;
    }
    const list =await shopModel.find({$and: [{"category": {$regex: new RegExp(kind, 'g')}}, {"is_new": {$regex: new RegExp(isNew, 'g')}}]}).sort(obj).skip((page - 1) * 10).limit(10);
    if (list && list.length > 0) {
        let geohashArr = geohash.split(',');
        list.forEach(item => {
            let dis = getDistance(geohashArr[0], geohashArr[1], item.latitude, item.longitude);
            item.meter = dis;
            let time = dis < 1000 ? 30 : Math.ceil(dis/1000) * 3 + 30;
            item.distance = dis < 1000 ? dis+'m' : (dis/1000).toFixed(2) + 'km';
            item.order_lead_time = time;
        });
        if (isNear == 2) {
            list.sort((a, b) => a.meter > b.meter);
        }
        res.send(list);
    } else {
        res.send({
            status: -1,
            message: '没有数据'
        })
    }
}

async function searchShop(req, res, next) {
    let geohash = req.query.geohash;
    if (!geohash) {
        res.send({
            status: -1,
            message: '缺少位置信息，请重新选择地址！'
        });
        return;
    }
    let keyword = req.query.keyword;
    const list = await shopModel.find({$or: [{"name": {$regex: new RegExp(keyword, 'g')}}, {"category": {$regex: new RegExp(keyword, 'g')}}]});
    if (list && list.length > 0) {
        let geohashArr = geohash.split(',');
        list.forEach(item => {
            let dis = getDistance(geohashArr[0], geohashArr[1], item.latitude, item.longitude);
            item.meter = dis;
            let time = dis < 1000 ? 30 : Math.ceil(dis/1000) * 3 + 30;
            item.distance = dis < 1000 ? dis+'m' : (dis/1000).toFixed(2) + 'km';
            item.order_lead_time = time;
        });
        res.send(list);
    } else {
        res.send({
            status: -1,
            message: '没有数据'
        })
    }
}

async function getShop(req, res, next) {
    let geohash = req.query.geohash;
    let id = req.query.id;
    if (!id) {
        res.send({
            status: -1,
            message: '缺少参数，请重新选择！'
        });
        return;
    }

    const shop = await shopModel.find({ id : parseInt(id)});
    if (shop && shop.length > 0) {
        let geohashArr = geohash.split(',');
        shop.forEach(item => {
            let dis = getDistance(geohashArr[0], geohashArr[1], item.latitude, item.longitude);
            item.meter = dis;
            let time = dis < 1000 ? 30 : Math.ceil(dis/1000) * 3 + 30;
            item.distance = dis < 1000 ? dis+'m' : (dis/1000).toFixed(2) + 'km';
            item.order_lead_time = time;
        });
        res.send(shop);
    } else {
        res.send({
            status: -1,
            message: '未查询到数据，请重新查询！'
        })
    }
}

module.exports = {
    getClassifyList,
    searchShop,
    getShop
};
