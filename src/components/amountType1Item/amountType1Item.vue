<template>
    <div class="content">
        <div class="item-div">
            <span>学年</span>
            <input type="text" readOnly="true" placeholder="请选择" v-model="year"/>
        </div>
        <div class="line"></div>
        <div class="item-div">
            <span>贷款总额</span>
            <span class="dkje-text">{{ dkje }}</span>
        </div>
    </div>
</template>

<style scoped>
    .content {
        padding-left: 10PX;
        border-top: solid 1PX #e8e8e8;
        border-bottom: solid 1PX #e8e8e8;
    }

    .item-div {
        position: relative;
        padding: 10PX 10PX 10PX 0;
    }

    .item-div span {
        display: inline-block;
        width: 80PX;
        font-size: 16PX;
    }

    .item-div input {
        border: 0;
        width: 210PX;
        outline: none;
        font-size: 14PX;
    }

    .dkje-text {
        font-size: 14PX !important;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }
</style>

<script type="text/javascript">
    export default {
        props: ['datas'],
        data() {
            return {
                year: this.datas.DKXN_DISPLAY,
                yearKey: this.datas.DKXN,
                dkje: this.datas.DKJE,
                WID: this.datas.WID,
            }
        },
        created() {
        },
        watch: {
        },
        methods: {
            getData: function () {
                let data = {
                    "WID": this.WID,
                    "DKXN": this.yearKey,
                    "XF": 0,
                    "ZSF": 0,
                    "SHF": 0,
                    "DKJE": this.dkje,
                    "DKSQWID": sessionStorage.getItem("DKSQWID") || ''
                };
                return data;
            },
        }
    }
</script>