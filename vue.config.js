module.exports = {
  outputDir: 'dist',
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 9000,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'https://www.wanandroid.com',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
