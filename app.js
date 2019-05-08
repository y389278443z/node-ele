const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session);
const config = require('./config').config;
require('./mongodb/db');
const router = require('./routes');
const app = express();


app.use(cookieParser());
app.use(session({
    secret: config.session.secret,
    resave:  true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    store: new MongoStore({
        url: config.url
    })
}));


app.use('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/login', (req, res) => {
    req.session.userinfo = '123';
    res.send('登录成功');
})

app.get('/info', (req, res) => {
    if (req.session.userinfo) {
        res.send('welcome' + req.session.userinfo);
    } else {
        res.send('请登录');
    }
})

router(app);
app.use('/public', express.static('public'));
app.listen(config.port ,(err) => {
    if (err) console.log(err);
    console.log('监听成功在：' + config.port);
});

