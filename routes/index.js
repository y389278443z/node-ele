const img = require('./img');
const location = require('./location');
const shop = require('./shop');
const user = require('./user');


module.exports = (app) => {
    app.use('/img', img);
    app.use('/loc', location);
    app.use('/shop', shop);
    app.use('/user', user);
};