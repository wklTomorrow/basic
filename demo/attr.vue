<template>
  <div class="attr" v-loading="loading">
    <div class="body-content" v-for="(item, $index) in content" :key="$index">
      <div class="content-h">
        <span>{{ item.name }}</span>
      </div>
      <div class="content-mi">
        <div class="content-mi-c">
          <span class="title-span">CIM编码:</span>
          <span class="content-span span-length" :title="item.code">{{ item.code || "--" }}</span>
        </div>
        <div class="content-mi-c">
          <span class="title-span">数值类型:</span>
          <span class="content-span span-length">{{ item.type || "--" }}</span>
        </div>
        <div class="content-mi-c">
          <span class="title-span">单位:</span>
          <span class="content-span span-length">{{ item.unit || "--" }}</span>
        </div>
        <div class="content-mi-c">
          <span class="title-span">是否枚举:</span>
          <span class="content-span span-length">{{ item.isEnum | filter }}</span>
        </div>
        <div class="content-mi-c">
          <span class="title-span">属性值:</span>
          <span class="content-span span-length max-value-span" :title="item.oldValue">{{ item.oldValue || "--" }}</span>
        </div>
      </div>
      <div class="computer">
        <span class="title-span title">属性值:</span>

        <div class="operate-area span-length" v-if="item.edit">
          <el-select size="mini" v-model="item.value" placeholder="请选择类型" v-if="item.code === 'ElecType'">
            <el-option
                    v-for="(item, index) in eleList"
                    :key="index"
                    :value="item.value"
                    :label="item.value"
            ></el-option>
          </el-select>
          <el-input size="mini" placeholder="请输入" v-model="item.value" v-else></el-input>
          <span class="operate">
            <span class="save-compute" @click="saveThis(item)">保存</span>
            <span class="cancle-compute" @click="cancleThis(item)">取消</span>
          </span>
        </div>
        <div class="computer-area span-length" v-else>
          <span class="value-span">{{ item.value ? item.value : "无" }}</span>
          <i
                  class="el-icon-edit-outline icon"
                  @click="editCompute(item)"
                  v-if="(deviceObj.level === 2 || item.code !==  'ElecType') && role.deviceTree_operation"
          ></i>
        </div>
      </div>
    </div>
    <div class="none-tree" v-if="content.length === 0">
      <div class="tip">
        <div class="img">
          <img src="@images/null@2x.png" alt />
        </div>
        <div class="add-content">暂无信息</div>
      </div>
    </div>
  </div>
