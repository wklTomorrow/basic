const loaderUtils = require('loader-utils');
module.exports = function(source) {
    // 获取
    const options = loaderUtils.getOptions(this);
    // this.callback({
    //     Error
    // })
    console.log(options, source);
    // 关闭该 Loader 的缓存功能
    this.cacheable(false);
    // source 为 compiler 传递给 Loader 的一个文件的原内容
    // 该函数需要返回处理后的内容，这里简单起见，直接把原内容返回了，相当于该 Loader 没有做任何转换
    return source.replace('world', 'tomorrow');
};
  