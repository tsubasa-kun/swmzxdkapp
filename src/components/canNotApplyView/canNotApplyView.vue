<template>
    <div class="empty-div">
        <div class="img-div">
            <img src="../../assets/no.png">
        </div>
        <span class="empty-tip">{{ message }}</span>
    </div>
</template>

<style scoped>
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

    .empty-tip {
        display: block;
        font-size: 18PX;
        color: #000;
        margin-top: 20PX;
        margin-bottom: 15PX;
    }
</style>

<script type="text/javascript">
    export default {
        props: ['message']
    }
</script>