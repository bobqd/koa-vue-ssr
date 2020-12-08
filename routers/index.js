const Router = require('koa-router'); // 引入koa-router
const router = new Router(); // 创建路由，支持传递参数
const send = require('koa-send');
const Controller = require('../controllers')

// 设置静态资源文件
router.get('/static/(.*)', async(ctx, next) => {
  await send(ctx, ctx.path, { root: __dirname + '/../dist' });
});

router.get('/home', Controller.home)

module.exports = router;