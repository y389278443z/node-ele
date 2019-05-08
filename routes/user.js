
const express = require('express');
const userApi = require('../controller/user/user');

const router = express();


router.post('/login', userApi.login);
router.post('/changePwd', userApi.changePwd);
router.get('/:user_id/getAddress', userApi.getAddress);
router.post('/:user_id/addAddress', userApi.addAddress);
router.delete('/:user_id/:id/deleteAddress', userApi.deleteAddress);
router.post('/:user_id/addOrder', userApi.addOrder);
router.get('/:user_id/getOrderList', userApi.getOrderList);
router.get('/:user_id/:restaurant_id/getOrder', userApi.getOrder);

module.exports = router;
