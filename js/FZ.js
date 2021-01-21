/**
 * 加法运算
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function go(a, b) {
    return a + b
}

/* 
    熟悉mac注释
*/

/**
 * 封装
 * @param {Object}} options 
 */
async function Ajax(options = {
    url: 'http://www.baidu.com',
    methods: 'POST',
    data: {},
    
    success: function(e) {
        console.log(e)
    },
    fail: function(e) {
        console.log(e)
    }
}) {
    let value = await returnPromise()
    options.success(value)
    // return returnPromise().then(res => {
    //     options.success(res)
    // })
}

const returnPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1000)
        }, 1000);
    })
}

let zz = Ajax(
    {
        success: function(e) {
            console.log(`hello ${e}`)
        }
    }
)
console.log(zz, 1111)