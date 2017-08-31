<template>
    <div class="content">
        <div class="img-div">
            <img src="../../assets/no.png">
        </div>
        <span class="main-label">不要太贪心哦，当前贷款学年已存在您的申请信息！</span>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        text-align: center;
        padding: 20PX;
    }

    .img-div {
        width: 100%;
        text-align: center;
        padding-top: 100PX;
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
        margin-bottom: 10PX;
    }

    .sub-label {
        display: block;
        font-size: 16PX;
        color: #92969c;
    }
</style>

<script type="text/javascript">
    import loanClosed from '../loanClosed/loanClosed.vue';
    import Api from '../../api';
    export default {
        data() {
            return {
            }
        },
        created() {

        }
    }
</script>