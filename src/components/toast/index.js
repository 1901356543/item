/**
 * this.$toast.show('your text')
 */
import Vue from 'vue'
import ToastComponent from './toast'

import i18n from '../../i18n/index'

let toastNode = null,
    showToast = false,
    timer = null;
let ToastContructor = Vue.extend(ToastComponent)

let toast = {
    install: (Vue, options) => {
        let option = {
            duration: '3000'
        }
        for (let o in options) {
            option[o] = options[o]
        }
        Vue.prototype.$toast = (content, type) => {
            // console.log(i18n);
            // console.log(i18n.t('title'));
            if(/WebSocket/gi.test(content) || /network/gi.test(content)){
                content = i18n.t('lang154');
            }
            if(/fee\./gi.test(content)){
                content = i18n.t('svg24');
            }
            if(content.length <= 0){
                content = i18n.t('lang154');
            }
            if (type == 'hide') {
                toastNode.isShowToast = showToast = false;
            } else {
                if (!toastNode) {
                    toastNode = new ToastContructor({
                        data: {
                            isShowToast: showToast,
                            content
                        }
                    })
                    toastNode.$mount();
                    document.body.appendChild(toastNode.$el)
                }
                toastNode.content = content;
                toastNode.isShowToast = showToast = true;
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    toastNode.isShowToast = showToast = false
                }, option.duration)
            }
        }
        ['show', 'hide'].forEach((type) => {
            Vue.prototype.$toast[type] = (tips) => {
                return Vue.prototype.$toast(tips, type)
            }
        })
    }
}

export default toast;