class BasicPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        console.log(this.options);
        // compiler.plugin('emit', function(compilation, callback) {
        //     // console.log(compilation.chunks);
        //     console.log(compilation.assets[0]);
        //     callback();
        // })
        // 监听文件变化
        // compiler.plugin('watch-run', (watching, callback) => {
        //     // 获取发生变化的文件列表
        //     const changedFiles = watching.compiler.watchFileSystem.watcher.mtimes;
        //     // changedFiles 格式为键值对，键为发生变化的文件路径。
        //     if (changedFiles[filePath] !== undefined) {
        //       // filePath 对应的文件发生了变化
        //     }
        //     callback();
        // });
    }
}

module.exports = BasicPlugin;