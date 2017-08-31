import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import VueResource from 'vue-resource';
import route from './router';
import init from 'bh-mixin-sdk';
// import SDK, {
//     init
// } from 'bh-mobile-sdk';
import 'mint-ui/lib/style.css'
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;//支持post
const router = new VueRouter(route);
// let Init = () => {
//     new Vue({
//             el: '#app',
//             router: router,
//             render: h => h(App)
//     });
// }
// if (process.env.NODE_ENV === 'production') {
//     init(() => {
//         var sdk = SDK();
//         if(sdk.UI && sdk.UI.toggleNavBar) {
//             sdk.UI.toggleNavBar(false);
//         }
//         Init()
//     })
// } else {
//     init(() => {
//         var sdk = SDK();
//         if(sdk.UI && sdk.UI.toggleNavBar) {
//             sdk.UI.toggleNavBar(false);
//         }
//         Init()
//     })
// }


global.SDK = null;

var SITE_URL = WEBPACK_CONIFG_HOST;
var DEFAULT_API_MODULE = '';

function getSDKConfig () {
    return new Promise((resolve, reject) => {
        let config = {
            wx: {
                uploadImgsToEmapUrl: SITE_URL + DEFAULT_API_MODULE + '/sys/yxapp/WechatServiceStu/saveFileFromWechat.do'
            }, //微信jdk初始化参数
            dd: {}, //钉钉jdk初始化参数
        };
        if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
            config.wx.url = SITE_URL + DEFAULT_API_MODULE + '/sys/yxapp/WechatServiceStu/getWechatSign.do';
            getWechatSign(window.location.href.replace(/#(\S+)?/, '')).then(({data: resp}) => {
                if (resp.status == 200) {
                    let signData = resp.datas;
                    signData.corpId = signData.corpid;
                    signData.nonceStr = signData.noncestr;
                    config.wx.signData = signData;
                    resolve(config)
                } else {
                    ons.notification.alert('微信jsdk初始化失败');
                    reject(resp)
                }
            }, () => {
                ons.notification.alert('微信jsdk初始化失败');
                reject()
            })
        } else {
            setTimeout(function() {
                resolve(config)
            }, 0)
        }

        return config
    })
}

getSDKConfig().then((config) => {
    init((res) => {
        if (res.type === 'success') {
            global.SDK = res.sdk;
            // router.start(App, '#app')
            new Vue({
                el: '#app',
                router: router,
                render: h => h(App)
            });
        }
    }, config)
});
