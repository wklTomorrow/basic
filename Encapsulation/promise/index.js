/**
 * promise 封装
 * @property resolve 成功方法
 * @property reject 失败方法
 * @property then 调用成功后的结果
 * @property pending 计算中状态
 * @property rejected 计算后失败状态
 * @property fulfilled 计算后成功状态
 */



function _promise(fn) {
    let _this = this;
    _this.value = undefined;
    _this.status = 'pending';
    _this.onFulFilledFn = [];
    _this.onRejectedFn = [];
    function resolve(value) {
        if (_this.status === 'pending') {
            _this.status = 'fulfilled';
            _this.value = value;
            _this.onFulFilledFn.forEach(Fn => {
                Fn(_this.value);
            })
        }
    };
    function reject(value) {
        if (_this.status === 'pending') {
            _this.status = 'rejected';
            _this.value = value;
            _this.onRejectedFn.forEach(Fn => {
                Fn(_this.value);
            })
        }
    }
    try {
        fn(resolve, reject);
    } catch (e) {
        console.log(e);
        reject(e);
    }
}

_promise.prototype.then = function (onFulfilled, onRejected) {
    // onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    // onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err};
    let self = this;
    return new _promise((fulContext, rejectContext) => {
        const run = (value) => {
            setTimeout(() => {
                if (typeof onFulfilled !== 'function') {
                    fulContext(value)
                } else {
                    let x = onFulfilled(value);
                    if (x instanceof _promise) {
                        x.then(fulContext, rejectContext)
                    } else {
                        fulContext(x)
                    }
                }
            }, 0)
        }
        const runRej = (value) => {
            setTimeout(() => {
                if (typeof onRejected !== 'function') {
                    rejectContext(value)
                } else {
                    let x = onRejected(value);
                    if (x instanceof _promise) {
                        x.then(fulContext, rejectContext)
                    } else {
                        rejectContext(x)
                    }
                }
            }, 0)
        }
        if (self.status === 'fulfilled') {
            run(self.value)
        }
        if (self.status ===  'rejected') {
            runRej(self.value)
        }
        if (self.status === 'pending') {
            self.onFulFilledFn.push(
                run
            )
            self.onRejectedFn.push(
                runRej
            )
        }
    })
}

/**
 * new _promise().then()
 */

let z = new _promise((resolve, reject) => {
    resolve('hello world')
}).then(val => {
    console.log(val)
    return new _promise((r, j) => {
        r(val + 'sss')
    })
}).then(val => {
    console.log(val, 'next')
})