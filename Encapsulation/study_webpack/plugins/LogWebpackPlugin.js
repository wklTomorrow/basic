class LogWebpackPlugin {
    constructor(doneCallback, emitCallback) {
      this.emitCallback = emitCallback
      this.doneCallback = doneCallback
    }
    apply(compiler) {
        compiler.plugin('emit', (emit, callback) => {
            this.emitCallback();
            callback()
        })
        compiler.plugin('done', (done, callback) => {
            this.doneCallback();
        })
        compiler.plugin('compilation', (done, callback) => {
            console.log("The compiler is starting a new compilation...")
        })
        compiler.plugin('compile', (compile, callback) => {
            console.log("The compiler is starting to compile...")
        })
    //   compiler.hooks.done.tap('LogWebpackPlugin', function() {
    //     // 在 done 事件中回调 doneCallback
    //     this.doneCallback();
    //   });
    //   compiler.hooks.compilation.tap('LogWebpackPlugin', function() {
    //     // compilation（'编译器'对'编译ing'这个事件的监听）
    //     console.log("The compiler is starting a new compilation...")
    //   });
    //   compiler.hooks.compile.tap('LogWebpackPlugin', function() {
    //     // compile（'编译器'对'开始编译'这个事件的监听）
    //     console.log("The compiler is starting to compile...")
    //   });
    }
  }
  
  // 导出插件
  module.exports = LogWebpackPlugin;