const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const BasicPlugin = require('./plugins/index');
const LogWebpackPlugin = require('./plugins/LogWebpackPlugin');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  watch: true,
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    // 默认为空
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为 300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    // 默认每秒问 1000 次
    poll: 1000
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: ['babel-loader']
      },
      {
        test: /.js$/,
        include: path.resolve(__dirname, './loader/test.js'),
        use: [{
          loader: path.resolve(__dirname, './loader/index.js'),
          options: {
            type: 1,
            value: 'tomorrow'
          }
        }]
      },
      // {
      //   // 用正则去匹配要用该 loader 转换的 CSS 文件
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     // 转换 .css 文件需要使用的 Loader
      //     use: ['css-loader'],
      //   }),
      // }
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  // plugins: [
  //   new ExtractTextPlugin({
  //     // 从 .js 文件中提取出来的 .css 文件的名称
  //     filename: `[name]_[contenthash:8].css`,
  //   }),
  // ]
  plugins: [
    new HotModuleReplacementPlugin(),
    // 压缩输出的 JS 代码
    new UglifyJSPlugin({
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        // drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      },
      output: {
        // 最紧凑的输出
        beautify: false,
        // 删除所有的注释
        comments: false,
      }
    }),
    new BasicPlugin({
      name: 'tomorrow',
      target: 'do something'
    }),
    new LogWebpackPlugin(function() {
      // Webpack 模块完成转换成功
      console.log('emit 事件发生啦，所有模块的转换和代码块对应的文件已经生成好~')
    } , function() {
      // Webpack 构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作
      console.log('done 事件发生啦，成功构建完成~')
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 1000,
    open: false
  },
  devtool: 'source-map'
};