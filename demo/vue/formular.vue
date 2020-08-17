<template>
  <div class="formula">
    <el-dialog 
      title="设置计算公式" 
      :visible.sync="formulaFlag"
      width="1200px"
      top="4%"
      :before-close="dialogClose"
      :close-on-click-modal="false"
    >
      <div class="formula-content" v-loading="loading">
        <div class="for-top">
          <div>
            <div class="top-title">Y:</div>
            <div class="top-title" :title="pointProcessed._sysCode">{{pointProcessed._sysCode}}</div>
            <div class="top-title" :title="pointProcessed._deviceName">{{pointProcessed._deviceName}}</div>
            <div class="top-title" :title="pointProcessed.code + ' ,' + pointProcessed.name">{{pointProcessed.code}}, {{pointProcessed.name}}</div>
            <!--<div class="item item5">输出项</div>-->
            <div class="top-title">输出项&nbsp;<span class="item5-j" :class="{'item5-j5': timeSharing  === '时间'}">{{timeSharing}}</span></div>
          </div>
        </div>
        <div class="for-con">
          <div class="con-tit">
            输入项选择
          </div>
          <div class="con-body">
            <div class="body-header">
              <el-select size="small" class="width-100 margin-right-10"></el-select>
              <div class="header-select">
                <span class="margin-right-10">系统对象</span>
                <el-select size="small" class="width-120 margin-right-10"></el-select>
                <span class="margin-right-10">设备级对象</span>
                <el-select size="small" class="width-300 margin-right-10"></el-select>
                <el-select size="small" class="width-90 margin-right-10"></el-select>
                <el-select size="small" class="width-200 margin-right-10"></el-select>
              </div>
              <!--<div class="header-select">-->
                <!--<span class="margin-right-10">选择分类</span>-->
                <!--<el-select size="small" class="width-120 margin-right-10"></el-select>-->
                <!--<span class="margin-right-10">选择依据</span>-->
                <!--<el-select size="small" class="width-120 margin-right-10"></el-select>-->
              <!--</div>-->
              <span class="opt-btn">+添加</span>
            </div>
            <div class="body-content">
              <div class="content-items" v-for="(m, index ) in list" :key="index">
                <div class="content-item1 content-i margin-right-10">{{m.paramCode || ''}}</div>
                <div class="content-item2 content-i">
                  <div class="content-i" :title="m.trdPtyCode" v-if='m.type !== 4'>{{m.trdPtyCode || ''}}</div>
                  <div class="content-i" v-else='m.type !== 4'></div>
                  <div class="content-i" :title="m.deviceName">{{m.deviceName || ''}}</div>
                  <div class="content-i" v-if="m.type !== 4" :title="(m.anotherCode || m.code) + ' ,' + m.codeName">{{m.anotherCode || m.code || '--'}}&nbsp;,{{m.codeName || '--'}}</div>
                  <div class="content-i" v-if="m.type === 4" :title="m.code + ' ,' + m.codeName">{{m.code || '--'}}&nbsp;,{{m.codeName || '--'}}</div>
                  <div class="content-i" :title='m.unit'>{{m.unit || '--'}}</div>
                </div>
                <div class="content-i">
                  <el-select
                          size="small"
                          class="width12"
                          v-model='m.aggregator'
                          filterable
                          :disabled="m.aggregatorUsable === false || devicePoint.cycleCode === 'ApeCtns'"
                          v-if="m.type === 1 || m.type === 3"
                  >
                    <el-option
                            v-for="(item,index) in m.aggregatorList"
                            :key="index"
                            :label="item.value"
                            :value="item.key">
                    </el-option>
                  </el-select>
                </div>
                <div class="comment-del">
                  <i class="el-icon-close" v-if="m.deletable" @click="del(m)"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="for-bottom">
          <div class="con-tit">
            编辑公式
          </div>
          <div class="con-body">
            <div class="body-header">
              <span class="abcd" v-if="periodList.length > 0">
                  公式设置&nbsp;&nbsp;
                <el-checkbox-group class="header-detail" size="mini" v-model="timeArr" @change="checkboxFun">
                  <el-checkbox :label="m.period" :disabled="m.readonly" v-for='(m, index) in periodList' :key="index">{{m.periodName}} </el-checkbox>
                </el-checkbox-group>
              </span>
              <span class="header-content">
                <span class="margin-right-10">单位</span>
                <el-select size="small" class="width-80"></el-select>
              </span>
            </div>
            <div class="body-content">
              <el-input
                      class="body-content-input"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 10}"
                      placeholder="请在此处进行公式编辑，例如：C1+C2*C1"
                     >
              </el-input>
            </div>
          </div>
        </div>
        <div class="for-set-time">

        </div>
        <div class="formula-top">
          <div class="formula-top-left">
            <div class="formula-title">选取输入数据</div>
            <div class="left-form formula-con">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="项目数据" name="first">
                  <div class="item">
                    <span class="item-title">系统对象</span>
                    <el-select
                      size="small"
                      class="width"
                      v-model="formulaForm.system"
                      filterable
                      placeholder="请选择系统对象"
                      @change="systemFun"
                      >
                        <el-option
                          v-for="(item,index) in systemList"
                          :key="index"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                      </el-select>
                  </div>
                  <div class="item">
                    <span class="item-title">设备级对象</span>
                    <el-select
                      size="small"
                      class="width"
                      filterable
                      v-model="formulaForm.device"
                      @change="deviceFun"
                      placeholder="请选择设备级对象"
                      >
                      <el-option
                        v-for="(item,index) in deviceList"
                        :key="index"
                        :label="item.deviceId + ' ' + item.name + '(' + item.cimCode + ')'"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="item">
                    <span class="item-title item-title-radio"><el-radio v-model="radio" label="1">量测数据</el-radio></span>
                    <el-select
                      size="small"
                      class="width"
                      filterable
                      v-model="formulaForm.point"
                      placeholder="请选择量测数据"
                      :disabled="radio == 2"
                      >
                        <el-option
                          v-for="(item,index) in pointList"
                          :key="index"
                          :class="{'point-0': item.dataStatus === 0, 'point-1':  item.dataStatus === 1,'point-2': item.dataStatus === 2}"
                          :label="item.dataCode + ' ' + item.name"
                          :value="item.dataCode">
                        </el-option>
                      </el-select>
                  </div>
                  <div class="item item1">
                    <span class="item-title"><el-radio v-model="radio" label="2">固有属性</el-radio></span>
                    <el-select
                      size="small"
                      class="width"
                      filterable
                      v-model="formulaForm.inherent"
                      placeholder="请选择固有属性"
                      :disabled="radio == 1"
                      >
                      <el-option
                        v-for="item in inherentList"
                        :key="item.metaId"
                        :label="item.name"
                        :value="item.metaId">
                      </el-option>
                    </el-select>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="公共数据" name="second">
                  <div class="item">
                    <span class="item-title">选择分类</span>
                    <el-select
                      size="small"
                      class="width"
                      v-model="publicForm.pType"
                      filterable
                      placeholder="请选择分类"
                      @change="pTypeFun"
                      >
                        <el-option
                          v-for="(item,index) in typeList"
                          :key="index"
                          :label="item.tagName"
                          :disabled="item.tagCode === 'cumDur' && pubFlag || item.tagCode === 'elecPrice' && !isPrice"
                          :value="item.tagCode">
                        </el-option>
                      </el-select>
                  </div>
                  <div class="item">
                    <span class="item-title">选择数据</span>
                    <el-select
                      size="small"
                      class="width"
                      filterable
                      v-model='publicForm.pData'
                      @change="pDataFun"
                      >
                      <el-option
                        v-for="(item,index) in dataList"
                        :key="index"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <div class="item item2">
                <el-button type="primary" @click="add">输入</el-button>
              </div>
            </div>
          </div>
          <div class="formula-top-center">
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="formula-top-right">
            <div class="formula-title">总览</div>
            <div class="right-talbe formula-con" ref='formulaCon'>
              <div class="items item-y">
                <div class="item item1">Y:</div>
                <div class="item item2" :title="pointProcessed._sysCode">{{pointProcessed._sysCode}}</div>
                <div class="item item3" :title="pointProcessed._deviceName">{{pointProcessed._deviceName}}</div>
                <div class="item item4" :title="pointProcessed.code + ' ,' + pointProcessed.name">{{pointProcessed.code}}, {{pointProcessed.name}}</div>
                <div class="item item7"></div>
                <div class="item item6"></div>
                <!--<div class="item item5">输出项</div>-->
                <div class="item item5">输出项&nbsp;<span class="item5-j" :class="{'item5-j5': timeSharing  === '时间'}">{{timeSharing}}</span></div>

              </div>
              <div class="items" v-for="(m, index ) in list" :key="index">
                <div class="item item1">{{m.paramCode || ''}}</div>
                <div class="item item2" :title="m.trdPtyCode" v-if='m.type !== 4'>{{m.trdPtyCode || ''}}</div>
                <div class="item item2" v-else='m.type !== 4'></div>
                <div class="item item3" :title="m.deviceName">{{m.deviceName || ''}}</div>
                <div class="item item4" v-if="m.type !== 4" :title="(m.anotherCode || m.code) + ' ,' + m.codeName">{{m.anotherCode || m.code || '--'}}&nbsp;,{{m.codeName || '--'}}</div>
                <div class="item item4" v-if="m.type === 4" :title="m.code + ' ,' + m.codeName">{{m.code || '--'}}&nbsp;,{{m.codeName || '--'}}</div>
                <div class="item item7" :title='m.unit'>{{m.unit || '--'}}</div>
                <div class="item item6">
                  <el-select
                    size="small"
                    class="width12"
                    v-model='m.aggregator'
                    filterable
                    :disabled="m.aggregatorUsable === false || devicePoint.cycleCode === 'ApeCtns'"
                    v-if="m.type === 1 || m.type === 3"
                    >
                    <el-option
                      v-for="(item,index) in m.aggregatorList"
                      :key="index"
                      :label="item.value"
                      :value="item.key">
                    </el-option>
                  </el-select>
                </div>
                <div class="item item5">
                  <i class="el-icon-close" v-if="m.deletable" @click="del(m)"></i>
                </div>
              </div>
            </div>
          </div>
        </div> 
        <div class="formula-bottom">
          <div class="formula-title formula-bottom-t">
            编辑公式
            <span class="abcd" v-if="periodList.length > 0">
              公式应用于其它测点&nbsp;&nbsp;
              <el-checkbox-group v-model="timeArr" @change="checkboxFun">
                <el-checkbox :label="m.period" :disabled="m.readonly" v-for='(m, index) in periodList' :key="index">{{m.periodName}} </el-checkbox>
              </el-checkbox-group>
            </span>
          </div>
          <div class="formula-unit">
            请选择单位:
            <el-select
              v-model="pointProcessed.unit"
              filterable
              placeholder="请选择"
              size="small"
              class="unitStyle"
              >
              <el-option
              v-for="(it, $index) in devicePoint.unitList"
              :key="$index"
              :value="it"
              ></el-option>
            </el-select>
          </div>
          <div class="formula-bottom-con">
            <el-form ref="form" :model="form" :rules="rules">
              <el-form-item  prop="formula">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 2}"
                  placeholder="请在此处进行公式编辑，例如：C1+C2*C1"
                  v-model="form.formula">
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="formula-bottom">
            <div class="formula-title formula-bottom-t1" v-if='timeArr.indexOf("CycDay") > -1 || timeArr.indexOf("CycMonth") > -1'>时间设置</div>
        </div>
        <div class="formula-bottom" v-if='timeArr.indexOf("CycDay") > -1'>
          <el-radio v-model="radio1" label="1">自然日</el-radio>
          <el-radio v-model="radio1" label="2">自定义时间范围</el-radio>
          <div class="timeSt" v-if="radio1 == 2">
            <span >
              <el-select
                size="small"
                class="width111"
                v-model="dayStartType"
                @change="optFun"
                >
                <el-option
                  v-for="(item, index) in opt1List"
                  :key="index"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>&nbsp;
              <el-time-picker
                v-model="startTime"
                size="small"
                format='HH:mm'
                value-format='HH:mm'
                placeholder="选择时间">
              </el-time-picker>&nbsp;
              <el-select
                size="small"
                class="width111"
                v-model="dayEndType"
                >
                <el-option
                  v-for="(item, index) in optList"
                  :key="index"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
              &nbsp;
              <el-time-picker
                v-model="endTime"
                size="small"
                format='HH:mm'
                value-format='HH:mm'
                placeholder="选择时间">
              </el-time-picker>&nbsp;
            </span>
          </div>
        </div>
        <div class="formula-bottom mg-t" v-if='timeArr.indexOf("CycMonth") > -1'>
          <el-radio  v-model="radio2" label="1">自然月</el-radio>
          <el-radio v-model="radio2" label="2">自定义时间范围</el-radio>
          <div class="timeSt" v-if="radio2 == 2">
            <span>
              <span>当月</span>&nbsp;
              <el-select
                size="small"
                class="width111"
                v-model="startT"
                >
                <el-option
                  v-for="(item, index) in 28"
                  :key="index"
                  :label="item + '日'"
                  :value="String(item).length > 1 ? item : '0' + item">
                </el-option>
              </el-select>&nbsp;
              <el-select
                size="small"
                class="width111"
                v-model="monthEndType"
                >
                <el-option
                  v-for="(item, index) in mList"
                  :key="index"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>&nbsp;
              <el-select
                size="small"
                class="width111"
                v-model="endT"
                >
                <el-option
                  v-for="(item, index) in 28"
                  :key="index"
                  :label="item + '日'"
                  :value="String(item).length > 1 ? item : '0' + item">
                </el-option>
              </el-select>
            </span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="button-style"  @click="dialogClose">取 消</el-button>
        <el-button type="primary" :disabled="loading" @click="sub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { cloneObj } from "@utils/public";
