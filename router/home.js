// 处理前台的接口

// 1. 加载express
const express = require('express');
// 2. 创建路由对象
const router = express.Router();
// 3. 将接口挂载到路由对象上

let cate = require('../db/cate.json');
let art = require('../db/article.json')

// 返回首页模板
// router.get('/index.html', (req, res) => {
router.get('/', (req, res) => {
    res.sendFile(rootPath + '/view/home/index.html');
});

// 返回列表页模板
router.get('/list.html', (req, res) => {
    res.sendFile(rootPath + '/view/home/list.html');
});

// 返回详情页模板
router.get('/detail.html', (req, res) => {
    res.sendFile(rootPath + '/view/home/detail.html');
});

// 获取分类
router.get('/getCategory', (req, res) => {
    res.json(cate);
});

// 获取文章
/**
 * bad 焦点关注
 * good 焦点图
 * click 热门排行
 * id 最新发布
 * 
 */
router.get('/getArticles', (req, res) => {
    let flag = req.query.flag || 'click';
    if (flag == 'click' || flag == 'good' || flag == 'bad' || flag == 'id') {
        let num = req.query.num || 5;
        res.json({
            code: 200,
            data: art
                .sort((a, b) => {
                    return b[flag] - a[flag];
                })
                .slice(0, num)
            });
    } else {
        res.json({ code: 201, message: '请求参数错误' });
    }

});

/**
 * 根据分类id获取文章
 * cateid -- 分类id
 */
router.get('/getArticlesByCateId', (req, res) => {
    let cateid = req.query.cateid || null;
    if (cateid) {
        res.json(
            {
                code: 200,
                message: '请求数据成功',
                category: cate.find(item => {
                    return item.id == cateid
                }),
                data: art.filter(item => {
                    return item.cateid == cateid
                })
            }
        );
    } else {
        res.json({ code: 201, message: '请求参数错误' });
    }
});

/**
 * 根据文章id获取一篇文章
 * id -- 文章id
 */
router.get('/getArticleById', (req, res) => {
    let id = req.query.id || null;
    if (id) {
        let data = art.find(item => {
            return item.id == id;
        });
        res.json({
            code: 200,
            message: '请求数据成功',
            category: cate.find(item => {
                return item.id == data.cateid;
            }),
            data: data
        });
    } else {
        res.json({ code: 201, message: '请求参数错误' });
    }
});

/**
 * 上一篇下一篇
 * id -- 当前文章id
 */
router.get('/adjacent', (req, res) => {
    let id = req.query.id || null;
    if (id) {
        res.json({
            code: 200,
            message: '请求数据成功',
            data: {
                prev: art.sort((a, b) => {
                    return b.id - a.id;
                }).find(item => {
                    return item.id < id;
                }),
                next: art.sort((a, b) => {
                    return a.id - b.id;
                }).find(item => {
                    return item.id > id;
                })
            }
        });
    } else {
        res.json({ code: 201, message: '请求参数错误' });
    }
});

// 4. 导出路由对象
module.exports = router;
// 5. app.js 中，加载路由模块，并注册成中间件