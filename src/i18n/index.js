import Vue from "vue"
import VueI18n from "vue-i18n"

import zh from './lang/zh.json';
import zhCN from './lang/zh-tw.json'
import en from './lang/en.json'
import ru from './lang/ru.json'
Vue.use(VueI18n);

let localeOption = window.localStorage.getItem('localeOption');
let locale = 'zh';
if(/offlinewallet/gi.test(navigator.userAgent)){
    if(/android/gi.test(navigator.userAgent)){
        locale = 'zh';
    }else{
        locale = 'en';
    }

}
if(localeOption) {
    try {
        locale = JSON.parse(localeOption).locale;
    }catch (e) {
    }
}

let  vueI18n =  new VueI18n({
    locale: locale,
    messages : {
        zh,
        zhCN,
        en,
        ru
    }
});

export default vueI18n;