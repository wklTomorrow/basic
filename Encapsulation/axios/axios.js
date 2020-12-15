// axios(config);
function extend (a, b, context) {
    for (let key in b) {
        if (b.hasOwnProperty(key)) {
            if (typeof b[key] === 'function') {
                a[key] = b[key].bind(context);
            } else {
                a[key] = b[key];
            }
        }
    }
}

class InterceptorsManage {
    constructor() {
        this.handle = [];
    }
    use(onFulField, onReject) {
        this.handle.push({
            onFulField,
            onReject
        })
    }
}
class Axios {
    constructor() {
        this.interceptors = {
            response: new InterceptorsManage(),
            request: new InterceptorsManage()
        }
    };
    request(config) {
        const chain = [this.sendAjax.bind(this), undefined];
        this.interceptors.request.handle.forEach(interceptor => {
            chain.unshift(interceptor.onFulField, interceptor.onReject);
        });
        this.interceptors.response.handle.forEach(interceptor => {
            chain.push(interceptor.onFulField, interceptor.onReject);
        });
        let promise = Promise.resolve(config);
        while(chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
    }
    sendAjax(config) {
        return new Promise((resolve, reject) => {
            const {data = {}, url = '', method = 'get' } = config;
            let xml = new XMLHttpRequest();
            xml.open(method, url, true);
            xml.onreadystatechange = () => {
                if (xml.readyState === 4 && xml.status === 200) {
                    resolve(xml.responseText);
                }
            };
            xml.send(JSON.stringify(data));
        })
    }
}
// axios.methods(get, post, delete)
const Methods = ['get', 'post', 'put'];
Methods.forEach(method => {
    Axios.prototype[method] = function () {
        return this.request({
            method: method,
            ...arguments[0]
        });
    }
})

function CreateAxios() {
    let axios = new Axios();
    let req = axios.request.bind(axios);
    extend(req, Axios.prototype, axios);
    extend(req, axios);
    return req;
}

window.axios = new CreateAxios();

// axios.get(url, parmas)