<template>
    <div>
        <div class="empty-div" v-if="dkList.length <=0">
            <div class="img-div">
                <img src="../../assets/no.png">
            </div>
            <span class="main-label">申请贷款历史为空</span>
        </div>

        <div v-else v-for="dkItem in dkList" class="item-div">
            <div class="left-div">
                <div>
                    <span class="money-text">￥{{ dkItem.DKZE }}</span>
                    <span class="from-text" v-if="dkItem.SYDDK">生源地贷款</span>
                    <span class="from-text" v-else>校园地贷款</span>
                </div>
                <div class="time-div">
                    <span class="time-label">申请时间</span>
                    <span class="time-text">{{ dkItem.DKXN_DISPLAY }}</span>
                </div>
            </div>
            <div class="right-div pass" v-if="dkItem.DZZT">
                <span>已到账</span>
            </div>
            <div class="right-fk-div pass" v-else-if="dkItem.FKJE">
                <div>
                    <span>已放款</span>
                    <span>￥{{ dkItem.FKJE }}</span>
                </div>
            </div>
            <div class="right-div waiting" v-else>
                <span>未到账</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .item-div {
        margin: 15PX;
    }

    .left-div {
        margin-bottom: 10PX;
        width: calc(100% - 80PX);
        padding: 15PX;
        float:left;
        height: 80PX;
        display: inline-block;
        border: solid 1PX #e8e8e8;
        border-right: 0;
        border-top-left-radius: 4PX;
        border-bottom-left-radius: 4PX;
    }

    .money-text {
        font-size: 22PX;
        color: #000;
    }

    .from-text {
        color: #ffb200;
        background-color: #fff7e5;
        border: solid 1PX #fff7e5;
        border-radius: 2PX;
        font-size: 10PX;
        margin-left: 10PX;
    }

    .time-div {
        margin-top: 5PX;
    }

    .time-label {
        display: inline-block;
        font-size: 13PX;
        color: #92969c;
    }

    .time-text {
        display: inline-block;
        font-size: 13PX;
        color: #000;
        margin-left: 10PX;
    }

    .right-div {
        float:left;
        position: relative;
        height: 80PX;
        width: 80PX;
        display: inline-block;
        border: solid 1PX #06c1ae;
        border-top-right-radius: 4PX;
        border-bottom-right-radius: 4PX;
        background-color: #06c1ae;
        color: white;
        text-align: center;
    }

    .right-fk-div {
        float:left;
        position: relative;
        height: 80PX;
        width: 80PX;
        display: inline-block;
        border: solid 1PX #06c1ae;
        border-top-right-radius: 4PX;
        border-bottom-right-radius: 4PX;
        background-color: #06c1ae;
        color: white;
        text-align: center;
    }

    .right-fk-div div {
        position: absolute;
        width: 80PX;
        top: 20PX;
        left: 0PX;
        text-align: center;
    }

    .right-fk-div span {
        display: block;
        font-size: 14PX;
    }

    .pass {
        border: solid 1PX #06c1ae;
        background-color: #06c1ae;
    }

    .waiting {
        border: solid 1PX #ff571a;
        background-color: #ff571a;
    }

    .right-div span {
        position: absolute;
        top: 30PX;
        right: 19PX;
        font-size: 14PX;
    }

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

    .main-label {
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
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import {Indicator, Button} from 'mint-ui';

    export default {
        data() {
            return {
                dkList: []
            }
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
                            if (res.data.HDDK) {
                                this.dkList = res.data.HDDK;
                            }
                            Indicator.close();
                        });
                });
        },
        components: {
            [Button.name]: Button
        },
        methods: {
            toApply: function () {
                this.$emit('toApply')
            }
        }
    }
</script>