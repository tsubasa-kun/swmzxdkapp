<template>
    <div>
        <div v-if="tab == 1">
            <can-not-apply-view :message="msg"></can-not-apply-view>
        </div>
        <div v-if="tab == 2">
            <div class="empty-div" v-if="!EDIT">
                <div class="img-div">
                    <img src="../../assets/no.png">
                </div>
                <span class="empty-tip">目前还木有申请贷款哦</span>
                <mt-button class="submit-btn" @click="toApply">申请贷款</mt-button>
            </div>
            <div class="content" v-else>
                <div class="info-div">
                    <span class="main-label">贷款信息</span>
                    <div class="line"></div>
                    <div class="sub-div">
                        <span class="sub-label">贷款学年</span>
                        <span class="sub-text">{{ dkxn_display }}</span>
                    </div>
                    <div class="sub-div">
                        <span class="sub-label">银行</span>
                        <span class="sub-text">{{ yh }}</span>
                    </div>
                    <div class="sub-div">
                        <span class="sub-label">利率</span>
                        <span class="sub-text">{{ ll }}</span>
                    </div>
                    <div class="sub-div">
                        <span class="sub-label">借款年限</span>
                        <span class="sub-text">{{ jknx }}年</span>
                    </div>
                    <!--<div class="sub-div">-->
                        <!--<span class="sub-label">合同号</span>-->
                        <!--<span class="sub-text">{{ hth }}</span>-->
                    <!--</div>-->
                    <div class="sub-div">
                        <span class="sub-label">应还款年份</span>
                        <span class="sub-text">{{ yhnf_displsy }}</span>
                    </div>
                </div>

                <div class="condition-div">
                    <div class="condition-item-div" @click="toAmount">
                        <span class="condition-label">贷款金额</span>
                        <span class="content-text hint" v-if="sqjeStr">{{ sqjeStr }}</span>
                        <span class="hint-text hint" v-else>填写金额</span>
                        <i class="iconfont arrow-icon">&#xe79e;</i>
                    </div>
                    <div class="line"></div>
                    <div class="condition-item-div" @click="toReason">
                        <span class="condition-label">申请理由</span>
                        <span class="content-text hint" v-if="sqlyStr"> {{ sqlyStr }}</span>
                        <span class="hint-text hint" v-else>说明下理由吧</span>
                        <i class="iconfont arrow-icon">&#xe79e;</i>
                    </div>
                    <div class="line"></div>
                    <div class="condition-item-div" @click="toMember">
                        <span class="condition-label">家庭成员</span>
                        <span class="content-text hint" v-if="member">{{ member }}</span>
                        <span class="hint-text hint" v-else>填写家庭人员信息</span>
                        <i class="iconfont arrow-icon">&#xe79e;</i>
                    </div>
                </div>

                <div v-if="dqshzt && dqshzt != 0">
                    <div v-if="fjToken.length <= 0" class="file-none-div">
                        <span class="fj-text">附件：无附件</span>
                    </div>
                    <div v-else class="file-show-div" @click="toPreview">
                        <span class="fj-text">附件：</span>
                        <img class="fj-img" :src="fjUrl"/>
                        <!--<span class="fj-text">附件：{{ fjToken }}</span>-->
                    </div>
                </div>
                <div v-else>
                    <div v-if="fjToken.length <= 0" class="file-div" @click="choseUpload">
                        <input class="hidden-input"/>
                        <i class="iconfont add-icon">&#xe6bf;</i>
                        <span class="add-text">添加附件</span>
                    </div>
                    <div v-else class="file-show-div" @click="toPreview">
                        <span class="fj-text">附件：</span>
                        <img class="fj-img" :src="fjUrl"/>
                        <!--<span class="fj-text">附件：{{ fjToken }}</span>-->
                    </div>
                </div>

                <v-step v-if="dqshzt" :shlc="shlc" :dqshzt="dqshzt" :sfth="sfth"></v-step>

                <mt-button v-if="dqshzt && dqshzt != 0 && dqshzt != 99 && !refused" class="cancel-btn"
                           @click="doReCall">撤回</mt-button>
                <mt-button v-else-if="!dqshzt || dqshzt == 0" class="submit-btn" @click="doApply">提交申请</mt-button>

                <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .empty-div {
        width: 100%;
        text-align: center;
        padding: 15PX;
    }

    .img-div {
        width: 100%;
        text-align: center;
        padding-top: 60PX;
    }

    .img-div img {
        width: 120PX;
        height: 120PX;
    }

    .empty-tip {
        display: block;
        font-size: 18PX;
        color: #000;
        margin-top: 20PX;
        margin-bottom: 15PX;
    }

    .submit-btn {
        width: calc(100% - 40PX);
        color: white;
        background-color: #06c1ae;
    }

    .content {
        width: 100%;
    }

    .info-div {
        margin-top: 15PX;
        padding: 10PX 0PX 10PX 15PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .main-label {
        display: block;
        height: 30PX;
        font-size: 16PX;
        color: #000;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }

    .sub-div {
        margin-top: 10PX;
    }

    .sub-label {
        width: 100PX;
        display: inline-block;
        font-size: 14PX;
        color: #92969c;
    }

    .sub-text {
        display: inline-block;
        font-size: 14PX;
        color: #000;
    }

    .condition-div {
        margin-top: 15PX;
        padding: 0PX 0PX 0PX 15PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .condition-item-div {
        position: relative;
        padding-top: 10PX;
        padding-bottom: 10PX;
    }

    .condition-label {
        font-size: 16PX;
        color: #000;
    }

    .hint-text {
        height: 30PX;
        font-size: 16PX;
        color: #92969c;
    }

    .hint {
        position: absolute;
        right: 30PX;
        top: 10PX;
    }

    .content-text {
        height: 30PX;
        font-size: 16PX;
        color: #000;
    }

    .arrow-icon {
        position: absolute;
        right: 10PX;
        top: 11PX;
        color: #92969c;
    }

    .file-div {
        position: relative;
        margin-top: 15PX;
        padding: 10PX 0PX 10PX 15PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
        text-align: center;
    }

    .hidden-input {
        filter: alpha(opacity=0);
        opacity: 0;
        width: 0;
        height: 0;
    }

    .file-div i {
        position: absolute;
        top: 11PX;
        left: calc(50% - 40PX);
        font-size: 22PX;
        color: #06c1ae;
    }

    .file-div span {
        position: absolute;
        top: 10PX;
        left: calc(50% - 15PX);
        font-size: 16PX;
        color: #06c1ae;
    }

    .file-show-div {
        width: 100%;
        height: 60PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
        padding: 10PX 0PX 10PX 10PX;
        margin-top: 15PX;
    }

    .file-none-div {
        width: 100%;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
        padding: 10PX 0PX 10PX 10PX;
        margin-top: 15PX;
    }

    .fj-img {
        width: 40PX;
        height: 40PX;
    }

    .fj-text {
        font-size: 16PX;
        margin-left: 10PX;
    }

    .submit-btn {
        width: 100%;
        color: white;
        background-color: #06c1ae;
        margin-top: 20PX;
    }

    .cancel-btn {
        width: 100%;
        color: white;
        background-color: #ff571a;
        margin-top: 20PX;
    }
</style>

<script type="text/javascript">
    import $ from 'jquery';
    import Api from '../../api';
    import Utils from '../../utils';
    import {Indicator, Button, Actionsheet} from 'mint-ui';
    import stepView from '../../components/stepView/stepView.vue';
    import canNotApplyView from '../../components/canNotApplyView/canNotApplyView.vue'

    export default {
        components: {
            [Button.name]: Button,
            [Actionsheet.name]: Actionsheet,
            'v-step': stepView,
            'can-not-apply-view': canNotApplyView
        },
        data() {
            return {
                tab: 0,
                msg: '',
                sfysq: 0,
                loanSet: {},
                loanInfo: {},
                shlc: [],
                dqshzt: '',
                dkxn: '',
                dkxn_display: '',
                yh: '',
                ll: '',
                jknx: '',
                hth: '',
                yhnf: '',
                yhnf_displsy: '',
                dkbm: '',
                actions: [{name: '拍照', method: this.takePhoto},
                    {name: '从相册中选择', method: this.selectPhoto}],
                sheetVisible: false,
                sqfs: 0,
                sqje: 0,
                sqjeStr: '',
                sqly: '',
                sqlyStr: '',
                sqzdje: '',
                member: '',
                fjToken: '',
                fjUrl: '',
                wid: '',
                curPX: 0,
                refused: false,
                sfth: 0,
                EDIT: sessionStorage.getItem("EDIT") || false
            }
        },
        methods: {
            toApply: function () {
                this.EDIT = true;
                sessionStorage.setItem("EDIT", true);
            },
            toAmount: function () {
                if (this.dqshzt && this.dqshzt != 0) {
                    this.$router.push({
                        path: '/amountInfoIndex',
                        query: {DKBM: this.dkbm, SQFS: this.sqfs, SQJE: this.sqje, SQZDJE: this.sqzdje}
                    });
                } else {
                    this.$router.push({
                        path: '/amountIndex',
                        query: {DKBM: this.dkbm, SQFS: this.sqfs, SQJE: this.sqje, SQZDJE: this.sqzdje}
                    });
                }
            },
            toReason: function () {
                if (this.dqshzt && this.dqshzt != 0) {
                    this.$router.push({
                        path: '/reasonInfo',
                        query: {SQLY: this.sqly}
                    });
                } else {
                    this.$router.push({
                        path: '/reason',
                        query: {SQLY: this.sqly}
                    });
                }
            },
            toMember: function () {
                if (this.dqshzt && this.dqshzt != 0) {
                    this.$router.push({path: '/memberInfo', query: {DKBM: this.dkbm}});
                } else {
                    this.$router.push({path: '/member', query: {DKBM: this.dkbm}});
                }
            },
            choseUpload: function () {
                this.sheetVisible = true;
            },
            selectPhoto: function () {
                SDK.takePhoto((ret) => {
                    let retData;
                    if (ret instanceof Array) {
                        retData = ret[0];
                    } else {
                        retData = ret;
                    }
                    this.upLoadPhoto(retData.url);
                }, 1);
            },
            takePhoto: function () {
                SDK.takeCamera(false, (ret) => {
                    let retData;
                    if (ret instanceof Array) {
                        retData = ret[0];
                    } else {
                        retData = ret;
                    }
                    this.upLoadPhoto(retData.url);
                }, 1);
            },
            upLoadPhoto: function (url) {
                Indicator.open();
                SDK.uploadImgsToEmap({host: WEBPACK_CONIFG_HOST, urls: [url]})
                    .then(resp => {
                        if (resp.status == 200 || resp.success == true) {
                            this.fjToken = resp.token;
                            this.fjUrl = Utils.methods.getFileByToken(resp.token);
                            Utils.methods.showTip('上传成功');
                        } else {
                            Utils.methods.showTip(resp.msg || '上传失败');
                        }
                        Indicator.close();
                    }, error => {
                        Utils.methods.showTip(resp.msg || '上传失败');
                        Indicator.close();
                    });
            },
            toPreview: function () {
                SDK.preViewImages([{
                    url: this.fjUrl,
                    desc: ''
                }], 0);
            },
            doApply: function () {
                if (this.sqjeStr.length <= 0) {
                    Utils.methods.showTip('请填写贷款金额');
                } else if (this.sqly.length <= 0) {
                    Utils.methods.showTip('请填写申请理由');
                } else if (this.member.length <= 0) {
                    Utils.methods.showTip('请填写家庭成员');
                } else {
                    let param = {
                        "DKSQWID": this.wid,
                        "DKBM": this.dkbm,
                        "DKXN": this.dkxn,
                        "YH": this.yh,
                        "DKLL": this.ll,
                        "JKNX": this.jknx,
                        "HTH": this.hth,
                        "YHKXN": this.yhnf,
                        "SQLY": this.sqly,
                        "DKJE": this.sqjeStr,
                        "FJ": this.fjToken
                    };
                    let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
                    Indicator.open();
                    this.$http.get(Api.SUBMIT_LOAN_APPLY + requestParamStr)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            Indicator.close();
                            if (res.data.count == 1) {
                                Utils.methods.showTip('提交成功');
                                setTimeout(function () {
                                    window.location.reload();
                                }, 500);
                            } else {
                                Utils.methods.showTip(res.data.msg || '提交失败');
                            }
                        });
                }
            },
            doReCall: function () {
                let param = {"DKBM": this.dkbm};
                let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
                Indicator.open();
                this.$http.get(Api.RECALL_LOAN_APPLY + requestParamStr)
                    .then(res => {
                        return res.json();
                    })
                    .then(res => {
                        Indicator.close();
                        if (res.data.count == 1) {
                            Utils.methods.showTip('撤回成功');
                            setTimeout(function () {
                                window.location.reload();
                            }, 500);
                        } else {
                            Utils.methods.showTip(res.data.msg || '撤回失败');
                        }
                    });
            },
            getLoanSet: function () {
                Indicator.open();
                let param = {};
                let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
                this.$http.get(Api.GET_LOAN_SET + requestParamStr)
                    .then(res => {
                        return res.json();
                    }).then(res => {
                        Indicator.close();
                        this.sfysq = res.data.SFYSQ;
                        this.msg = res.data.msg;
                        let param = {"DKBM": res.data.DKBM || res.data.DKXX.DKBM || ""};
                        let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
                        if (res.data.SET && res.data.DKXX) {
                            this.setLoanInfo(res.data);
                        } else {
                            this.getLoanApplyInfo(requestParamStr);
                        }
                        this.getStuFamilyInfo(requestParamStr);
                    });
            },
            queryLoanSet: function () {
                Indicator.open();
                let param = {};
                let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
                this.$http.get(Api.QUERY_LOAN_SETTING_INFO + requestParamStr)
                    .then(res => {
                        return res.json();
                    }).then(res => {
                        Indicator.close();
                        this.sfysq = res.data.SFYSQ;
                        this.msg = res.data.msg;
                        let param = {"DKBM": res.data.DKBM || res.data.DKXX.DKBM || ""};
                        let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
                        if (res.data.SET && res.data.DKXX) {
                            this.setLoanInfo(res.data);
                        } else {
                            this.getLoanApplyInfo(requestParamStr);
                        }
                        this.getStuFamilyInfo(requestParamStr);
                    });
            },
            getLoanApplyInfo: function (params) {
                Indicator.open();
                this.$http.get(Api.GET_LOAN_APPLY_INFO + params)
                    .then(res => {
                        return res.json();
                    })
                    .then(res => {
                        Indicator.close();
                        if (res.data.SHLC) {
                            this.dqshzt = res.data.DKXX.SHZT;
                            this.shlc = res.data.SHLC;
                            this.sfth = res.data.DKXX.SFTH;
                            this.getCurrentPX(this.dqshzt);
                        }
                        this.setLoanInfo(res.data);
                    });
            },
            getStuFamilyInfo: function (params) {
                Indicator.open();
                this.$http.get(Api.GET_STU_FAMILY_INFO + params)
                    .then(res => {
                        return res.json();
                    })
                    .then(res => {
                        Indicator.close();
                        let members = res.data;
                        if (members.length > 2) {
                            this.member = members[0].XM + "，" + members[1].XM + "...";
                        } else if (members.length == 2) {
                            this.member = members[0].XM + "，" + members[1].XM;
                        } else if (members.length > 0) {
                            this.member = members[0].XM;
                        }
                        if (members.length > 0) {
                            this.EDIT = true;
                            sessionStorage.setItem("EDIT", true);
                        }

                    });
            },
            setLoanInfo: function (resData) {
                this.loanSet = resData.SET;
                this.loanInfo = resData.DKXX;

                this.wid = resData.DKXX.WID;
                sessionStorage.setItem("DKSQWID", this.wid);

                this.dkxn = resData.DKXX.DKXN;
                this.dkxn_display = resData.DKXX.DKXN_DISPLAY;
                this.yh = resData.DKXX.YH;
                this.ll = resData.DKXX.DKLL;
                this.jknx = resData.DKXX.JKNX;
                this.hth = resData.SET.DKHT;
                this.yhnf = resData.DKXX.YHKXN;
                this.yhnf_displsy = resData.DKXX.YHKXN_DISPLAY;
                this.dkbm = resData.DKXX.DKBM;
                this.sqfs = resData.SET.SQFS;
                this.sqje = resData.SET.SQJE;
                this.fjToken = resData.DKXX.FJ || '';
                this.fjUrl = Utils.methods.getFileByToken(this.fjToken);
                //XSLBDM  2-研究生,3-本科生
                if (resData.JBXX.XSLBDM == 2) {
                    this.sqzdje = resData.SET.YJSZDJE;
                } else if (resData.JBXX.XSLBDM == 3) {
                    this.sqzdje = resData.SET.BKSZDJE;
                } else {
                    this.sqzdje = resData.SET.SQZDJE;
                }

                if(this.sfysq == 1 && this.dqshzt == 99) {
                    this.tab = 1;
                } else {
                    this.tab = 2;
                }

                this.sqjeStr = sessionStorage.getItem("SQJESTR") || resData.DKXX.DKZE || '';

                this.sqly = sessionStorage.getItem("SQLY") || resData.DKXX.SQLY || '';
                this.sqlyStr = sessionStorage.getItem("SQLY") || resData.DKXX.SQLY || '';
                if (this.sqlyStr.length > 10) {
                    this.sqlyStr = this.sqlyStr.substr(0, 10) + "...";
                }
            },
            getCurrentPX: function (curSHZT) {
                if (curSHZT.indexOf('-') == 0) {
                    this.refused = true;
                    curSHZT = curSHZT.substr(1, curSHZT.length);
                }
                for (var i = 0; i < this.shlc.length; i++) {
                    if (curSHZT == this.shlc[i].DQZTDM) {
                        this.curPX = this.shlc[i].PX;
                    }
                }
            },
        },
        created() {
            Indicator.open();
            this.$http.get(Api.SET_DEFAULT_ROLE)
                .then(res => {
                    this.$http.get(Api.GET_LOAN_APPLY_LIST)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            if (res.data.SHZT == 0) {
                                this.queryLoanSet();
                            } else {
                                if (!sessionStorage.getItem("SQJESTR")) {
                                    this.getLoanSet();
                                } else {
                                    this.queryLoanSet();
                                }
                            }
                            Indicator.close();
                        });
                });
        }
    }
</script>