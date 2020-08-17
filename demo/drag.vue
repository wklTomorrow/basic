<template>
    <div id="webId">
        <div>你的web页面</div>
        <!-- 如果碰到滑动问题，1.1 请检查这里是否属于同一点。 -->
        <!-- 悬浮的HTML -->
        <div class="xuanfu" id="moveDiv"
             @mousedown="down" @touchstart="down"
        @mousemove="move" @touchmove.prevent="move"
        @mouseup="end" @touchend="end"
        >
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                curPos: {
                    x: '',
                    y: ''
                },
                tarPos: {
                    x: '',
                    y: ''
                },
                flag: false,
                dom: ''
            }
        },
        mounted() {
            this.dom = document.getElementById('moveDiv')
        },
        methods: {
            down() {
                this.flag = true
                let touch
                if(event.touches){
                    touch = event.touches[0];
                }else {
                    touch = event;
                }
                this.tarPos.x = touch.clientX
                this.tarPos.y = touch.clientY
                this.curPos.x = this.dom.offsetLeft
                this.curPos.y = this.dom.offsetTop
            },
            move() {
                if (this.flag) {
                    let touch
                    if(event.touches){
                        touch = event.touches[0];
                    }else {
                        touch = event;
                    }
                    let nx = touch.clientX - this.tarPos.x
                    let ny = touch.clientY - this.tarPos.y
                    let cx = this.curPos.x + nx
                    let cy = this.curPos.y + ny
                    this.dom.style.left = cx + 'px'
                    this.dom.style.top = cy + 'px'
                    document.addEventListener("touchmove",function(){
                        event.preventDefault();
                    },false);
                }
            },
            end() {
                this.flag = false
            }
        }
    }
</script>

<style lang="less" scoped>
    #webId {
        height: 1000px;
        width: 1000px;
        border: 1px solid red;
        position: relative;

        .xuanfu {
            position: absolute;
            height: 100px;
            width: 100px;
            background-color: blue;
            left: 0;
            top: 0;
        }
    }
</style>