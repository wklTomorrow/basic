/**
 * axios
 * axios({
 *      type: 'get',
 *      data: {}
 * })
 * axios.get(url, params)
 */
/**
 * 请求、响应拦截器
 * axios.interceptors.request.use(resolve, reject)
 * axios.interceptors.response.use(resolve, reject)
 */
class Interceptor {
    constructor() {
        this.handle = []
    }
    use(successFn, failFn) {
        this.handle.push({
            successFn,
            failFn
        })
    }
}

class _axios {
    constructor() {
        this.interceptors = {
            request: new Interceptor(),
            response: new Interceptor()
        }
    }
    request(config) {
        let queue = [this.senParams.bind(this), null]
        this.interceptors.request.handle.forEach(fn => {
            queue.unshift(fn.successFn, fn.failFn)
        })
        this.interceptors.response.handle.forEach(fn => {
            queue.push(fn.successFn, fn.failFn)
        })
        // 把参数传递下去
        let promise = Promise.resolve(config)
        while (queue.length) {
            promise = promise.then(queue.shift(), queue.shift())
        }
        return promise
    }
    senParams({
        method = 'POST',
        data = {},
        url = ''
    }) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open(method, url, true)
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(xhr.response)
                }
            }
            xhr.send(data)
        })
    }
}

let methods = ['GET', 'POST', 'PUT', 'DELETE']

methods.forEach(method => {
    _axios.prototype[method] = function() {
        return this.request({
           method,
           ...arguments[0]
        })
    }
})

const createAxios = function() {
    let axios = new _axios()
    let req = axios.request.bind(axios)
    extentds(req, _axios.prototype, axios)
    extentds(req, axios)
    return req
}

/**
 * 原型继承工具函数
 */
function extentds(current, target, context) {
    for (let i in target) {
        if (target.hasOwnProperty(i)) {
            if (typeof target[i] === 'function') {
                current[i] = target[i].bind(context)
            } else {
                current[i] = target[i]
            }
        }
    }
}

window.axios =  new createAxios();