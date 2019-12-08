const webpack = require('webpack')
module.exports = {
  devServer: {
    port:8081,
    open:true,
    hot:true
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ]
  }
}
