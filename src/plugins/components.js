import Vue from 'vue';
import header from '../components/header'
import empty from '../components/empty'
// let header = () => import(/* webpackChunkName: "components" */ '../components/header');
let button = () => import(/* webpackChunkName: "components" */ '../components/button');
let qrcode = () => import(/* webpackChunkName: "components" */ '../components/qrcode');
// let empty = () => import(/* webpackChunkName: "components" */ '../components/empty');
let countdown = () => import(/* webpackChunkName: "components" */ '../components/countdown');
let rankList = () => import(/* webpackChunkName: "components" */ '../components/rankList');
let powerDetail = () => import(/* webpackChunkName: "components" */ '../components/powerDetail');
let modal = () => import(/* webpackChunkName: "components" */ '../components/modal');
let copy = () => import(/* webpackChunkName: "components" */ '../components/copy');
let load = () => import(/* webpackChunkName: "components" */ '../components/load');
let submitBtn = () => import(/* webpackChunkName: "components" */ '../components/submitBtn');

Vue.component('Header', header);
Vue.component('submitBtn', submitBtn);
Vue.component('rButton', button);
Vue.component('rQrcode', qrcode);
Vue.component('Empty', empty);
Vue.component('Countdown', countdown);
Vue.component('RankList', rankList);
Vue.component('PowerDetail', powerDetail);
Vue.component('rModal', modal);
Vue.component('rCopy', copy);
Vue.component('load', load);