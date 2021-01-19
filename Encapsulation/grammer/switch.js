/**
 * 测试switch
 * switch 遵循 === 
 * 不加break 会一直运行下去
 */

function getName(str) {
    let obj = {}
    switch (str) {
        case 'wang': 
        case 'li':
            obj.str = str 
            break;
        case 'liu': 
            obj.name = str
            break;
        default: 
            break
    }
    console.log(obj);
}

getName('wang')
getName('li')
getName('liu')
getName('zhang')
