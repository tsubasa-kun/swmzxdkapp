<template>
    <div>
        <!--SQFS:1 SQJE:1  图1-->
        <v-amount-type1 v-if="page == 1" :dkbm="sqdkbm" :zdje="sqzdje"></v-amount-type1>
        <!--SQFS:1 SQJE:2  图2-->
        <v-amount-type2 v-if="page == 2" :dkbm="sqdkbm" :zdje="sqzdje"></v-amount-type2>
        <!--SQFS:2 SQJE:1  图3-->
        <v-amount-type3 v-if="page == 3" :dkbm="sqdkbm" :zdje="sqzdje"></v-amount-type3>
        <!--SQFS:2 SQJE:2  图4-->
        <v-amount-type4 v-if="page == 4" :dkbm="sqdkbm" :zdje="sqzdje"></v-amount-type4>
    </div>
</template>

<style scoped>
</style>

<script type="text/javascript">
    import Api from '../../api';
    import Utils from '../../utils';
    import $ from 'jquery';
    import {Indicator, Picker, Button} from 'mint-ui';
    import amountType1 from '../amountType1/amountType1.vue';
    import amountType2 from '../amountType2/amountType2.vue';
    import amountType3 from '../amountType3/amountType3.vue';
    import amountType4 from '../amountType4/amountType4.vue';

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
            'v-amount-type1': amountType1,
            'v-amount-type2': amountType2,
            'v-amount-type3': amountType3,
            'v-amount-type4': amountType4,
        },
        watch: {},
        methods: {}
    }
</script>