function test(obj, prop, other) {
    console.log(obj, prop, other)
}

test({name: 10}, {age: +'test'})
test({name: 10})