<template>
    <div class="content">
        <div class="info-div">
            <span class="main-label">申请状态</span>
            <div class="check-steps-div">
                <div class="step-item-div" v-for="step in shlc">
                    <div class="status-item-left">
                        <div class="status-item-time">
                            <span v-if="step.SHYJ !== undefined && step.SHYJ.length > 0">{{ formatCheckDate(step.SHYJ[0].SHSJ) }}</span>
                        </div>

                        <img src="../../assets/waiting.png" v-if="step.DQZTDM === dqshzt">
                        <i class="iconfont status-icon-refused"
                           v-else-if="step.PX === curPX && refused">&#xe67a;</i>
                        <i class="iconfont status-icon-pass" v-else-if="step.PX < curPX || curPX === 0">&#xe68c;</i>
                        <i class="iconfont status-icon-dot" v-else>&#xe706;</i>
                    </div>
                    <div class="status-item-right">
                        <span class="step-text" v-if="step.PX === curPX && sfth === '1'">{{ step.DQZTDM_DISPLAY }}（<span class="status-status-tuihui">被退回</span>）</span>
                        <span class="step-text" v-else-if="curPX === 1 && step.PX === curPX && sfth === '0'">{{ step.DQZTDM_DISPLAY }}（<span class="status-status-chehui">撤回</span>）</span>
                        <span class="step-text" v-else>{{ step.DQZTDM_DISPLAY }}</span>
                        <div v-if="step.DQZTDM == 0">
                            <span class="opinion-text" v-if="step.SHYJ !== undefined && step.SHYJ.length > 0">{{ step.SHYJ[0].SHR }}{{ step.SHYJ[0].SHYJ }}</span>
                        </div>
                        <div v-else>
                            <span class="opinion-text" v-if="step.SHYJ !== undefined && step.SHYJ.length > 0">审核人：{{ step.SHYJ[0].SHR }}</span>
                            <span class="opinion-text" v-if="step.SHYJ !== undefined && step.SHYJ.length > 0">审核意见：{{ step.SHYJ[0].SHYJ }}</span>
                        </div>
                    </div>
                </div>
                <div class="step-item-div">
                    <div class="status-item-left-end">
                        <div class="status-item-time">
                            <span></span>
                        </div>

                        <i class="iconfont status-icon-pass" v-if="dqshzt === '99'">&#xe68c;</i>
                        <i class="iconfont status-icon-dot" v-else>&#xe706;</i>
                    </div>
                    <div class="status-item-right-end">
                        <span class="step-text">已通过</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        padding-top: 15PX;
        background-color: white;
    }

    .info-div {
        padding: 10PX 0PX 10PX 10PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
        text-align: left;
    }

    .main-label {
        display: block;
        height: 30PX;
        font-size: 16PX;
        color: #000;
        margin-bottom: 15PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .check-steps-div {
        width: 100%;
        background-color: white;
    }

    .step-item-div {
        width: 100%;
        height: auto;
        min-height: 70PX;
        text-align: left;
    }

    .status-item-time {
        display: inline-block;
        vertical-align: top;
        text-align: right;
        width: 80PX;
        font-size: 12PX;
        color: #92969c;
    }

    .status-item-left {
        display: inline-block;
        height: auto;
        min-height: 70PX;
        padding-right: 15PX;
        position: relative;
    }

    .status-item-left i {
        position: absolute;
        right: -10PX;
        top: 0PX;
    }

    .status-item-left img {
        width: 20PX;
        height: 20PX;
        position: absolute;
        right: -10PX;
        top: 0PX;
    }

    .status-item-right {
        display: inline-block;
        margin-left: -4PX;
        padding-left: 16PX;
        vertical-align: top;
        height: auto;
        border-left: solid 1PX #e8e8e8;
        min-height: 70PX;
        max-width: 66%;
        padding-bottom: 10PX;
    }

    .status-item-right-end {
        display: inline-block;
        margin-left: -4PX;
        padding-left: 16PX;
        vertical-align: top;
        height: auto;
        min-height: 70PX;
        max-width: 66%;
        padding-bottom: 10PX;
    }

    .step-text {
        display: block;
        text-align: left;
        font-size: 15PX;
    }

    .opinion-text {
        display: block;
        font-size: 12PX;
        color: #92969c;
        white-space: normal;
        word-break: break-all;
    }

    .status-icon-pass {
        font-size: 20PX;
        color: #06c1ae;
    }

    .status-icon-refused {
        font-size: 20PX;
        color: #ff571a;
    }

    .status-status-tuihui {
        color: #ff571a;
    }

    .status-status-chehui {
        color: #f9b220;
    }

    .status-icon-dot {
        font-size: 20PX;
        color: #e8e8e8;
    }

    .status-item-left-end {
        display: inline-block;
        height: 100%;
        padding-right: 15PX;
        position: relative;
        vertical-align: top;
    }

    .status-item-left-end i {
        position: absolute;
        right: -10PX;
        top: 0PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import {Indicator} from 'mint-ui';
    export default {
        props: ["shlc", "dqshzt", "sfth"],
        data() {
            return {
                curPX: 0,
                refused: false,
            }
        },
        created() {
            this.getCurrentPX(this.dqshzt);
        },
        components: {
            [Indicator.name]: Indicator
        },
        methods: {
            getCurrentPX: function (curSHZT) {
                if (curSHZT.indexOf('-') == 0) {
                    this.refused = true;
                    curSHZT = curSHZT.substr(1, curSHZT.length);
                }
                for (var i = 0; i < this.shlc.length; i++) {
                    if (curSHZT == this.shlc[i].DQZTDM) {
                        this.curPX = this.shlc[i].PX;
                    }
                }
            },
            formatCheckDate(str) {
                if (!str) {
                    return;
                }
                let date = str.replace(/-/g, '.');
                date = date.split(' ');
                return date[1].substr(0, 5) + ' ' + date[0];
            },
        }
    }
</script>