// import "core-js/stable";
// import "regenerator-runtime/runtime";
// import "core-js";
// import "regenerator-runtime/runtime"
import "@babel/polyfill";

import Vue from 'vue'
import App from './App.vue'
// let App = () => import(/* webpackChunkName: "APPVue" */ './App.vue');
import router from './router'
import store from './store/store'
import i18n from './i18n/'
import './assets/css/common.scss'
import './plugins/components'
import './plugins/index'
import Toast from "@/components/toast"

import "./plugins/wallet";
import "./plugins/decimal";

Vue.use(Toast);

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
