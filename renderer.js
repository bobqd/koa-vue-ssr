const path = require('path');

const { createBundleRenderer } = require('vue-server-renderer');

// 动态监听文件发生改变的配置文件
const devConfig = require('./build/dev.config.js');

function renderer(app, cb) {
  // 设置renderer为全局变量，根据环境变量赋值
  let rendererObj;
  //  根据环境变量来生成不同的 BundleRenderer 实列
  if (process.env.NODE_ENV === 'production') {
    // 正式环境
    const template = require('fs').readFileSync('./layout/index.html', 'utf-8');
    // 引入客户端，服务端生成的json文件, html 模板文件
    const serverBundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    rendererObj = createBundleRenderer(serverBundle, {
      runInNewContext: false, // 推荐
      template: template, // 页面模板
      clientManifest // 客户端构建 manifest
    });
    cb(rendererObj)
  } else {
    // 开发环境
    const template = path.resolve(__dirname, './layout/index.html');
    devConfig(app, template, (bundle, options) => {
      console.log('开发环境重新打包......');
      const option = Object.assign({
        runInNewContext: false // 推荐
      }, options);
      rendererObj = createBundleRenderer(bundle, option);
      cb(rendererObj)
    });
  }
}

module.exports = renderer