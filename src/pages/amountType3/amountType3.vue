<template>
    <div>
        <!--SQFS:2 SQJE:1  图3-->
        <span class="tip">本学年可申请金额为{{ dkje }}元</span>

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

    .submit-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        margin: 100PX 10PX 10PX 10PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import {Indicator, Button} from 'mint-ui';
    export default {
        props: ['dkbm', 'zdje'],
        data() {
            return {
                wid: '',
                dkje: '',
                dkxn: ''
            }
        },
        created() {
            console.log("page" + 3);

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
                            this.dkje = res.data[i].DKJE;
                            this.dkxn = res.data[i].DKXN;
                        }
                    }
                });
        },
        components: {
            [Button.name]: Button
        },
        watch: {},
        methods: {
            submit: function () {
                let param = [{
                    "WID": this.wid,
                    "DKXN": this.dkxn,
                    "XF": 0,
                    "ZSF": 0,
                    "SHF": 0,
                    "DKJE": this.dkje,
                    "DKSQWID": sessionStorage.getItem("DKSQWID") || ''
                }];
                let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
                Indicator.open();
                this.$http.get(Api.SAVE_LOAN_DETAIL + requestParamStr)
                    .then(res => {
                        return res.json();
                    })
                    .then(res => {
                        if (res.data.count == 1) {
                            sessionStorage.setItem("SQJESTR", this.dkje);
                            this.$router.go(-1);
                        }
                        Indicator.close();
                    });
            }
        }
    }
</script>