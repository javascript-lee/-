const express = require('express');
const router = express.Router();

// 显示后台首页的接口
router.get('/admin/index.html', (req, res) => {
    res.sendFile(rootPath + '/view/admin/index.html');
});

// 显示后台登录页的接口
router.get('/admin/login.html', (req, res) => {
    res.sendFile(rootPath + '/view/admin/login.html');
});

router.get('/admin/main_count.html', (req, res) => {
    res.sendFile(rootPath + '/view/admin/main_count.html');
});

module.exports = router;