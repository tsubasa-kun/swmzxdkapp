<template>
    <div>
        <div class="holder-div"></div>
        <div class="content">
            <div class="item-div">
                <span class="item-label">家庭关系</span>
                <span class="item-text">{{ member.JTGXDM_DISPLAY }}</span>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span class="item-label">姓名</span>
                <span class="item-text">{{ member.XM }}</span>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span class="item-label">性别</span>
                <span class="item-text">{{ member.XBDM_DISPLAY }}</span>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span class="item-label">职业</span>
                <span class="item-text">{{ member.ZW }}</span>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span class="item-label">工作单位</span>
                <span class="item-text">{{ member.GZDW }}</span>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span class="item-label">平均收入</span>
                <span class="item-text">{{ member.PJYSR }}</span>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span class="item-label">健康状况</span>
                <span class="item-text">{{ member.JKZKDM_DISPLAY }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .holder-div {
        width: 100%;
        height: 10PX;
    }

    .content {
        padding-left: 10PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .item-div {
        position: relative;
        padding: 10PX 10PX 10PX 0;
    }

    .item-label {
        display: inline-block;
        width: 80PX;
        font-size: 16PX;
        color: #92969c;
    }

    .item-text {
        border: 0;
        width: 210PX;
        outline: none;
        color: #000;
        font-size: 16PX;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import $ from 'jquery';
    export default {
        props: ['member']
    }
</script>