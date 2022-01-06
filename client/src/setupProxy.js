const { createProxyMiddleware } = require('http-proxy-middleware');

//최신 리액트에서 프록시 설정은 middelware을 통해서 한다.

module.exports = function(app) {

app.use(

'/api',

createProxyMiddleware({

target: 'http://localhost:5000',

changeOrigin: true,

})

);

};