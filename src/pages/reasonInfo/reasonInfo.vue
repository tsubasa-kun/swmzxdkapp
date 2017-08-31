<template>
    <div class="content">
        <span>{{ reason }}</span>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        height: 100%;
        padding: 10PX;
    }

    .content span {
        font-size: 16PX;
        color: #000;
        white-space: normal;
        word-break: break-all;
    }
</style>

<script type="text/javascript">
    export default {
        data() {
            return {
                reason: this.$route.query.SQLY
            }
        },
        created() {
            SDK.setTitleText('申请理由');
        }
    }
</script>