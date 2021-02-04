/**
 * 一个初始化的函数
 * 函数调取函数内部的方法
 */
let fn = {
    obverse: {
        getId({id = 1, service}) {
            return service.onGetId({id: id})
        }
    },
    service: {
        onGetId({id = 0}, {onCancel}) {
            console.log(id, 1111)
            onCancel(id)
        },
        onGetName({onCancel}) {
            console.log('name')
            return
        }
    }
}

let s = {
    obverse: {}
}

let obj = {}

Object.keys(fn.service).map(ele => {
    obj[ele] = params => fn.service[ele](params, {
        onCancel: e => {console.log(e)}
    })
    return ele
})

Object.keys(fn.obverse).map(ele => {
    s.obverse[ele] = params => fn.obverse[ele]({
        params,
        service: obj
    })
    return ele
})

// console.log(obj.onGetId({}))
// console.log(s.obverse.getId())