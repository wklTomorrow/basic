/**
 * vue event
 * event.emit()
 * event.on()使用
 * this.emit(name, param1, param2...)
 * this.on(name, cb(e) {
 *  console.log(e)
 * })
 */

let events = {}

module.exports = {
    emit(name, ...args) {  
        events[name].forEach(item => {
            item(args)
        })
    },
    on(name, cb) {
        events[name] ? events[name].push(cb)
            : events[name] = Object.assign([], [cb])
    },
    remove(name) {
        events[name] && delete events[name]
    },
    getThis() {
        return events
    }
}