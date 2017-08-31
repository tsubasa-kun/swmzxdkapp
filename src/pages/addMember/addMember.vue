<template>
    <div>
        <div class="holder-div"></div>
        <div class="content">
            <div class="item-div">
                <span>家庭关系</span>
                <input type="text" readOnly="true" placeholder="请选择" v-model="relation" @click="showRelationPicker">
                <i class="iconfont arrow-icon">&#xe79e;</i>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>姓名</span>
                <input type="text" placeholder="请填写" v-model="name">
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>性别</span>
                <input type="text" readOnly="true" placeholder="请选择" v-model="sex" @click="showSexPicker">
                <i class="iconfont arrow-icon">&#xe79e;</i>
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>职业</span>
                <input type="text" placeholder="请填写" v-model="work">
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>工作单位</span>
                <input type="text" placeholder="请填写" v-model="workUnits">
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>平均收入</span>
                <input type="number" placeholder="请填写" v-model="income" min="0">
            </div>
            <div class="line"></div>
            <div class="item-div">
                <span>健康状况</span>
                <input type="text" readOnly="true" placeholder="请选择" v-model="health" @click="showHealthPicker">
                <i class="iconfont arrow-icon">&#xe79e;</i>
            </div>
        </div>

        <mt-button class="submit-btn" @click="doSubmit">确定</mt-button>

        <div class="cover"></div>
        <div id="relation_picker" class="m-picker">
            <div class="picker-title-div">
                <span class="picker-btn ok" @click="pickerOK">确定</span>
                <span class="picker-btn cancel" @click="pickerCancel"></span>
            </div>
            <mt-picker :slots="relations" @change="onRValuesChange"></mt-picker>
        </div>
        <div id="sex_picker" class="m-picker">
            <div class="picker-title-div">
                <span class="picker-btn ok" @click="pickerOK">确定</span>
                <span class="picker-btn cancel" @click="pickerCancel"></span>
            </div>
            <mt-picker :slots="sexs" @change="onSValuesChange"></mt-picker>
        </div>
        <div id="health_picker" class="m-picker">
            <div class="picker-title-div">
                <span class="picker-btn ok" @click="pickerOK">确定</span>
                <span class="picker-btn cancel" @click="pickerCancel"></span>
            </div>
            <mt-picker :slots="healths" @change="onHValuesChange"></mt-picker>
        </div>
    </div>
</template>

<style scoped>
    .cover {
        display: none;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }

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

    .item-div span {
        display: inline-block;
        width: 80PX;
        font-size: 16PX;
    }

    .item-div input {
        border: 0;
        width: 210PX;
        outline: none;
        font-size: 16PX;
    }

    .line {
        width: 100%;
        height: 1PX;
        background-color: #e8e8e8;
    }

    .submit-btn {
        width: calc(100% - 20PX);
        color: white;
        background-color: #06c1ae;
        margin: 25PX 10PX 10PX 10PX;
    }

    .m-picker {
        display: none;
        width: 100%;
        position: fixed;
        bottom: 0;
        background-color: white;
    }

    .picker-title-div {
        padding-top: 10PX;
        padding-bottom: 10PX;
        border-bottom: solid 1PX #e8e8e8;
    }

    .picker-btn {
        color: #06c1ae;
        font-size: 15PX;
    }

    .picker-btn.ok {
        position: absolute;
        right: 10PX;
    }

    .picker-btn.cancel {
        margin-left: 10PX;
    }

    .arrow-icon {
        position: absolute;
        right: 10PX;
        top: 11PX;
        color: #92969c;
    }
</style>

