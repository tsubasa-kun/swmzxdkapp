<template>
    <div>
        <div id="items">
            <v-add-member-item v-for="member in members" :member="member"></v-add-member-item>
        </div>

        <div v-if="members.length > 0">
            <div class="holder-div"></div>
            <div class="btn-div" @click="deleteItem">
                <span class="delete-text">移去以上信息</span>
            </div>
        </div>

        <div class="holder-div"></div>
        <div class="btn-div" @click="toAddMember">
            <i class="iconfont add-icon">&#xe6bf;</i>
            <span class="add-text">新增家庭成员</span>
        </div>

        <mt-button class="submit-btn" @click="complete">确定</mt-button>
    </div>
</template>

<style scoped>
    .holder-div {
        width: 100%;
        height: 10PX;
    }

    .btn-div {
        position: relative;
        height: 44PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .delete-text {
        position: absolute;
        top: 10PX;
        left: calc(50% - 48PX);
        font-size: 16PX;
        color: #ff571a;
    }

    .add-icon {
        position: absolute;
        top: 11PX;
        left: calc(50% - 62PX);
        font-size: 22PX;
        color: #06c1ae;
    }

    .add-text {
        position: absolute;
        top: 10PX;
        left: calc(50% - 38PX);
        font-size: 16PX;
        color: #06c1ae;
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
    import $ from 'jquery';
    import Utils from '../../utils'
    import {Indicator, Button, MessageBox} from 'mint-ui';
    import addMemberItem from '../../components/addMemberItem/addMemberItem.vue';

    export default {
        data() {
            return {
                dkbm: this.$route.query.DKBM,
                members: []
            }
        },
        components: {
            [Button.name]: Button,
            'v-add-member-item': addMemberItem
        },
        methods: {
            toAddMember: function () {
                this.$router.push('/addMember');
            },
            deleteItem: function () {
                MessageBox.confirm('确定移去以上所有家庭成员信息?')
                    .then(action => {
                        if (this.members.length > 0) {
                            Indicator.open();
                            for (let i = 0; i < this.members.length; i++) {
                                let param = {
                                    "WID": this.members[i].WID,
                                    "DKSQWID": sessionStorage.getItem("DKSQWID") || ''
                                };
                                let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
                                this.$http.get(Api.DELETE_STU_FAMILY_INFO + requestParamStr)
                                    .then(res => {
                                        return res.json();
                                    })
                                    .then(res => {
                                        if (i == this.members.length - 1) {
                                            this.getMemberInfo();
                                            Indicator.close();
                                        }
                                    });
                            }
                        }
                    })
                    .then(res => {
                        Utils.methods.showTip('删除成功');
                    });
            },
            getMemberInfo: function () {
                Indicator.open();
                let param = {"DKBM": this.dkbm};
                let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
                this.$http.get(Api.GET_STU_FAMILY_INFO + requestParamStr)
                    .then(res => {
                        return res.json();
                    })
                    .then(res => {
                        this.members = [];
                        this.members = res.data;
//                        this.relation = '';
                        this.name = '';
//                        this.sex = '';
                        this.work = '';
                        this.workUnits = '';
                        this.income = '';
//                        this.health = '';
                        Indicator.close();
                    });
            },
            complete: function () {
                this.$router.go(-1);
            }
        },
        created() {
            SDK.setTitleText('家庭成员');

            Indicator.open();
            let param = {"DKBM": this.dkbm};
            let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
            this.$http.get(Api.GET_STU_FAMILY_INFO + requestParamStr)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.members = res.data;
                    Indicator.close();
                });
        }
    }
</script>