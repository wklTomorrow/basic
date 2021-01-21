(
    function(fn) {
        fn()
    } 
)(function() {
    function Query(dom) {
       return new Query.fn.init(dom)
    }
    Query.fn = Query.prototype = {
        constructor: Query,
        getRandom: function(num) {
            return parseInt(Math.random() * num)
        },
        start: function(opt) {
            let option = {
                height: this.height,
                width: this.width,
                leftSpeed: 20,
                topSpeed: 10,
                num: 1000,
                msg: '*',
                font: '18px Arial',
                colorMax: 255,
                time: 100,
            }
            if (opt !== null && Object.prototype.toString.call(opt) === '[object Objcet]') {
                option = {
                    ...option,
                    ...opt
                }
            }
            let _this = this 
            if (!this.numArr.length) this.numArr = Array.from({length: option.num}, x => ({}))
            this.ctx.clearRect(0, 0, option.width, option.height);
            for (let i = 0; i < this.numArr.length; i++) {
                if (!Object.keys(this.numArr[i]).length) {
                    this.numArr[i] = {
                        r: this.getRandom(option.colorMax),
                        g: this.getRandom(option.colorMax),
                        b: this.getRandom(option.colorMax),
                        left: this.getRandom(option.width),
                        leftLen: this.getRandom(option.leftSpeed),
                        top: this.getRandom(option.height),
                        topLen: this.getRandom(option.topSpeed)
                    }
                }
                let leftLens = this.numArr[i].left + this.numArr[i].leftLen
                let topLens = this.numArr[i].top + this.numArr[i].topLen
                this.numArr[i] = {
                    ...this.numArr[i],
                    left: leftLens > option.width ? 0 : leftLens,
                    top: topLens > option.height ? 0 : topLens
                }
                this.ctx.font = option.font;
                this.ctx.fillStyle = `rgb(${this.numArr[i].r}, ${this.numArr[i].g}, ${this.numArr[i].b})`
                this.ctx.fillText(option.msg, this.numArr[i].left, this.numArr[i].top);
            }
            setTimeout(function () {
                return function() {
                    _this.start(_this.numArr.length)
                }
            }(), option.time);
        }
    }
    Query.fn.init = function(dom) {
        this.dom = document.getElementById(dom.slice(1))
        this.ctx = this.dom.getContext("2d");
        let {offsetHeight, offsetWidth} = this.dom
        this.height = offsetHeight
        this.width = offsetWidth
        this.numArr = []
    }
    Query.fn.init.prototype = Query.fn
    window.$ = Query
})