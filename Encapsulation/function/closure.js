function sayHi() {
    let msg = 'hi'
    return function() {
        console.log(msg)
    }
}

sayHi()()