</template>
<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    import { cloneObj } from "@utils/public";
    export default {
        props: {
            deviceObj: {
                type: Object
            }
        },
        data() {
            return {
                content: [],
                showCompute: true,
                edit: true,
                loading: false,
                oldValue: [],
                eleList: [],
                newTreeMenu: []
            };
        },
        mounted() {
            this.getAttrData();
            this.getElec();
        },
        filters: {
            filter(v) {
                return (v = v ? "是" : "否");
            }
        },
        computed: {
            ...mapState({
                systemInfo: state => state.layout.systemInfo,
                role: state => state.layout.role
            })
        },
        methods: {
            async getAttrData() {
                // "304036001167454208"String()this.deviceObj.id
                let _this = this
                this.content = []
                if (this.deviceObj.id) {
                    this.loading = true;
                    let arr = []
                    if (_this.deviceObj.pid === '0') {
                        let { data }  = await _this.onPromiseFunc(_this.onGetAttrByDeviceGroupId, _this.deviceObj.id)
                        arr = cloneObj(data) || []
                    } else {
                        let { data } = await _this.onPromiseFunc.call(this, _this.getAttrById, _this.deviceObj.id)
                        arr = cloneObj(data) || []
                    }
                    arr.forEach(e => {
                        e.edit = false
                        e.oldValue = e.value
                    })
                    this.content = cloneObj(arr);
                    this.loading = false
                    // this.getAttrById(this.deviceObj.id).then(res => {
                    //     this.loading = false;
                    //     if (res.code === this.$code.SUCCESS) {
                    //         res.data.forEach(ele => {
                    //             ele.edit = false;
                    //             ele.oldValue = ele.value
                    //         });
                    //         this.content = cloneObj(res.data);
                    //     }
                    // });
                }
            },
            onPromiseFunc(func, param) {
                return new Promise(function (resolve, reject) {
                    func(param).then(res => {
                        resolve(res)
                    })
                })
            },
            getElec() {
                this.getElectricTypeList().then(res => {
                    this.eleList = res;
                });
            },
            ...mapActions([
                "getAttrById",
                "updateAttrValue",
                "getElectricTypeList",
                "getEnergyTree",
                'onGetAttrByDeviceGroupId'
            ]),
            editCompute(ele) {
                // this.oldValue = cloneObj(this.content);
                ele.edit = true;
            },
            saveThis(ele) {
                let that = this;
                console.log(ele)
                if ((ele.type === "双精度型" || ele.type === "整型")) {
                    let newDate = +ele.value;
                    if (newDate != ele.value) {
                        that.$message({
                            message: "必须是数字",
                            type: "error"
                        });
                        return;
                    }
                }

                let params = [
                    {
                        id: ele.id,
                        value: ele.value,
                        deviceId: that.deviceObj.id,
                        code: ele.code,
                        unit: ele.unit
                    }
                ];
                that.loading = true;
                that.updateAttrValue(params).then(res => {
                    if (res.code === that.$code.SUCCESS) {
                        that.$message({
                            message: "修改成功",
                            type: "success"
                        });
                        if (ele.code === "ElecType" && that.deviceObj.level === 2) {
                            let params = {
                                stationId: that.systemInfo.STATION_ID,
                                treeType: "all"
                            };
                            that.getEnergyTree(params).then(r => {
                                if (r.code === that.$code.SUCCESS) {
                                    let mid = cloneObj(r.data.deviceTreeBoList);
                                    that.newTreeMenu = that.dealTreeData(mid, that.deviceObj);
                                    that.loading = false;
                                    that.$emit("refreshTree", that.newTreeMenu);
                                }
                            });
                        } else {
                            that.loading = false;
                        }
                    } else {
                        that.$message({
                            message: "修改失败",
                            type: "error"
                        });
                    }
                    that.getAttrData();
                });
                ele.edit = false;
            },
            cancleThis(ele) {
                ele.value = ele.oldValue
                ele.edit = false;
                // this.content = cloneObj(this.oldValue);
            },
            dealTreeData(ele, val) {
                let obj = {};
                ele.forEach(r => {
                    if (
                        r.deviceTreeTplgyBo.childNodes &&
                        r.deviceTreeTplgyBo.childNodes.length
                    ) {
                        r.deviceTreeTplgyBo.childNodes.forEach(l => {
                            if (l.id === val.id) {
                                obj = l;
                            }
                        });
                    }
                });
                return obj;
            }
        },
        watch: {
            "deviceObj.id"() {
                this.getAttrData();
            }
        }
    };
</script>
<style lang="less" scoped>
  .attr {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
    .max-value-span {
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 60%;
    }
    .body-content {
      // height: 120px;
      border-top: 1px solid #e0e3e5;
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
      .content-h {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
      .content-mi {
        display: flex;
        margin-top: 14px;
        flex-direction: row;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
        .content-mi-c {
          flex: 1;
          box-sizing: border-box;
          padding-right: 10px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .computer {
        margin-top: 14px;
        position: relative;
        .title {
          // display: inline-block;
          // padding-top: 10px;
          padding-top: 0;
          position: absolute;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
          margin-left: 13px;
        }
        .operate-area {
          position: relative;
          width: calc(~"100% - 88px");
          left: 59px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          & /deep/ .el-input--mini .el-input__inner {
            line-height: 20px !important;
            height: 20px !important;
            width: 100px;
          }
          & /deep/ .el-input--mini .el-input__inner {
            line-height: 20px !important;
            height: 20px !important;
          }
          & /deep/ .el-input--mini .el-input__icon {
            line-height: 20px !important;
          }
          & /deep/ .el-input--mini {
            line-height: 20px;
          }
          .operate {
            position: absolute;
            left: 120px;
            line-height: 20px;
            font-weight: 400;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #178dff;
            .save-compute {
              margin-right: 10px;
              cursor: pointer;
              // color: #178dff;
            }
            .cancle-compute {
              cursor: pointer;
            }
          }
        }
        .computer-area {
          position: relative;
          width: calc(~"100% - 88px");
          left: 59px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          .value-span {
            line-height: 21px;
            color: #999999;
          }
          i {
            margin-left: 10px;
            color: #178dff;
            cursor: pointer;
          }
        }
        .span-edit-h {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
          .span-edit {
            color: rgba(23, 141, 255, 1);
            cursor: pointer;
          }
        }
      }
    }
    .none-tree {
      width: 100%;
      height: 100%;
      position: relative;
      .tip {
        position: absolute;
        top: 100px;
        width: 100%;
        height: 100px;
        .img {
          margin: 0 auto;
          height: 200px;
          width: 200px;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .add-content {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 25px;
        }
      }
    }
  }
</style>
