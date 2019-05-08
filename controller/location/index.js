const baidu = require('../../baidu');
const cities = require('../../data/cities');


async function GuessCity(req, res, next) {
    let result = await baidu.guessCity();
    let obj = JSON.parse(result);
    if (obj.status == 0) {
     let detail = obj.content.address_detail;
     res.send({
         status: 1,
         name: detail.city,
         latitude: obj.content.point.y,
         longitude: obj.content.point.x
     })
    }
    res.end(result);
}




function hotCity(req, res, next) {
    let hotArr = [
        { name: "上海", latitude: 31.23037, longitude: 121.473701,},
        { name: "北京", latitude: 39.90469, longitude: 116.407173,},
        { name: "南京", latitude: 31.84178, longitude: 118.504669},
        { name: "广州", latitude: 23.12908, longitude: 113.264359},
        { name: "厦门", latitude: 24.479509, longitude: 118.089478},
        { name: "杭州", latitude: 30.274151, longitude: 120.155151},
        { name: "天津", latitude: 39.085098, longitude: 117.199371},
        { name: "青岛", latitude: 36.066231, longitude: 120.382988}
    ];
    res.send({
        status: 1,
        result: hotArr
    })
}


function getAllCity (req, res, next) {
    res.send(cities);
}


async function searchPlace(req, res, next) {
    let city = req.query.city,
        keyWord = req.query.keyWord;
    if (city && keyWord) {
        let result = await baidu.searchAddress(city, keyWord);
        res.send({
            status: 1,
            result
        })

    } else {
        res.send({
            status: -1,
            message: '参数不正确，请检查参数'
        })
    }
}



module.exports = {
     GuessCity,
    hotCity,
    getAllCity,
    searchPlace
}