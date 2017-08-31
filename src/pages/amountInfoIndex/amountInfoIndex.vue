<template>
    <div>
        <!--SQFS:1 SQJE:1  图1-->
        <v-amount-info-type1 v-if="page == 1" :dkbm="sqdkbm" :zdje="sqzdje"></v-amount-info-type1>
        <!--SQFS:1 SQJE:2  图2-->
        <v-amount-info-type2 v-if="page == 2" :dkbm="sqdkbm" :zdje="sqzdje"></v-amount-info-type2>
        <!--SQFS:2 SQJE:1  图3-->
        <v-amount-info-type3 v-if="page == 3" :dkbm="sqdkbm" :zdje="sqzdje"></v-amount-info-type3>
        <!--SQFS:2 SQJE:2  图4-->
        <v-amount-info-type4 v-if="page == 4" :dkbm="sqdkbm" :zdje="sqzdje"></v-amount-info-type4>
    </div>
</template>

<style scoped>
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import {Indicator, Picker, Button} from 'mint-ui';
    import amountInfoType1 from '../amountInfoType1/amountInfoType1.vue';
    import amountInfoType2 from '../amountInfoType2/amountInfoType2.vue';
    import amountInfoType3 from '../amountInfoType3/amountInfoType3.vue';
    import amountInfoType4 from '../amountInfoType4/amountInfoType4.vue';


    export default {
        data() {
            return {
                sqdkbm: this.$route.query.DKBM,
                sqfs: this.$route.query.SQFS,
                sqje: this.$route.query.SQJE,
                sqzdje: this.$route.query.SQZDJE,
                page: 0
            }
        },
        created() {
            SDK.setTitleText('贷款金额');
            console.log(this.sqfs);
            console.log(this.sqje);

            if (this.sqfs == '1' && this.sqje == '1') {
                this.page = 1;
            }
            if (this.sqfs == '1' && this.sqje == '2') {
                this.page = 2;
            }
            if (this.sqfs == '2' && this.sqje == '1') {
//                this.page = 3;
                this.page = 1;
            }
            if (this.sqfs == '2' && this.sqje == '2') {
//                this.page = 4;
                this.page = 2;
            }
        },
        components: {
            'v-amount-info-type1': amountInfoType1,
            'v-amount-info-type2': amountInfoType2,
            'v-amount-info-type3': amountInfoType3,
            'v-amount-info-type4': amountInfoType4,
        },
        watch: {},
        methods: {}
    }
</script>