export default {
  props:{
    formulaFlag: Boolean,
    callback: Function,
    devicePoint: Object
  },
  computed: {
    ...mapState({
        systemInfo: state => state.layout.systemInfo,
    })
  },
  data() {
    let _this = this
    return {
      startT: '01',
      endT: '01',
      monthEndType: '0',
      dayStartType: '1',
      publicForm: {
        pType: '',
        pData: ''
      },
      typeList: [],
      dataList:[],
      activeName: 'first',
      dayEndType: '1',
      kmaxCount: 1,
      mList:[{name: '当月', value: '0'}, {name: '次月', value: '1'}],
      optList:[{name: '当日', value: '1'}],
      opt1List:[{name: '昨日', value: '1'}, {name: '当日', value: '0'}],
      timeArr: ['CycDay', 'CycMonth', 'CycYear'],
      startTime: '',
      endTime: '',
      loading: false,
      mmaxCount: 1,
      amaxCount: 1,
      fmaxCount: 1,
      form: {
        formula: '',
      },
      rules: {
        formula: [
        ]
      },
      radio1: '1',
      radio2: '1',
      radio: '1',
      formulaForm: {
        system: '',
        device: '',
        point: '',
        inherent: ''
      },
      systemList: [],
      deviceList: [],
      pointList: [],
      indexList: [],
      inherentList: [],
      list: [],
      pointProcessed: {
        stationId: '',
        id: '',
        name: '',
        unit: ''
      },
      timeArr: [],
      periodList: [],
      pubFlag: false,
      isPrice: false, // 是否是目录电价
      existPrice: false, // 是否存在目录电价
      publicParam: {}, //目录电价信息
      timeSharing: ''
    };
  },
  mounted(){
    let _this = this
      _this.getSystemList().then(r=>{
        _this.systemList = r || []
      })
      _this.pointProcessed = {
        _sysCode: _this.devicePoint._sysCode,
        _deviceName: _this.devicePoint.name,
        name: _this.devicePoint.cimName,
        code: _this.devicePoint.cimCode,
        unit: _this.devicePoint.cimUnit
      }
      if(!_this.devicePoint.Ids){
        _this.pointProcessed.id = ''
        _this.seletFun('add')
      }else{
        _this.loading = true
        let obj = {
          id: _this.devicePoint.Ids,
          code: _this.devicePoint.cimCode
        }
        _this.getCalculateInfo(obj).then(r=>{
          _this.loading = false
          _this.seletFun('edit')
          if(r){
            let listr = r.calculateParamCodeList || []
            _this.list = [...listr, ..._this.list]
            _this.form.formula = r.function || ''
            _this.mmaxCount = r.mmaxCount + 1
            _this.amaxCount = r.amaxCount + 1
            _this.fmaxCount = r.fmaxCount + 1
            _this.kmaxCount = r.kmaxCount + 1
            _this.pointProcessed._deviceName = _this.devicePoint.name;
            _this.devicePoint.cycleCode = r.cycleCode || ''
            // if(_this.startTime){
            //   _this.radio1 = '2'
            // }
          }
        })
      }
      if (_this.devicePoint.timeDataType === 'happenTime') {
          _this.timeSharing = '时间'
      } else {
          _this.timeSharing = ''
      }
      this.getPublicDataType().then(r=>{
        this.typeList = r || []
      })
  },
  watch: {
    'radio'(v){
      if(v == 1){
        this.formulaForm.inherent = ''
      }else if(v == 2){
        this.formulaForm.point = ''
      }
    }
  },
  methods: {
    optFun(v){
      if(v === '1'){
        this.optList = [{name: '当日', value: '1'}]
        this.dayEndType = '1'
      }else{
        this.optList = [{name: '次日', value: '0'}, {name: '当日', value: '1'}]
        this.dayEndType = '0'
      }
    },
    seletFun(f){
        let _this = this
      _this.getPeriodList({
        objectType: _this.devicePoint.deviceType,
        metaId: _this.devicePoint.metaDataId, 
        objectId: _this.devicePoint.treeId,
        processId: _this.devicePoint.id}).then(r=>{
        _this.periodList = r.data.periodList || []
        _this.isPrice = r.data.isPrice
        _this.existPrice = r.data.existPrice
        _this.usePrice = r.data.usePrice

        //如果是添加，存在电价就插入，如果是编辑，回显示数据里没有就插入
        if(r.data.publicParam  && _this.isPrice && f === 'add' || r.data.publicParam  && _this.isPrice && f === 'edit' && !_this.usePrice){
          r.data.publicParam.type = 4
          _this.list.push(r.data.publicParam)
        }
        if(r.data.publicParam && _this.isPrice){
           _this.oldData = cloneObj(r.data.publicParam)
            let index = +_this.oldData.paramCode.split('K')[1] + 1
           _this.kmaxCount = index
        }

        if(_this.periodList.length > 0){
          _this.periodList.map(r=>{
            if(r.period === 'CycDay' && r.startTime){
              _this.startTime = r.startTime
              _this.endTime = r.endTime
              _this.dayEndType = r.endType
              _this.dayStartType = r.startType
              _this.radio1 = '2'
            }
            if(r.period === 'CycMonth' && r.startTime){
              _this.startT = r.startTime
              _this.endT = r.endTime
              _this.monthEndType = r.endType
              _this.monthStartType = r.startType
              _this.radio2 = '2'
            }
            if(r.checked){
              this.timeArr.push(r.period)
            }
          })
        }
        this.checkboxFun(this.timeArr)
      })
    },
    checkboxFun(v){
      this.pubFlag = v.length === 1 && v.indexOf('CycYear') > -1 ? false : true
    },
    handleClick(v){},
    pTypeFun(v){
      this.publicForm.pData = ''
      this.getPublicDataList({tagCode: v, stationId: this.systemInfo.STATION_ID}).then(r=>{
        this.dataList = r || []
      })
    },
    pDataFun(){},
    systemFun(v){
      let info = this.getInfo(v, this.systemList, 'code')
      let obj = {
        code: this.devicePoint.cimCode,
        stationId: info.code,
        deviceId: this.devicePoint.treeId,
        objectType: this.devicePoint.deviceType,
        unit: this.devicePoint.cimUnit
      }
      this.loading = true
      this.formulaForm.device = ''
      this.formulaForm.inherent = ""
      this.formulaForm.point = ''
      this.pointList= []
      this.indexList= []
      this.inherentList= []
      if(obj.stationId){
        this.getDeviceObjInfo(obj).then(r=>{
          this.deviceList = r || []
          this.loading = false
        })
      }else{
        this.loading = false
      }
    
    },
    deviceFun(v){
      this.loading = true
      this.formulaForm.inherent = ""
      this.formulaForm.point = ''
      this.getDeviceInstance(v).then(r=>{
          if(r && r.length > 0){
            this.inherentList = r.filter(b=>{
              return b.type === '双精度型'
            })
          }else{
            this.inherentList = []
          }
          this.loading = false
      }) 

      let deviceInfo = this.getInfo(v, this.deviceList, 'id'),
      obj = {
        stationId: deviceInfo.stationId,
        deviceId: v,
        code: this.pointProcessed.code,
        xObjectType: this.getDeviceType(v),
        yObjectType: this.devicePoint.deviceType,
        metaId: this.devicePoint.metaDataId
      }

      this.getPointBaseInfo(obj).then(r=>{
        this.pointList = r || []
        this.loading = false
      })
    },
    getDeviceType(v){
      let str = ''
      if(this.deviceList.length > 0){
        for (var i = 0; i < this.deviceList.length; i++) {
          if(v === this.deviceList[i].id){
            str = this.deviceList[i].objectType
            break
          }
        }
      }
      return str
    },
    getInfo(id, l, str){
      let obj = {}
      if(l.length > 0){
        for (var i = 0; i < l.length; i++) {
          if(l[i][str] === id){
            obj = l[i]
            break;
          }
        }
      }
      return obj
    },
    ifyAdd(){
      let obj = {
        str: '',
        f: true
      }

      if(!this.formulaForm.system){
        obj.f = false
        obj.str = '请选择系统对象'
        return obj
      }

      if(!this.formulaForm.device){
        obj.f = false
        obj.str = '请选择设备级对象'
        return obj
      }

      if(this.radio == 1 && !this.formulaForm.point){
        obj.f = false
        obj.str = '请选择量测数据'
        return obj
      }

      if(this.radio == 2 && !this.formulaForm.inherent){
        obj.f = false
        obj.str = '请选择固有属性'
        return obj
      }

      return obj
    },
    ifyAddK(){
      let obj = {
        str: '',
        f: true
      }
      if(this.publicForm.pType === ''){
        obj.f = false
        obj.str = '请选择分类'
        return obj
      }

      if(this.publicForm.pData === ''){
        obj.f = false
        obj.str = '请选择数据'
        return obj
      }
      return obj
    },
    async add(){
      let _this = this
      let o = {}
      if(_this.activeName === 'first'){
        if(!_this.ifyAdd().f){
           _this.$message({
            message: _this.ifyAdd().str,
            type: "warning"
          });
           return
        }
        let systemInfo = _this.getInfo(_this.formulaForm.system, _this.systemList, 'code'),
        deviceInfo = _this.getInfo(_this.formulaForm.device, _this.deviceList, 'id'),
        str = '',
        oInfo = null
        if(_this.radio == '1'){
          let obj = {
            stationId: this.formulaForm.system,
            deviceId: this.formulaForm.device,
            pointCode: this.formulaForm.point,
            code: this.devicePoint.cimCode
          }
          oInfo = _this.getInfo(_this.formulaForm.point, _this.pointList, 'dataCode');
          obj.pointSource = oInfo.pointSource
          obj.pointId = oInfo.id
          obj.energyType = oInfo.energyType
          
          _this.loading = true
          let data = await _this.checkPointAndChg(obj)
          _this.loading = false
          if(data.type !== 0){
            
            str = ''
            if(data.type == 1){
              str = 'C' + _this.mmaxCount++
            }else if(data.type == 3){
              str = 'F' + _this.fmaxCount++
            }else if(data.type == 5){
              str = 'K' + _this.kmaxCount++
            }
            o = {
              energyType: oInfo.energyType,
              aliasCode: oInfo.aliasCode || '',
              aggregator: data.aggregator,
              anotherCode: data.anotherCode,
              code:  data.code,
              pointBaseInfoId: data.pointBaseInfoId,
              type: data.type,
              devicePrimaryId: _this.formulaForm.device,
              codeName: oInfo.name,
              deviceId: deviceInfo.deviceId,  
              trdPtyCode: deviceInfo.trdPtyCode,
              deviceName: deviceInfo.name,
              paramCode: str,
              productCode: systemInfo.productCode,
              stationId: systemInfo.code,
              unit: oInfo.unit,
              deviceSource: deviceInfo.objectType,
              deletable: true
            }
            if(data.type === 1 || data.type === 3){
              o.aggregatorList = data.aggregatorList
            }
            if(!data.bigDataFlag){
              _this.$message({
                message: '请补充仿真数值',
                type: "warning"
              });
            }
          }else{
            _this.$message({
              message: '查不到可用数据',
              type: "warning"
            });
            return
          }
        }else if(_this.radio == '2'){
          str = 'D' + _this.amaxCount++
          oInfo = _this.getInfo(_this.formulaForm.inherent, _this.inherentList, 'metaId')
          o = {
            aliasCode: oInfo.aliasCode || '',
            aggregator: '',
            anotherCode: '',
            pointBaseInfoId: '',
            code: oInfo.code,
            codeName: oInfo.name,
            deviceId: deviceInfo.deviceId,  
            deviceName: deviceInfo.name,
            trdPtyCode: deviceInfo.trdPtyCode,
            paramCode: str,
            productCode: systemInfo.productCode,
            stationId: systemInfo.code,
            type: 2,
            unit: oInfo.unit,
            deviceSource: deviceInfo.objectType,
            devicePrimaryId: _this.formulaForm.device,
            deletable: true
          }
        }
        _this.list.push(o)
      }else{
        if(!_this.checkType4(_this.list)){
           _this.$message({
            message: '该测点已存在目录电价',
            type: "warning"
          });
           return
        }

        if(!_this.ifyAddK().f){
           _this.$message({
            message: _this.ifyAddK().str,
            type: "warning"
          });
           return
        }
        let dataInfo = _this.getInfo(_this.publicForm.pData, _this.dataList, 'key')
        let str = 'K' + _this.kmaxCount++
        o = {
          unit: dataInfo.extend,
          paramCode: str,
          codeName: dataInfo.value,
          code: dataInfo.key,
          publicDataType: _this.publicForm.pType,
          type: 4,
          deletable: true
        }


        if(_this.existPrice && _this.oldData.code && _this.oldData.code !== o.code){ //如果已经存在目录电价并且 新选电价与之前选中的并不是一个的时候提示
          _this.$confirm(
            `<div>您正在修改${_this.pointProcessed._deviceName}关联的目录电价，所有该设备使用目录电价的指标都将切换到新的目录电价</div><div>，您确定要修改该设备关联的目录电价吗</div>`,
            '提示',
            {

              confirmButtonText: "确定",
              cancelButtonText: "取消",
              cancelButtonClass: "cancle-button",
              confirmButtonClass: "sure-button",
              dangerouslyUseHTMLString: true,
              type: "warning"
            }
          ) 
          .then(() => {
            _this.list.push(o)
          })
          .catch(() => {
          });
        }else{
          _this.list.push(o)
        }

      }
      _this.$nextTick(()=>{
        let dom = _this.$refs.formulaCon
        let height = dom.scrollHeight
        dom.scrollTop = height
      })
    },
    checkType4(list){
      let f = true 
      if(list.length > 0){
        for (var i = 0; i < list.length; i++) {
          if(list[i].type == 4 && list[i].publicDataType === 'elecPrice'){
            f = false
            break
          }
        }
      }
      return f
    },
    del(i){
      let index = this.list.indexOf(i)
      this.list.splice(index, 1);
    },
    ifySub(){
      let obj = {
        str: '',
        f: true
      }
      if(this.list.length === 0){
        obj.str = '总览数据不能为空'
        obj.f = false
        return obj
      }
      
      if(this.form.formula === undefined || this.form.formula === null || this.form.formula.trim() === ''){
        obj.str = '公式数据不能为空'
        obj.f = false
        return obj
      }

      if(this.radio1 == 2 && (this.startTime === '' || this.endTime === '')){
        obj.str = '当日时间或次日时间不能为空'
        obj.f = false
        return obj
      }

      if(this.radio1 == 2){
        let arr1 = this.startTime.split(':')
        let arr2 = this.endTime.split(':')
        if(this.dayStartType == 0 && this.dayEndType == 1){ //当日 - 当日
          if(+arr2[0] < +arr1[0] || +arr2[0] == +arr1[0] && +arr2[1] <= +arr1[1]){
            obj.str = '当日开始时间不能小于或等于结束时间'
            obj.f = false
            return obj
          }
        }else if(this.dayStartType == 0 && this.dayEndType == 0 || this.dayStartType == 1 && this.dayEndType == 1){// 当日 - 次日
          if(+arr2[0] > +arr1[0] || +arr2[0] == +arr1[0] && +arr2[1] > +arr1[1]){
            obj.str = '自然日时间不能超过24小时'
            obj.f = false
            return obj
          }
        }
      }

      if(this.radio2 == 2){
        if(this.monthEndType == 0){
          if(this.startT >= this.endT){
            obj.str = '当月开始时间不能小于或等于结束时间'
            obj.f = false
            return obj
          }
        }else if(this.monthEndType == 1){
          if(this.startT < this.endT){
            obj.str = '自然月时间不能超过1个月'
            obj.f = false
            return obj
          }
        }
      }
      return obj 
    },
    sub(){
      let _this = this
      if(!_this.ifySub().f){
        _this.$message({
          message: _this.ifySub().str,
          type: "warning"
        });
        return
      }
      let list = _this.list
      let list1 = [],
        list2 = []
      for (let i = 0; i < list.length; i++) {
        if(list[i].type === 4){
          list1.push(list[i])
        }else{
          list2.push(list[i])
        }
      }
      let indiceParamDyncsVoList = [],
        indiceParamStaticsVoList = [],
        indiceParamCalcsVoList = [],
        o = {
          publicDataParamList: list1,
          deviceId: _this.devicePoint.deviceId, // 外层树节点的 deviceId
          deviceName: _this.devicePoint.name, // 外层树节点的 name
          devicePrimaryId: _this.devicePoint.treeId, // 外层树节点的 id
          function: _this.form.formula.trim(), // 公式
          calculateParamCodeVo: list2, // 公式M
          measureCat: _this.pointProcessed.code, //Y 测点编码
          measureCatName: _this.pointProcessed.name, //Y 测点名称 
          unit: _this.pointProcessed.unit, //Y 单位
          stationId: _this.devicePoint.code, //外层树根系统的code
          dataType: _this.devicePoint.dataType, 
          valueType: _this.devicePoint.valueType,
          processedId: _this.devicePoint.id, // 入口索引
          objectType: _this.devicePoint.deviceType,//外树节点是否是设备树或者设备 1 设备组 2 设备
          periodType: _this.devicePoint.cycleCode, //量测点下的自然年、月、日
        }
      let pList = this.periodList.map(r=>{
        if(this.timeArr.indexOf(r.period) > -1){
          r.checked = true
        }else{
          r.checked = false
        }
        if(r.period === 'CycDay' && _this.radio1 == 2){
          r.startTime = _this.startTime
          r.endTime = _this.endTime
          r.endType = _this.dayEndType
          r.startType = _this.dayStartType
        }else if(r.period === 'CycMonth' && _this.radio2 == 2){
          r.startTime = _this.startT
          r.endTime = _this.endT
          r.endType = _this.monthEndType
          r.startType = '1'
        }else{
          r.startTime = ''
          r.endTime = ''
          r.endType = ''
          r.startType = ''
        }
        return r
      })
      o.pointList = pList
      let oo = cloneObj(o)
      _this.loading = true

      if(o.objectType === 1){
        this.getInter(oo)
      }else if(o.objectType === 2){
        _this.isConfirm(oo).then(r=>{
          if(r.code === _this.$code.SUCCESS){
            if(r.data === true){


              _this.$confirm(
                  `<div>所编辑公式为“同设备内的测点实时加工”，此类公式在仿真环境中只能保存不能计算，如需计算请切换到物联环境。</div><div>是否仍然保存公式？</div>`,
                  '提示',
                  {

                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    cancelButtonClass: "cancle-button",
                    confirmButtonClass: "sure-button",
                    dangerouslyUseHTMLString: true,
                    type: "warning"
                  }
                ) 
                .then(() => {
                  _this.getInter(oo)
                  // _this.callback(true)
                })
                .catch(() => {
                  _this.loading = false
                });
            }else{
              _this.getInter(oo)
            }
          }else{
            _this.loading = false
          }
        })
      }
    },
    getInter(oo){
      let _this = this
      _this.calculateEditAdd(oo).then(r=>{
        if(r.code === _this.$code.SUCCESS){
          _this.$message({
            message: "配置成功",
            type: "success"
          });
          _this.callback(true)
        }
        _this.loading = false
      })
    },
    dialogClose(){
      this.callback()
    },
    ...mapActions([
      'getPeriodList',
      'isConfirm',
      "getDeviceData",
      "getDeviceInfo",
      "getDeviceTypeData",
      "deleteDeviceById",
      'getSystemList',
      'getCalculateInfo',//获取公式信息
      'getDeviceObjInfo',//获取设备级对象 tag systemCode
      'getDeviceInstance',
      'getPointBaseInfo',//获取测点信息
      'calculateEditAdd',
      'getYData',
      'checkPointAndChg',
      'updateUnit',
      'getPublicDataType',
      'getPublicDataList'
    ])
  }
};
</script>
<style lang="less" scoped>
  * {
    box-sizing: border-box;
  }
  .for-top {
    margin-bottom: 40px;
    font-size: 0px;
  }
  .con-tit {
    color: #333333;
    margin-bottom: 20px;
    padding-left: 20px;
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    font-weight: bold;
  }
  .for-con {
    height: 360px;
  }
  .for-bottom {
    height: 224px;
    margin-top: 20px;
    .header-content {
      position: absolute;
      right: 20px;
    }
    .body-content-input {
      height: 100%;
      /deep/ textarea.el-textarea__inner {
        height: 100% !important;
        border: none;
      }
    }
  }
  .for-set-time {
    margin-top: 20px;
  }
  .con-body {
    height: calc(~"100% - 34px");
    border: 1px solid #DBDBDB;
    width: 100%;
    .body-content {
      width: 100%;
      height: calc(~"100% - 50px");
      overflow: auto;
      .content-items {
        /*display: flex;*/
        padding: 4px 40px 4px 30px;
        height: 40px;
        width: 100%;
        position: relative;
        .content-item2 {
          width: 655px;
        }
        .comment-del {
          position: absolute;
          right: 40px;
          top: 12px;
          font-size: 14px;
          cursor: pointer;
        }
        .content-i {
          display: inline-block;
          vertical-align: bottom;
          line-height: 32px;
        }
        &:nth-child(even) {
          background-color: #FAFAFA;
        }
      }
    }
  }
  .body-header {
    height: 50px;
    width: 100%;
    padding: 9px 20px;
    background-color: #F2F8FE;
    position: relative;
    .abcd {
      display: inline-block;
      width: 60%;
      line-height: 32px;
      .header-detail {
        display: inline-block;
      }
    }
    .header-select {
      display: inline-block;
    }
    .opt-btn {
      width: 87px;
      vertical-align: bottom;
      display: inline-block;
      background-color: #178DFF;
      color: #ffffff;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      border-radius: 2px;
    }
  }
  .top-title {
    font-size: 14px;
    display: inline-block;
  }
  .width-80 {
    width: 80px;
  }
  .width-100 {
    width: 99px;
  }
  .width-120 {
    width: 119px;
  }
  .width-300 {
    width: 299px
  }
  .width-90 {
    width: 89px;
  }
  .width-200 {
    width: 199px
  }
  .margin-right-10 {
    margin-right: 10px;
  }
