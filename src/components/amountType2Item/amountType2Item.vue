<template>
    <div class="content">
        <div class="item-div">
            <span>学年</span>
            <input type="text" readOnly="true" placeholder="请选择" v-model="year"/>
        </div>
        <div class="line"></div>
        <div class="item-div">
            <span>学费</span>
            <input type="number" placeholder="请填写" min="0" v-model="xf"/>
        </div>
        <div class="line"></div>
        <div class="item-div">
            <span>住宿费</span>
            <input type="number" placeholder="请填写" min="0" v-model="zsf"/>
        </div>
        <div class="line"></div>
        <div class="item-div">
            <span>生活费</span>
            <input type="number" placeholder="请填写" min="0" v-model="shf"/>
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
                xf: this.datas.XF == 0 ? '' : this.datas.XF,
                zsf: this.datas.ZSF == 0 ? '' : this.datas.ZSF,
                shf: this.datas.SHF == 0 ? '' : this.datas.SHF,
                dkje: this.datas.DKJE == 0 ? '' : this.datas.DKJE,
                WID: this.datas.WID,
            }
        },
        created() {
        },
        watch: {
            xf: function () {
                this.dkje = Number(this.xf) + Number(this.zsf) + Number(this.shf);
            },
            zsf: function () {
                this.dkje = Number(this.xf) + Number(this.zsf) + Number(this.shf);
            },
            shf: function () {
                this.dkje = Number(this.xf) + Number(this.zsf) + Number(this.shf);
            }
        },
        methods: {
            getData: function () {
                let data = {
                    "WID": this.WID,
                    "DKXN": this.yearKey,
                    "XF": this.xf,
                    "ZSF": this.zsf,
                    "SHF": this.shf,
                    "DKJE": this.dkje,
                    "DKSQWID": sessionStorage.getItem("DKSQWID") || ''
                };
                return data;
            },
        }
    }
</script>