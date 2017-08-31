<template>
    <div>
        <!--SQFS:2 SQJE:1  图3-->
        <span class="tip">本学年可申请金额为{{ dkje }}元</span>
    </div>
</template>

<style scoped>
    .tip {
        display: block;
        padding: 5PX 10PX 5PX 10PX;
        font-size: 14PX;
        color: #92969c;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import {Indicator} from 'mint-ui';
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
                            this.dkje = res.data[i].DKJE;
                        }
                    }
                });
        },
        components: {},
        watch: {},
        methods: {}
    }
</script>