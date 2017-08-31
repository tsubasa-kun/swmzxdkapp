<template>
    <div>
        <v-member-item v-for="member in members" :member="member"></v-member-item>
    </div>
</template>

<style scoped>
</style>

<script type="text/javascript">
    import Api from '../../api';
    import {Indicator} from 'mint-ui';
    import memberItem from '../../components/memberItem/memberItem.vue';
    export default {
        data() {
            return {
                dkbm: this.$route.query.DKBM,
                members: []
            }
        },
        components: {
            'v-member-item': memberItem
        },
        methods: {

        },
        created() {
            SDK.setTitleText('家庭成员');

            Indicator.open();
            let param = {"DKBM": this.dkbm};
            let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
            this.$http.get(Api.GET_STU_FAMILY_INFO + requestParamStr)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.members = res.data;
                    Indicator.close();
                });
        }
    }
</script>