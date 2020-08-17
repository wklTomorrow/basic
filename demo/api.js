(function(){
    let objes = {}
    let jQuery = function(dom) {
        let domEle = document.querySelectorAll(dom)
        return new jQuery.fn.init(domEle[0])
    }
    jQuery.fn = jQuery.prototype = {
        construct: jQuery,
        init: function (dom) {
            this.dom = dom
            console.log(this)
            return this
        },
        html: function() {
            this.dom.style.color = 'red'
            return this
        }
    }
    jQuery.sayName = function() {
        console.log('wang')
    }
    jQuery.fn.extend = jQuery.extend = function (obj) {
        for (let i in obj) {
            this[i] = obj[i]
        }
        return this
    }

    jQuery.fn.extend({
        each: function() {
            return this
        }
    })

    jQuery.extend({
        ajax: function() {
            console.log(this)
        }
    })

    jQuery.fn.init.prototype = jQuery.fn
    window.$ = jQuery
})()