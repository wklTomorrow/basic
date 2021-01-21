function myPromise(fn) {
    let _this = this
    _this.status = 'pending'
    _this.resolveArr = []
    _this.rejectArr = []
    _this.value = null
    _this.reason = null
    function resolve(val) {
        setTimeout(() => {
            if (_this.status === 'pending') {
                _this.value = val
                _this.status = 'fulFilled'
                _this.resolveArr.forEach(Fn => {
                    _this.value = Fn(_this.value)
                })
            }
        })
    }
    function reject(val) {
        setTimeout(() => {
            if (_this.status === 'pending') {
                _this.reason = val
                _this.status = 'rejected'
                _this.rejectArr.forEach(Fn => {
                    _this.reason = Fn(_this.reason)
                })
            }
        })
    }
    try {
        fn(resolve, reject)
    } catch(e) {
        reject(e)
    }
}

myPromise.prototype.then = function(resolveThen, rejectThen) {
    let _this = this
    typeof resolveThen === 'function' && _this.resolveArr.push(resolveThen)
    typeof rejectThen === 'function' && _this.rejectArr.push(rejectThen)
    return _this
}
