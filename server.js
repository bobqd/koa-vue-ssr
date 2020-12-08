const Koa = require('koa'); // 引入koa
const router = require('./routers');
const renderer = require('./renderer')

const app = new Koa(); // 创建koa应用

// 引入缓存相关的模块
const LRU = require('lru-cache');

// 缓存
const microCache = new LRU({
    max: 100,
    maxAge: 1000 * 60 // 在1分钟后过期
});

// 将渲染器、缓存挂载到上下文
renderer(app, (obj) => { 
    app.context.renderer = obj
    app.context.microCache = microCache
})

app.use(router.routes());
app.use(router.allowedMethods({ 
    // throw: true, // 抛出错误，代替设置响应头状态
    // notImplemented: () => '不支持当前请求所需要的功能',
    // methodNotAllowed: () => '不支持的请求方式'
}));

// 启动服务监听本地3005端口
app.listen(3005, () => {
    console.log('应用已经启动，http://localhost:3005');
})