</style>
<style lang="less" scoped>
.point-0{
  
}
.mg-t{
  margin-bottom:20px;
}
.point-1{
  color: #d8d8d8;
}
.point-2{
  color: #39e456;
}
& /deep/ .el-dialog__body{
  padding: 20px 30px !important;
  box-sizing: border-box;
  overflow: auto;
  textarea{
    resize:none
  }
  .width12{
    width: 150px;
  }
  .formula-content{
    height: 570px;
    .formula-title{
      height:22px;
      font-size:16px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:22px;
      height: 32px;
    }
    .formula-top{
      height: 320px;
      display: flex;
      .formula-top-left{
        min-width: 400px;
        width: 400px;
        .left-form{
          .item{
            height: 32px;
            margin-top: 12px;
            .item-title{
              display: inline-block;
              width: 110px;
              text-align: right;
              padding-right: 10px;
              box-sizing:border-box;
              
              .el-radio__inner:last-child{
                left: 0px;
                top: 0px;
              }
            }
            .item-title-radio{
              .el-radio__inner{
                position: absolute;
                left: -28px;
                top: -7px;
              }
            }
            .width{
              width: 228px;
            }
          }
          .item1{
             .el-radio__input{
              position:absolute;
              left: -28px
            }
          }
          .item2{
            text-align: right;
          }
        }
      }
      .formula-con{
        height: 285px;
        border-radius:2px;
        border:1px solid rgba(224,227,229,1);
        padding: 0 20px;
        padding-top:0px;
        box-sizing:border-box;
        overflow: auto;
      }
      .formula-top-center{
        width: 56px;
        text-align: center;
        font-size: 40px;
        line-height: 350px;
      }
      .formula-top-right{
        flex: 1;
        .right-talbe{
          padding:0px;
          .items:nth-of-type(odd){ background:rgba(250,250,250,1);}
          .items{
            height: 40px;
            line-height: 40px;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(51,51,51,1);
            .item{
              display: inline-block;
              text-align: center;
              overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
            }

            .item1{
              width: 50px;
            }
            .item2{
              text-align: left;
              width: 100px;
            }
            .item3{
              text-align: left;
              width: 100px;
            }
            .item4{
              text-align: left;
              width: calc(~"100% - 550px");
            }
            .item6{
              text-align: left;
              width: 150px;
            }
            .item7{
              text-align: center;
              width: 100px;
            }
            .item5{
              width: 50px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(153,153,153,1);
              cursor: pointer;
            }
          }
        }
      }
    }
    .formula-bottom{
      min-height: 32px;
      line-height: 32px;
      .time{
        display: inline-block;
      }
      .formula-bottom-t{
        margin-top: 20px;
        .abcd{
          display: inline-block;
          float: right;
          .el-checkbox-group{
            display: inline-block;
          }
        }
      }
      .formula-bottom-t1{
        display: inline-block;
      }
      .formula-bottom-con{
      }
      .formula-unit{
        margin-bottom: 20px;
      }
    }
    .timeSt{
      display: inline-block;
      // margin-top:20px;
    }
  }
  .item5-j{
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius:100%;
    line-height: 18px;
    color:#fff;
    font-size: 12px;
  }
  .item5-j5 { //时间
    color: #00AFC3;
    width: auto;
    border-radius: 9px;
    padding: 0px 10px;
    background-color: #e5f7f9;
  }
  .width111{
    width:88px;
  }
}

</style>
