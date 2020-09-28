/**
 * 插入dom元素
 */
const fn = () => {
    console.log('hello')
    let dom = document.getElementById('myDiv')
    let div = document.createElement('DIV')
    let test = document.createTextNode('hello world')
    let attr = document.createAttribute('style')
    attr.value = "color: red; height: 100px; width: 100px; border: 1px solid red"
    div.setAttributeNode(attr)
    div.appendChild(test)
    // div.setAttribute('style', '')
    let inP = document.createElement('select')
    inP.setAttribute('selectedIndex', 1)
    inP.setAttribute('id', 'select')
    inP.style.width = '100px'
    let content = [
        { name: 'test1', code: '1' },
        { name: 'test2', code: '2' },
        { name: 'test3', code: '3' },
    ]
    content.forEach(ele => {
        let doms = document.createElement('option')
        doms.setAttribute('label', ele.name)
        doms.setAttribute('value', ele.code)
        inP.appendChild(doms)
        if (ele.code === '2') {
            doms.setAttribute('selected', 'selected')
        }
    })
    div.appendChild(inP)
    // 
    let btn = document.createElement('button')
    btn.innerText = '点我获取当前选中的值'
    btn.setAttribute('title', 'button')
    btn.addEventListener('click', function(e) {
        let doms = document.getElementById('select')
        console.log(doms.value)
    })
    let span = document.createElement('SPAN')
    span.innerText = 'span'
    div.appendChild(btn)
    div.appendChild(span)
    dom.appendChild(div)
    let d1 = document.createElement('div')
    let a = document.createAttribute('style')
    a.value = 'color: red; height: 100px; width: 100px; border: 1px solid red'
    d1.setAttributeNode(a)
    const list = [
        'li',
        'wang',
        'hello'
    ]
    let u = document.createElement('ul')
    list.forEach(ele => {
        let li = document.createElement('li')
        li.innerText = ele
        u.appendChild(li)
    })
    d1.appendChild(u)
    dom.appendChild(d1)
}

window.fn = fn