const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {

  app.use(proxy('/weixinapi', 
    {
        "target": "https://api.weixin.qq.com",
        "changeOrigin": true,
        "pathRewrite":{"^/weixinapi":""}
    }))
}
