<template>
    <div>
        <!--SQFS:1 SQJE:1  图1-->
        <span class="tip">每学年可申请金额为{{ dkje }}元</span>
        <v-amount-type1-item v-for="item in itemList" ref="amountItem" v-if="item.WID != 'ZE'" :datas="item"></v-amount-type1-item>
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
        margin: 25PX 10PX 10PX 10PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import {Indicator, Picker, Button} from 'mint-ui';
    import amountType1Item from '../../components/amountType1Item/amountType1Item.vue';
    export default {
        props: ['dkbm', 'zdje'],
        data() {
            return {
                itemList: [],
                dkje: ''
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
                    this.dkje = this.itemList[0].DKJE;
                });
        },
        components: {
            [Picker.name]: Picker,
            [Button.name]: Button,
            'v-amount-type1-item': amountType1Item
        },
        watch: {},
        methods: {
            submit: function () {
                let canApply = false;
                let amountItems = this.$refs.amountItem;
                let amounts = [];
                let total = 0;
                if (amountItems) {
                    for (let i = 0; i < amountItems.length; i++) {
                        let items = amountItems[i].getData();
                        amounts.push(JSON.stringify(items));
                        total = total + Number(items.DKJE);
                        canApply = true;
                    }
                }
                if (canApply) {
                    let requestUrl = Api.SAVE_LOAN_DETAIL + "?requestParamStr=[" + amounts + "]";
                    let encodeUrl = encodeURI(requestUrl);
                    Indicator.open();
                    this.$http.get(encodeUrl)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            if (res.data.count == 1) {
                                sessionStorage.setItem("SQJESTR", total);
                                this.$router.go(-1);
                            }
                            Indicator.close();
                        });
                }
            }
        }
    }
</script>