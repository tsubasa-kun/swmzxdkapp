<template>
    <div>
        <!--SQFS:2 SQJE:2  图4-->
        <span class="tip">本学年可申请金额为{{ zdje }}元</span>
        <div class="content">
            <div class="item-div">
                <span>学年</span>
                <input type="text" readOnly="true" v-model="year"/>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>学费</span>
                <input type="number" placeholder="请填写" min="0" v-model="xf"/>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>住宿费</span>
                <input type="number" placeholder="请填写" min="0" v-model="zsf"/>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>生活费</span>
                <input type="number" placeholder="请填写" min="0" v-model="shf"/>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>贷款总额</span>
                <span>{{ total }}</span>
            </div>
        </div>

        <mt-button class="submit-btn" @click="submit">确定</mt-button>
    </div>
</template>

<style scoped>
    .tip {
        display: block;
        padding: 5PX 10PX 5PX 10PX;
        font-size: 14PX;
        color: #92969c;
    }

    .content {
        padding-left: 10PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .item-div {
        position: relative;
        padding: 10PX 10PX 10PX 0;
    }

    .item-div span {
        display: inline-block;
        width: 80PX;
        font-size: 16PX;
    }

    .item-div input {
        border: 0;
        width: 210PX;
        outline: none;
        font-size: 14PX;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }

    .submit-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        margin: 25PX 10PX 10PX 10PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import {Indicator, Picker, Button} from 'mint-ui';
    export default {
        props: ['dkbm', 'zdje'],
        data() {
            return {
                xf: '',
                zsf: '',
                shf: '',
                total: '',
                year: '',
                yearKey: '',
                wid: '',
            }
        },
        created() {
            console.log("page" + 4);

            SDK.setTitleText('贷款金额');

            Indicator.open();
            let param = {"DKBM": this.dkbm};
            let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
            this.$http.get(Api.GET_LOAN_DETAIL + requestParamStr)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    Indicator.close();
                    for(let i = 0; i < res.data.length; i++) {
                        if(res.data[i].WID != 'ZE') {
                            this.wid = res.data[i].WID;
                            this.yearKey = res.data[i].DKXN;
                            this.year = res.data[i].DKXN_DISPLAY;
                            this.xf = res.data[i].XF == 0 ? '' : res.data[i].XF;
                            this.zsf = res.data[i].ZSF == 0 ? '' : res.data[i].ZSF;
                            this.shf = res.data[i].SHF == 0 ? '' : res.data[i].SHF;
                            this.total = res.data[i].DKJE == 0 ? '' : res.data[i].DKJE;
                        }
                    }
                });
        },
        components: {
            [Picker.name]: Picker,
            [Button.name]: Button
        },
        watch: {
            xf: function () {
                this.total = Number(this.xf) + Number(this.zsf) + Number(this.shf);
            },
            zsf: function () {
                this.total = Number(this.xf) + Number(this.zsf) + Number(this.shf);
            },
            shf: function () {
                this.total = Number(this.xf) + Number(this.zsf) + Number(this.shf);
            }
        },
        methods: {
            submit: function () {
                if (this.xf.length <= 0) {
                    Utils.methods.showTip('请输入学费');
                } else if (this.zsf.length <= 0) {
                    Utils.methods.showTip('请输入住宿费');
                } else if (this.shf.length <= 0) {
                    Utils.methods.showTip('请输入生活费');
                } else if (this.total > this.zdje) {
                    Utils.methods.showTip('总额不能超过最大申请额度');
                } else {
                    let param = [{
                        "WID": this.wid,
                        "DKXN": this.yearKey,
                        "XF": this.xf,
                        "ZSF": this.zsf,
                        "SHF": this.shf,
                        "DKJE": this.total,
                        "DKSQWID": sessionStorage.getItem("DKSQWID") || ''
                    }];
                    let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
                    console.log(this.wid);
                    Indicator.open();
                    this.$http.get(Api.SAVE_LOAN_DETAIL + requestParamStr)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            if (res.data.count == 1) {
                                sessionStorage.setItem("SQJESTR", this.total);
                                this.$router.go(-1);
                            }
                            Indicator.close();
                        });
                }
            }
        }
    }
</script>