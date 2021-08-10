module.exports = {
  devServer: {
    host: 'localhost',
    port: 8082,
    proxy: {
      '^/': {
        ws: false,
        target: 'http://localhost:9090',
        changeOrigin: true,
        /*不重写请求地址*/
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
}
