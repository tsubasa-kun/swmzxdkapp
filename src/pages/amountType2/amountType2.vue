<template>
    <div>
        <!--SQFS:1 SQJE:2  图2-->
        <span class="tip">每学年可申请金额为{{ zdje }}元</span>
        <v-amount-type2-item v-for="item in itemList" ref="amountItem" v-if="item.WID != 'ZE'" :datas="item"></v-amount-type2-item>
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
    import amountType2Item from '../../components/amountType2Item/amountType2Item.vue';
    export default {
        props: ['dkbm', 'zdje'],
        data() {
            return {
                itemList: []
            }
        },
        created() {
            console.log("page" + 2);

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
            'v-amount-type2-item': amountType2Item
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
                        if (items.XF.length <= 0) {
                            Utils.methods.showTip('请填写学费');
                            return;
                        } else if(!/^[0-9]+(.[0-9]{0,2})?$/.test(items.ZSF)){
                            Utils.methods.showTip('学费只能为正数');
                            return
                        } else if(items.ZSF == 0){
                            Utils.methods.showTip('学费不能为0');
                            return
                        } else if (items.ZSF.length <= 0) {
                            Utils.methods.showTip('请填写住宿费');
                            return;
                        } else if(!/^[0-9]+(.[0-9]{0,2})?$/.test(items.ZSF)){
                            Utils.methods.showTip('住宿费只能为正数');
                            return
                        } else if(items.ZSF == 0){
                            Utils.methods.showTip('住宿费不能为0');
                            return
                        } else if (items.SHF.length <= 0) {
                            Utils.methods.showTip('请填写生活费');
                            return;
                        } else if(!/^[0-9]+(.[0-9]{0,2})?$/.test(items.ZSF)){
                            Utils.methods.showTip('生活费只能为正数');
                            return
                        } else if(items.ZSF == 0){
                            Utils.methods.showTip('生活费不能为0');
                            return
                        } else if (items.DKJE > this.zdje) {
                            Utils.methods.showTip('总额不能超过最大申请额度');
                            return;
                        } else {
                            amounts.push(JSON.stringify(items));
                            total = total + Number(items.DKJE);
                            canApply = true;
                        }
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
                            Indicator.close();
                            if (res.data.count == 1) {
                                sessionStorage.setItem("SQJESTR", total);
                                this.$router.go(-1);
                            } else {
                                Utils.methods.showTip(res.data.msg || '保存失败');
                            }
                        });
                }
            }
        }
    }
</script>