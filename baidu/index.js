const ak = 'kDfbUmCRVg5RGlDzl3ohpywHxemL0ndo';
const ipLocation = 'https://api.map.baidu.com/location/ip';
const searchLocation = 'https://api.map.baidu.com/place/v2/search';
const https = require('https');
const utils = require('../utils');

 function guessCity() {
     return new Promise((resolve, reject) => {
        let query = utils.toQuery({
            coor: 'bd09ll',
            ak
        });
        https.get(ipLocation + query, res => {
            res.on('data', result => {
                resolve(result.toString())
            })
        }).on('error', e => {
            reject(e)
        })
     });
 }

 function searchAddress(city, keyWord) {
    return new Promise((resolve, reject) => {
        let query = utils.toQuery({
            query:  encodeURI(keyWord),
            region: encodeURI(city),
            page_size: 20,
            output: 'json',
            ak
        });
        https.get(searchLocation + query, res => {
            let str = '';
            res.on('data', result => {
                str += result;
            });
            res.on('end', result => {
                resolve(str.toString());
            });

        }).on('error', e => {
            reject(e);
        })
    })
 }




 module.exports = {
     guessCity,
     searchAddress
 };




