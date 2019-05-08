
const express = require('express');
const classify = require('../controller/shop/classify');
const getClassifyList = require('../controller/shop/shop');
const getCategory = require('../controller/shop/category');
const getMenu = require('../controller/shop/menu');
const router = express();

router.get('/classify', classify.getClassify);
router.get('/getClassifyList', getClassifyList.getClassifyList);
router.get('/searchShop', getClassifyList.searchShop);
router.get('/getCategory', getCategory.getCategory);
router.get('/getShop', getClassifyList.getShop);
router.get('/getMenu/:id', getMenu.getMenu);
router.get('/getComment', getMenu.getComment);
module.exports = router;