import * as types from '../mutation-types'
import api from '../../api/energyConsum'
import store from '../'
import { type } from 'os'

const getState = () => ({
    eleList: [],
    eleMetricList: [],
    branchVlueList: [],
})

export const state = getState()

export const actions = {
    async getPointByDevice({ commit, state }, params) {
        let { data } = await api.getPointByDevice(params)
        commit(types.BRANCH_VALUE_LIST, data)
        return data
    },
    async getBranchValueType({ commit, state }, params) {
        let {data} = await api.getBranchValueType(params)
        return data
    },
    async getBranchValueDevice({ commit, state }, params) {
        let {data} = await api.getBranchValueDevice(params)
        return data
    },
    async getProcessList({ commit, state }, params) {
        let {data} = await api.getProcessList(params)
        return data
    },
    async getCalculateTypeList({ commit, state }, params) {
        let {data} = await api.getCalculateTypeList(params)
        return data
    },
    async getCalculateCharts({ commit, state }, params) {
        let {data} = await api.getCalculateCharts(params)
        return data
    },
    async republish({ commit, state }, params) {
        let data = await api.republish(params)
        return data
    },
    async getAllTagTypeList({ commit, state }, params) {
        let {data} = await api.getAllTagTypeList(params)
        return data
    },
    async getTagInstanceList({ commit, state }, params) {
        let data = await api.getTagInstanceList(params)
        return data
    },
    async getPeriodList({ commit, state }, params) {
        let data = await api.getPeriodList(params)
        return data
    },
    async drawTree({ commit, state }, params) {
        let data = await api.drawTree(params)
        return data
    },
    async treeTagCode({ commit, state }, params) {
        let {data} = await api.treeTagCode(params)
        return data
    },
    async getPublicDataType({ commit, state }, params) {
        let {data} = await api.getPublicDataType(params)
        return data
    },
    async getPublicDataList({ commit, state }, params) {
        let {data} = await api.getPublicDataList(params)
        return data
    },
    async isConfirm({ commit, state }, params) {
        let info = store.state.layout.systemInfo
        params.aliasCode = info.STATION_ID
        let data = await api.isConfirm(params)
        return data
    },
    async updateUnit({ commit, state }, params) {
        let {data} = await api.updateUnit(params)
        return data
    },
    async checkPointAndChg({ commit, state }, params) {
        let {data} = await api.checkPointAndChg(params)
        return data
    },
    async getEnergyTree({ commit, state }, params) {
        let data = await api.getEnergyTree(params)
        return data
    },
    async updateEnergyTree({ commit, state }, params) {
        let data = await api.updateEnergyTree(params)
        return data
    },
    async createEnergyRootTree({ commit, state }, params) {
        let data = await api.createEnergyRootTree(params)
        return data
    },
    async deleteEnergyTree({ commit, state }, params) {
        let { data } = await api.deleteEnergyTree(params)
        return data
    },
    async createEnergyTree({ commit, state }, params) {
        let data = await api.createEnergyTree(params)
        return data
    },
    async getAttrById({ commit, state }, params) {
        let data = await api.getAttrById(params)
        return data
    },
    async updateAttrValue({ commit, state }, params) {
        let data = await api.updateAttrValue(params)
        return data
    },
    async deleteTreeNode({ commit, state }, params) {
        let data = await api.deleteTreeNode(params)
        return data
    },
    async getMesurePoint({ commit, state }, params) {
        let data = await api.getMesurePoint(params)
        return data
    },
    async getCalculateInfo({ commit, state }, params) {
        let { data } = await api.getCalculateInfo(params)
        return data
    },
    async getDeviceObjInfo({ commit, state }, params) {
        let { data } = await api.getDeviceObjInfo(params)
        return data
    },
    async getPointBaseInfo({ commit, state }, params) {
        let info = store.state.layout.systemInfo
        let { data } = await api.getPointBaseInfo(params)
        return data
    },
    async calculateEditAdd({ commit, state }, params) {
        let info = store.state.layout.systemInfo
        params.creator = info.USER_NAME
        params.aliasCode = info.STATION_ID
        let data = await api.calculateEditAdd(params)
        return data
    },
    async getYData({ commit, state }, params) {
        let info = store.state.layout.systemInfo
        params.creator = info.USER_NAME
        params.stationId = info.STATION_ID
        let { data } = await api.getYData(params)
        return data
    },
    async createHumanPoint({ commit, state }, params) {
        let { data } = await api.createHumanPoint(params)
        return data
    },
    async createPoint({ commit, state }, params) {
        let { data } = await api.createPoint(params)
        return data
    },
    async createPointValue({ commit, state }, params) {
        let { data } = await api.createPointValue(params)
        return data
    },
    async deleteHumanPoint({ commit, state }, params) {
        let { data } = await api.deleteHumanPoint(params)
        return data
    },
    async editPointValue({ commit, state }, params) {
        let data = await api.editPointValue(params)
        return data
    },
    async deleteComputeItem({ commit, state }, params) {
        let data = await api.deleteComputeItem(params)
        return data
    },
    async compareTime({ commit, state }, params) {
        let data = await api.compareTime(params)
        return data
    },
    async getTagList({ commit, state }, params) {
        let { data } = await api.getTagList(params)
        return data
    },
    async getNTagList({ commit, state }, params) {
        let { data } = await api.getNTagList(params)
        return data
    },
    async getDeviceInfoByCode({ commit, state }, params) {
        let { data } = await api.getDeviceInfoByCode(params)
        return data
    },
    async getElectricTypeList({ commit, state }) {
        let { data } = await api.getElectricTypeList()
        commit(types.ELEC_LIST, data)
        return data
    },
    async saveBranchPoint({ commit, state }, params) {
        let data = await api.saveBranchPoint(params)
        return data
    },
    async updateTrdCode({commit, state}, params) {
        let data = await api.updateTrdCode(params)
        return data
    },
    async getLabelType({commit, state}, params) {
        let { data } = await api.getLabelType(params)
        return data
    },
    async getLabelName({commit, state}, params) {
        let { data } = await api.getLabelName(params)
        return data
    },
    async getDeviceGroupList({commit, state}, params) {
        let { data } = await api.getDeviceGroupList(params)
        return data
    },
    async getDeviceTagList({commit, state}, params) {
        let { data } = await api.getDeviceTagList(params)
        return data
    },
    async updateDeviceTagTrd({commit, state}, params) {
        let { data } = await api.updateDeviceTagTrd(params)
        return data
    },
    async getDeviceListBySystemCodeAndGroupType({commit, state}, params) {
        let { data } = await api.getDeviceListBySystemCodeAndGroupType(params)
        return data
    },
    async createGroup({commit, state}, params) {
        let { data } = await api.createGroup(params)
        return data
    },
    async editPointUnit({commit, state}, params) {
        let { data } = await api.editPointUnit(params)
        return data
    },
    async getAllDeviceByStationAngId({commit, state}, params) {
        let { data } = await api.getAllDeviceByStationAngId(params)
        return data
    },
    async createDeviceTreeRootAndChil({commit, state}, params) {
        let { data } = await api.createDeviceTreeRootAndChil(params)
        return data
    },
    async getDeviceTypeByStationId({commit, state}, params) {
        let { data } = await api.getDeviceTypeByStationId(params)
        return data
    },
    // async onDeleteDeviceTreeByTreeIdAndDeviceId({commit, state}, params) {
    //     let { data } = await api.onDeleteDeviceTreeByTreeIdAndDeviceId(params)
    //     return data
    // },
    async onDeleteTreeNode({commit, state}, params) {
        let { data } = await api.onDeleteTreeNode(params)
        return data
    },
    async getEleInfoByDevice({commit, state}, params) {
        let { data } = await api.getEleInfoByDevice(params)
        return data
    },
    async onGetEleMetric({commit, state}, params) {
        let { data } = await api.onGetEleMetric(params)
        commit(types.ELE_METRIC_LIST, data)
        return data
    },
    async onSaveEleRelation({commit, state}, params) {
        let data = await api.onSaveEleRelation(params)
        return data
    },
    async onGetPowerFactorStandard({commit, state}, params) {
        let { data } = await api.onGetPowerFactorStandard(params)
        return data
    },
    async onGetPolyPoint({commit, state}, params) {
        let { data } = await api.onGetPolyPoint(params)
        return data
    },
    async onGetPolyDevice({commit, state}, params) {
        let { data } = await api.onGetPolyDevice(params)
        return data
    },
    async onGetPolyDeviceRange({commit, state}, params) {
        let { data } = await api.onGetPolyDeviceRange(params)
        return data
    },
    async onGetAttrByDeviceGroupId({commit, state}, params) {
        let data = await api.onGetAttrByDeviceGroupId(params)
        return data
    },
    async onSavePolyFormula({commit, state}, params) {
        let data = await api.onSavePolyFormula(params)
        return data
    },
    async onUpdatePointNameByCode({commit, state}, params) {
        let data = await api.onUpdatePointNameByCode(params)
        return data
    },
}

export const mutations = {
    [types.ELEC_LIST](state, data) {
        state.eleList = data
    },
    [types.ELE_METRIC_LIST](state, data) {
        state.eleMetricList = data
    },
    [types.BRANCH_VALUE_LIST](state, list) {
        state.branchVlueList = list;
    }
}

export default {
    state,
    actions,
    mutations
}
