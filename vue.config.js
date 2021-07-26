module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/epoch' : '/epoch',
  devServer: {
    proxy: {
      'epoch/api/account/authored': {
        target: 'http://127.0.0.1:10087',
        changeOrigin: true
      },
      'epoch/api/account': {
        target: 'http://127.0.0.1:9999',
        changeOrigin: true
      },
      'epoch/api/apis': {
        target: 'http://127.0.0.1:9999',
        changeOrigin: true
      }
    },
    port: 10086
  }
}
