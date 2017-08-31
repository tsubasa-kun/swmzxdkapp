<template>
    <div class="content">
        <div class="img-div">
            <img src="../../assets/no.png">
        </div>
        <span class="main-label">当前暂时不可申请贷款</span>
        <span class="sub-label" v-if="sqkssj">本学年办理时间</span>
        <span class="sub-label" v-if="sqkssj">{{ sqkssj }} - {{ sqjssj }}</span>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        text-align: center;
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
                sqkssj: '',
                sqjssj: ''
            }
        },
        created() {
            this.$http.get(Api.GET_LOAN_SET)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    if (res.data.SET) {
                        this.sqkssj = res.data.SET.SQKSRQ;
                        this.sqjssj = res.data.SET.SQJSRQ;
                    } else {

                    }
                });
        }
    }
</script>