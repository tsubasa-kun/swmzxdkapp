<template>
    <div>
        <!--SQFS:1 SQJE:1  图1-->
        <!--<span class="tip">每学年可申请金额为{{ zdje }}元</span>-->
        <div class="content" v-for="item in itemList" ref="amountItem" v-if="item.WID != 'ZE'">
            <div class="item-div">
                <span class="item-title">学年</span>
                <span class="item-value">{{ item.DKXN_DISPLAY }}</span>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span class="item-title">贷款总额</span>
                <span class="item-value">{{ item.DKJE }}</span>
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
                itemList: []
            }
        },
        created() {
            console.log("page" + 1);

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
                    this.itemList = res.data;
                });
        },
        components: {
            [Picker.name]: Picker,
            [Button.name]: Button,
        },
        watch: {},
        methods: {
        }
    }
</script>