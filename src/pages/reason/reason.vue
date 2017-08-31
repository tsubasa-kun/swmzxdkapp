<template>
    <div class="content">
        <textarea class="model-inst-input" placeholder="请输入你的申请理由吧" maxlength="200" v-model="reason"></textarea>
        <div class="count-div">
            <span class="count-text">{{ count }}</span>
            <span class="count-max">/200</span>
        </div>
        <mt-button class="submit-btn" :disabled="disable" @click="saveReason">确定</mt-button>
    </div>
</template>

<style scoped>
    .model-inst-input {
        width: 100%;
        height: 220PX;
        resize: none;
        outline: none;
        border: 0;
        padding: 10PX;
        font-size: 15PX;
    }

    .count-div {
        width: 100%;
        position: relative;
    }

    .count-text {
        display: inline-block;
        position: absolute;
        right: 36PX;
        color: #92969c;
        font-size: 10PX;
    }

    .count-max {
        display: inline-block;
        position: absolute;
        right: 10PX;
        color: #92969c;
        font-size: 10PX;
    }

    .submit-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        margin: 40PX 10PX 10PX 10PX;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import $ from 'jquery';
    import Utils from '../../utils';
    import {Button} from 'mint-ui';
    export default {
        components: {
            [Button.name]: Button
        },
        data() {
            return {
                reason: '',
                count: 0,
                disable: true
            }
        },
        methods: {
            saveReason: function () {
                if (this.reason.length > 200) {
                    Utils.methods.showTip('申请理由不能超过200字');
                } else {
                    sessionStorage.setItem("SQLY", this.reason);
                    this.$router.go(-1);
                }
            }
        },
        watch: {
            reason: function () {
                this.count = this.reason.length;
                if (this.count > 0) {
                    this.disable = false;
                } else {
                    this.disable = true;
                }
            }
        },
        created() {
            SDK.setTitleText('申请理由');

            this.reason = this.$route.query.SQLY;
        }
    }
</script>