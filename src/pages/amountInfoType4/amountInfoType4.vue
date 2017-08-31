<template>
    <div>
        <!--SQFS:2 SQJE:2  图4-->
        <!--<span class="tip">本学年可申请金额为{{ zdje }}元</span>-->
        <div class="content">
            <div class="item-div">
                <span class="item-title">学年</span>
                <span class="item-value">{{ year }}</span>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span class="item-title">学费</span>
                <span class="item-value">{{ xf }}</span>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span class="item-title">住宿费</span>
                <span class="item-value">{{ zsf }}</span>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span class="item-title">生活费</span>
                <span class="item-value">{{ shf }}</span>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span class="item-title">贷款总额</span>
                <span class="item-value">{{ total }}</span>
            </div>
        </div>
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

    .item-title {
        display: inline-block;
        width: 80PX;
        font-size: 16PX;
    }

    .item-value {
        font-size: 14PX;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
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
        },
        methods: {
        }
    }
</script>