const captchapng = require('captchapng');

class Captchas {
    constructor() {}

    static async getCaptcha(req, res, next) {
        let num = parseInt(Math.random()*9000+1000);
        let p = new captchapng(80, 30, num);
        p.color(0, 0, 0, 0);
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
        let img = p.getBase64();
        res.cookie('code', num, {maxAge: 60000, httpOnly: true});
        res.send({
            status: 1,
            img: 'data:image/png;base64,' + img
        })
    }
}

module.exports =  Captchas;