<script type="text/javascript">
    import Api from '../../api';
    import $ from 'jquery';
    import Utils from '../../utils'
    import {Indicator, Picker, Button} from 'mint-ui';
    import memberItem from '../../components/memberItem/memberItem.vue';
    export default {
        data() {
            return {
                name: '',
                relation: '',
                work: '',
                workUnits: '',
                income: '',
                health: '',
                sex: '',

                sexsValue: [],
                sexsMap: [],
                sexs: [
                    {
                        flex: 1,
                        values: [],
                        className: 'sexs',
                        textAlign: 'center',
                    }
                ],
                sexKey: '',

                relationsValue: [],
                relationsMap: [],
                relations: [
                    {
                        flex: 1,
                        values: [],
                        className: 'relations',
                        textAlign: 'center',
                    }
                ],
                relationKey: '',

                healthsValue: [],
                healthsMap: [],
                healths: [
                    {
                        flex: 1,
                        values: [],
                        className: 'healths',
                        textAlign: 'center',
                    }
                ],
                healthKey: '',
            }
        },
        components: {
            [Picker.name]: Picker,
            [Button.name]: Button,
            'v-member-item': memberItem
        },
        methods: {
            onRValuesChange(picker, values) {
                this.relation = picker.getValues()[0];
                this.getRelationKey(this.relation);
            },
            getRelationKey(value) {
                for (let i = 0; i < this.relationsMap.length; i++) {
                    if (this.relationsMap[i].name == value) {
                        this.relationKey = this.relationsMap[i].id;
                    }
                }
            },
            onSValuesChange(picker, values) {
                this.sex = picker.getValues()[0];
                this.getSexKey(this.sex);
            },
            getSexKey(value) {
                for (let i = 0; i < this.sexsMap.length; i++) {
                    if (this.sexsMap[i].name == value) {
                        this.sexKey = this.sexsMap[i].id;
                    }
                }
            },
            onHValuesChange(picker, values) {
                this.health = picker.getValues()[0];
                this.getHealthKey(this.health);
            },
            getHealthKey: function (value) {
                for (let i = 0; i < this.healthsMap.length; i++) {
                    if (this.healthsMap[i].name == value) {
                        this.healthKey = this.healthsMap[i].id;
                    }
                }
            },
            showRelationPicker: function () {
                $('.cover').show();
                $('#relation_picker').slideDown('fast');
            },
            showSexPicker: function () {
                $('.cover').show();
                $('#sex_picker').slideDown('fast');
            },
            showHealthPicker: function () {
                $('.cover').show();
                $('#health_picker').slideDown('fast');
            },
            pickerOK: function () {
                $('.cover').hide();
                $('.m-picker').slideUp('fast');
            },
            pickerCancel: function () {
                $('.cover').hide();
                $('.m-picker').slideUp('fast');
            },
            doSubmit: function () {
                if (this.relation.length > 0 && this.name.length > 0 && this.sex.length > 0
                    && this.work.length > 0 && this.workUnits.length > 0 && this.income.length > 0 && this.health.length > 0) {
                    Indicator.open();
                    let param = [{
                        "WID": "",
                        "JTGXDM": this.relationKey,
                        "XM": this.name,
                        "XBDM": this.sexKey,
                        "JKZKDM": this.healthKey,
                        "ZW": this.work,
                        "GZDW": this.workUnits,
                        "PJYSR": this.income,
                        "DKSQWID": sessionStorage.getItem("DKSQWID") || ''
                    }];
                    let requestParamStr = "?requestParamStr=" + encodeURIComponent(JSON.stringify(param));
                    this.$http.get(Api.SAVE_STU_FAMILY_INFO + requestParamStr)
                        .then(res => {
                            return res.json();
                        })
                        .then(res => {
                            Indicator.close();
                            if (res.data.count == 1) {
                                Utils.methods.showTip('添加成功');
                                this.$router.go(-1);
                            } else {
                                Utils.methods.showTip('添加失败');
                            }
                        });
                } else {
                    Utils.methods.showTip('请先将信息填写完整');
                }
            }
        },
        created() {
            SDK.setTitleText('新增家庭成员');

            Indicator.open();
            let paramJTGX = "?CODE=cf5e3bc1-e94b-4910-aff3-13ded5705b23&PID=";
            this.$http.get(Api.GET_DICTONARY + paramJTGX)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.relationsMap = res.data;
                    for (let i = 0; i < this.relationsMap.length; i++) {
                        this.relationsValue.push(this.relationsMap[i].name);
                    }
                    this.relations[0].values = this.relationsValue;
                    Indicator.close();
                });

            Indicator.open();
            let paramJKZK = "?CODE=70302a56-36d1-4f5f-b61f-c2e149d27413&PID=";
            this.$http.get(Api.GET_DICTONARY + paramJKZK)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.healthsMap = res.data;
                    for (let i = 0; i < this.healthsMap.length; i++) {
                        this.healthsValue.push(this.healthsMap[i].name);
                    }
                    this.healths[0].values = this.healthsValue;
                    Indicator.close();
                });

            Indicator.open();
            let paramXB = "?CODE=b2738d0d-0eb1-4b03-b0f6-98f509a88c8c&PID=";
            this.$http.get(Api.GET_DICTONARY + paramXB)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    this.sexsMap = res.data;
                    for (let i = 0; i < this.sexsMap.length; i++) {
                        this.sexsValue.push(this.sexsMap[i].name);
                    }
                    this.sexs[0].values = this.sexsValue;
                    Indicator.close();
                });
        }
    }
</script>