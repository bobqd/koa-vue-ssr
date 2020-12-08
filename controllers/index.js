// 需要缓存的页面
const isCacheable = ctx => {
  if (ctx.url === '/home') {
    return true;
  }
  return false;
}

class Main {
  // 首页控制器
  async home(ctx, next) {
    // 页面信息
    const context = {
      url: ctx.url,
      title: 'vue服务器渲染组件',
      meta: `
        <meta charset="utf-8">
        <meta name="" content="vue服务器渲染组件">
      `
    }
    // 判断是否缓存，需要缓存，且缓存中有的话，直接把缓存中返回
    const cacheable = isCacheable(ctx)
    if (cacheable) {
      const hit = ctx.microCache.get(ctx.url)
      if (hit) {
        console.log('从缓存中取', hit)
        return ctx.body = hit;
      }
    }
    try {
      // vue 实列转换成字符串
      const html = await ctx.renderer.renderToString(context)
      ctx.status = 200
      ctx.body = html
      if (cacheable) {
        ctx.microCache.set(ctx.url, html)
      }
    } catch(e) {
      console.log(e);
      ctx.status = 500;
      ctx.body = '服务器错误';
    }
    next();
  }
}

module.exports = new Main()