const UserModel = require('../../models/user');
const UserInfoModel = require('../../models/userInfo');
const AddressModel = require('../../models/address');
const OrderModel = require('../../models/order');
const formidable = require('formidable');
const util = require('../../utils');



async  function login(req, res, next) {
    let captcha_code = req.cookies.code;
    if (!captcha_code) {
        res.send({
            status: -1,
            message: '验证码获取失败'
        })
        return
    }
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const {username, password, code} = fields;
        try {
            if (!username) {
                throw new Error("用户名错误");
            } else if (!password) {
                throw new Error('密码错误');
            } else if (!code) {
                throw new Error('验证码错误')
            }
        } catch (e) {
            res.send({
                status: -1,
                message: e.message
            });
            return;
        }
        if (code != captcha_code) {
            res.send({
                status: -1,
                message: '验证码错误'
            })
            return;
        }
        let newPassWord = util.encrypt(password);
        try {
            const user = await UserModel.findOne({username});
            if (!user) {
                let time = new Date().getTime();
                let user_id = parseInt(time);
                let regist_time = time;
                const newUser = {user_id, username, password: newPassWord};
                const newUserInfo = {username, user_id, regist_time};
                UserModel.create(newUser);
                const createUser = new UserInfoModel(newUserInfo);
                const userInfo = await createUser.save();
                req.session.user_id = user_id;
                res.send(userInfo);
            } else if (user.password != newPassWord) {
                res.send({
                    status: -1,
                    message: '密码错误'
                })
                return;
            } else {
                req.session.user_id = user.user_id;
                const userInfo = await UserInfoModel.findOne({user_id: user.user_id}, '-_id');
                res.send(userInfo);
            }
        } catch (e) {
            res.send({
                status: -1,
                message: e.message
            })
        }
    });

}

async function changePwd(req, res, next) {
    let captcha_code = req.cookies.code;
    if (!captcha_code) {
        res.send({
            status: -1,
            message: '验证码获取失败'
        })
        return
    }
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const {username, oldPwd, newPwd, newPwd2, code} = fields;
        try {
            if (!username) {
                throw new Error('用户名错误')
            } else if(!oldPwd) {
                throw new Error('必须添加旧密码')
            } else if (!newPwd) {
                throw new Error('必须添加新密码')
            } else if (!newPwd2) {
                throw new Error('必须重复新密码')
            } else if (newPwd != newPwd2) {
                throw new Error('两次密码不一致')
            } else if (!code) {
                throw new Error('必须填写验证码')
            }
        } catch (e) {
            res.send({
                status: -1,
                message: e.message
            })
            return;
        }
        if (code != captcha_code) {
            res.send({
                status: -1,
                message: '验证码错误'
            })
            return;
        }

        const encryptPwd = util.encrypt(oldPwd);
        try {
            const user = await UserModel.findOne({username});
            if (!user) {
                res.send({
                    status: -1,
                    message: '没有该用户'
                })
            } else if (user.password != encryptPwd) {
                res.send({
                    status: -1,
                    message: '密码错误'
                })
            } else {
                user.password = util.encrypt(newPwd);
                user.save();
                res.send({
                    status: 1,
                    message: '修改成功'
                })
            }
        } catch (e) {
            res.send({
                status: -1,
                message: e.message
            })
        }

    })
}

async function getAddress(req, res, next) {
    const user_id = req.params.user_id;
    if (!user_id) {
        res.send({
            status: -1,
            message: '参数错误'
        })
        return
    }
    try {
        const addressList = await AddressModel.find({user_id});
        res.send(addressList);
    } catch (e) {
        res.send({
            status: -1,
            message: '获取地址失败'
        })
    }
}

async function addAddress(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        try {
            await AddressModel.create(fields);
            res.send({
                status: 1,
                message: '添加成功'
            })
        } catch (e) {
            res.send({
                status: -1,
                message: '添加失败'
            })
        }
    })
}

async function deleteAddress(req, res, next) {
    const {user_id, id} = req.params;
    if (!user_id || !id) {
        res.send({
            status: -1,
            message: '参数错误'
        })
        return
    }
    try {
        await AddressModel.findOneAndDelete({id});
        res.send({
            status: 1,
            message: '删除成功'
        })
    } catch (e) {
        res.send({
            status: -1,
            message: e.message
        })
    }
}

async function addOrder(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.send({
                status: -1,
                message: '下单出错！'
            })
        }
        const user_id = req.params.user_id;
        const {shop_id, shop_name, shop_image_path, total_address, cart_list} = fields;
        let amount = 0, total = 0;
        cart_list.forEach(item => {
            amount += parseInt(item.count);
            total += (parseFloat(item.price) * parseFloat(item.count));
        });
        const newOrder = {
            shop_name,
            restaurant_id: shop_id,
            user_id,
            total_address,
            order_list: cart_list,
            restaurant_image_url: shop_image_path,
            total_amount: amount,
            total_quantity: total.toFixed(2)
        }
        try {
            await OrderModel.create(newOrder);
            res.send({
                status: 1,
                message: '添加成功'
            })
        } catch (e) {
            res.send({
                status: -1,
                message: '添加失败'
            })
        }
    })
}

async function getOrder(req, res, next) {
    const {user_id, restaurant_id} = req.params;
    try {
        const order = await OrderModel.find({$and: [{user_id}, {restaurant_id}]})
        res.send(order);
    } catch (e) {
        res.send({
            status: -1,
            message: '查询失败'
        })
    }
}

async function getOrderList(req, res, next) {
    const user_id = req.params.user_id;
    try {
        const list = await OrderModel.find({user_id});
        res.send(list);
    } catch (e) {
        res.send({
            status: -1,
            message: e.message
        })
    }
}

module.exports = {
    login,
    changePwd,
    getAddress,
    addAddress,
    deleteAddress,
    addOrder,
    getOrderList,
    getOrder
};















