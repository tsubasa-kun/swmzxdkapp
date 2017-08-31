/**
 * Created by xiekun on 2017/4/21 0021.
 */
import {Toast} from 'mint-ui';
export default {
    components: {
        [Toast.name]: Toast
    },
    methods: {
        //弹出提示
        showTip: function (msg) {
            Toast({
                message: msg,
                position: 'bottom',
                duration: 2000
            });
        },
        //获取当前时间 xxxx-xx-xx
        getCurrentDate: function () {
            let date = new Date();
            let seperator = "-";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            let currentdate = year + seperator + month + seperator + strDate;
            return currentdate;
        },
        //获取当前时间 xxxx-xx-xx xx:xx:xx
        getCurrentDateTime: function () {
            let date = new Date();
            let seperator1 = "-";
            let seperator2 = ":";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            if (hour >= 1 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minute >= 0 && minute <= 9) {
                minute = "0" + minute;
            }
            if (second >= 1 && second <= 9) {
                second = "0" + second;
            }
            let currentdate = year + seperator1 + month + seperator1 + strDate + " " + hour + seperator2 + minute + seperator2 + second;
            return currentdate;
        },
        //两个时间对比
        compareDate: function (date1, date2) {
            let oDate1 = new Date(date1);
            let oDate2 = new Date(date2);
            if (oDate1.getTime() >= oDate2.getTime()) {
                // console.log('第一个大' + date1);
                return true;
            } else {
                // console.log('第二个大' + date2);
                return false;
            }
        },
        //通过token获取文件
        getFileByToken: function (token) {
            return WEBPACK_CONIFG_HOST + '/sys/emapcomponent/file/getFileByToken/' + token + '.do';
        }
    }
}