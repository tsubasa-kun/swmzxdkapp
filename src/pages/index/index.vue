<template>
    <div>
        <div v-if="tab == 1">
            <can-not-apply-view :message="msg"></can-not-apply-view>
        </div>
        <div v-if="tab == 2">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">申请</mt-tab-item>
                <mt-tab-item id="2">申请历史</mt-tab-item>
            </mt-navbar>
            <div class="line"></div>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <v-apply></v-apply>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <v-applyed></v-applyed>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>

<style scoped>
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 3PX solid #06c1ae;
        color: #06c1ae;
        margin-bottom: -3PX;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }
</style>

<script type="text/javascript">
    import {Indicator, Navbar, TabItem, TabContainer, TabContainerItem} from 'mint-ui';
    import apply from '../apply/apply.vue';
    import applyed from '../applyed/applyed.vue';
    import canNotApplyView from '../../components/canNotApplyView/canNotApplyView.vue'
    import Api from '../../api';
    import Utils from '../../utils';

    export default {
        data(){
            return {
                selected: '1',
                tab: 0,
                msg: ''
            }
        },
        components: {
            [Navbar.name]: Navbar,
            [TabItem.name]: TabItem,
            [TabContainer.name]: TabContainer,
            [TabContainerItem.name]: TabContainerItem,
            'v-apply': apply,
            'v-applyed': applyed,
            'can-not-apply-view': canNotApplyView
        },
        methods: {
            setOpen: function (date1, date2) {
                if (Utils.methods.compareDate(Utils.methods.getCurrentDate(), date1) && Utils.methods.compareDate(date2, Utils.methods.getCurrentDate())) {
                    this.openApply = true;
                } else {
                    this.openApply = false;
                }
            }
        },
        created() {
            SDK.setTitleText('助学贷款');

            this.$http.get(Api.SET_DEFAULT_ROLE)
                .then(function () {
                    let param = {};
                    let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
                    this.$http.get(Api.QUERY_LOAN_SETTING_INFO + requestParamStr)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            this.msg = res.data.msg;
                            if (!res.data.DKBM && !res.data.SET) {
                                this.tab = 1;
                            } else {
                                this.tab = 2;
                            }
                        });
                });
        }
    }
</script>