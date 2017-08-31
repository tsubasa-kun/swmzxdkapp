/**
 * Created by xiekun on 2017/4/13 0013.
 */

export default {
    SET_DEFAULT_ROLE: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/setDefaultRole.do',//设置默认角色
    GET_MENU_INFO: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/getMenuInfo.do',//获取角色有权限菜单
    GET_DICTONARY: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/getDictonary.do',//查询字典
    GET_MODEL: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/getModel.do',//查询模型
    GET_LOAN_APPLY_LIST: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/getLoanApplyList.do',//查询已获得助学贷款列表
    GET_LOAN_SET: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/getLoanSet.do',//查询贷款申请设置信息及申请基础信息，同时清空明细表！！！！
    QUERY_LOAN_SETTING_INFO: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/queryLoanSettingInfo.do',//查询贷款申请设置信息及申请基础信息
    GET_LOAN_DETAIL: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/getLoanDetail.do',//查询当前申请金额明细
    QUERY_APPLY_LOAN_DETAIL: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/queryApplyLoanDetail.do',//查询当前申请详情-forWID
    GET_LOAN_APPLY_INFO: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/getLoanApplyInfo.do',//查询单个助学贷款申请信息
    SAVE_LOAN_DETAIL: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/saveLoanDetail.do',//保存贷款申请明细
    GET_STU_FAMILY_INFO: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/getStuFamilyInfo.do',//查询家庭成员
    SAVE_STU_FAMILY_INFO: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/saveStuFamilyInfo.do',//保存家庭成员
    DELETE_STU_FAMILY_INFO: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/deleteStuFamilyInfo.do',//单条删除家庭成员
    SUBMIT_LOAN_APPLY: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/submitLoanApply.do',//提交申请
    RECALL_LOAN_APPLY: WEBPACK_CONIFG_HOST + '/sys/zxdkapp/swMobileService/loanMobile/recallLoanApply.do',//撤回申请
}
