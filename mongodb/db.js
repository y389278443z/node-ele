const mongoose = require('mongoose');
const config = require('../config').config;

mongoose.connect(config.url, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', () => {
    console.error('连接数据库错误！');
    mongoose.disconnect();
});
db.once('open', console.log.bind(console, '连接数据库成功!'));
db.on('close', () => {
    console.log('数据库断开， 尝试重新连接...');
    mongoose.connect(config.url);
});

module.exports = db;










