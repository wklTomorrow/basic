<template>
    <div class="s-type show-area">
        <div class="content" @click="onSelectPoint">
            <span class="content-label" :title="curObj.deviceName">{{ curObj.deviceName }}</span>
            <i class="el-icon-caret-bottom icons"></i>
        </div>
        <div class="content-area" v-if="showArea">
            <el-input size="mini" v-model="searchStr" @keyup.enter.native="onSearchStr" class="content-input" ref="searchInput">
                <i slot="suffix" class="el-input__icon el-icon-close" v-if="searchStr" @click="onEmpty"></i>
                <i slot="prefix" class="el-input__icon el-icon-search" @click="onSearchStr"></i>
            </el-input>
            <div class="content-select">
                <div class="content-item" v-for="(item, index) in selectObj.items" :key="item + index" @click="onSelectCurDevice(item)">
                    <span class="max-length" :title="item.deviceName">{{ item.deviceName }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    import {cloneObj} from "../utils/public";
    export default {
        data() {
            return {
                showArea: false,
                selectObj: {
                    total: 0,
                    items: [],
                    pageNumber: 1,
                    pageSize: 50
                },
                searchStr: '',
                curObj: {
                    deviceName: '当前设备当前设备当前设备当前设备',
                },
                timer: '',
                params: {
                    deviceId: [],
                    iotFlag: 0,
                    pageNumber: 1,
                    pageSize: 50,
                    stationId: '',
                    queryStr: ''
                }
            }
        },
        computed: {
            ...mapState({
                systemInfo: state => state.layout.systemInfo
            })
        },
        mounted() {
            this.params.stationId = this.systemInfo.STATION_ID
            this.initData()
        },
        methods: {
            onEmpty() {
                this.searchStr = ''
            },
            onSearchStr() {

            },
            onSelectCurDevice(item) {
                this.curObj = cloneObj(item)
                this.$emit('onChangeDevice', item)
                this.showArea = false
            },
            async initData() {
                window.onclick = (e) => {
                    if (this.showArea && e.path.length){
                        let flag = false
                        for (let i = 0, j = e.path.length; i < j; i++) {
                            if (e.path[i].className && e.path[i].className.includes('show-area')) {
                                flag = true
                                break
                            }
                        }
                        this.showArea = flag
                    }
                }
                this.selectObj = cloneObj(await this.onGetDevice(this.getDeviceData, this.params))
                console.log(this.selectObj)
            },
            onSelectPoint() {
                let _this = this
                this.showArea = !this.showArea
                this.$nextTick(() => {
                    if (this.showArea) {
                        _this.$refs.searchInput.focus()
                        let dom = document.getElementsByClassName('content-select')[0]
                        let clientHeight = dom.clientHeight
                        dom.addEventListener('scroll', async function (e) {
                            let num = clientHeight + dom.scrollTop
                            if (num === dom.scrollHeight && _this.selectObj.total >= ( _this.selectObj.pageSize * _this.selectObj.pageNumber)) {
                                _this.params.pageNumber++
                                let data = await _this.onGetDevice(_this.getDeviceData, _this.params)
                                _this.selectObj.pageSize = data.pageSize
                                _this.selectObj.pageNumber = data.pageNumber
                                _this.selectObj.total = data.total
                                _this.selectObj.items.push(...data.items)
                            }
                        })
                    }
                })
            },
            onGetDevice(fn, params) {
                return new Promise((resolve, reject) => {
                    fn(params).then(res => {
                        resolve(res)
                    })
                })
            },
            ...mapActions([
                'getDeviceData'
            ])
        },
        watch: {
            searchStr(ele, oldEle) {
                if (this.timer) {
                    clearTimeout(this.timer)
                }
                this.timer = setTimeout(async () => {
                    this.params.queryStr = ele
                    this.params.pageNumber = 1
                    this.params.pageSize = 50
                    this.selectObj = cloneObj(await this.onGetDevice(this.getDeviceData, this.params))
                }, 1000)
            }
        }
    }
</script>
<style lang="less" scoped>
    * {
        box-sizing: border-box;
    }
    .s-type {
        height: 100%;
        width: 100%;
        position: relative;
        .content-area {
            padding: 10px;
            position: absolute;
            top: 100%;
            width: 100%;
            height: 300px;
            border: 1px solid lightgray;
            z-index: 100;
            overflow: hidden;
            background-color: #ffffff;
            .content-input {
                margin-bottom: 10px;
            }
            .content-select {
                width: 100%;
                overflow: auto;
                height: calc(~"100% - 42px");
                .content-item {
                    cursor: pointer;
                    height: 32px;
                    line-height: 32px;
                    font-size: 12px;
                    font-weight: 400;
                    padding: 0 10px;
                    margin-top: 10px;
                    .max-length {
                        display: inline-block;
                        max-width: 80%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    &:first-child {
                        margin-top: 0px !important;
                    }
                    &:hover {
                        background-color: #178DFF;
                        color: #ffffff;
                    }
                }
            }
        }
        .content {
            height: 100%;
            width: 100%;
            color: #178DFF;
            border: 1px solid #178DFF;
            border-radius: 2px;
            cursor: pointer;
            .icons {
                position: absolute;
                right: 10px;
                font-size: 14px;
                line-height: 30px;
            }
            .content-label {
                max-width: 80%;
                font-size: 14px;
                padding-left: 10px;
                font-weight: 400;
                height: 100%;
                display: inline-block;
                line-height: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>