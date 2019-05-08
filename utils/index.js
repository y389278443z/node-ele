const crypto = require('crypto');

function __rad(d) {
    return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
}

function toQuery(obj) {
    let keys = Object.keys(obj);
    if (keys && keys.length > 0) {
        let str = '?';
        keys.forEach(item => {
            str += `${item}=${obj[item]}&`;
        });

        return str.slice(0, -1);
    }
    return '';
}


//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
function getDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = __rad(lat1);
    var radLat2 = __rad(lat2);
    var a = radLat1 - radLat2;
    var b = __rad(lng1) - __rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // 地球半径，千米;
    return s.toFixed(3) * 1000;
}

function encrypt(str) {
    return crypto.createHash('sha256').update(str.toString()).digest('hex');
}



module.exports = {
    toQuery,
    getDistance,
    encrypt
};

