
let w = {
    target: function(newVal, val) {
        console.log(newVal, val)
    }
}

let uid = 0

function defineReactive(data, key, value) {
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            dep.depend()
            return value
        },
        set: function(val) {
            if (val === value) {
                return
            }
            dep.notify(value, val)
            value = val
        }
    })
}

class Dep {
    static target() {
        console.log(arguments)
    }
    constructor() {
        this.id = ++uid
        this.subArr = []
    }

    addSub(value) {
        this.subArr.push(value)
    }

    depend(value) {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }

    notify() {
        const subs = this.subArr.slice()
        for (let i = 0; i < subs.length; i++) {
            subs[i](arguments)
        }
    }
}

let obj = {
    name: 'test',
    params: {
        age: 10,
    }
}

defineReactive(obj, 'name', obj.name)

console.log(obj.name)

obj.name = 'hello'