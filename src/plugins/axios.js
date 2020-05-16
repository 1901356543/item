import axios from "axios";
import Vue from 'vue'
import vueAxios from 'vue-axios'

var instance = axios.create({
    // baseURL: (/file/gi.test(location.href)) ? 'http://47.240.110.55:9003' : process.env.NODE_ENV == 'development' ? '' : 'https://api.adrchain.org',
    // baseURL: (/file/gi.test(location.href)) ? 'http://api.sgy.plus' : process.env.NODE_ENV == 'development' ? 'http://47.240.110.55:9900' : 'http://api.sgy.plus',
    baseURL: (/file/gi.test(location.href)) ? 'http://api.sgy.plus' : process.env.NODE_ENV == 'development' ? 'http://api2.sgy.plus' : 'http://api.sgy.plus',
    // baseURL: (/file/gi.test(location.href)) ? 'http://47.240.110.55:9900' : process.env.NODE_ENV == 'development' ? 'http://47.240.110.55:9900' : 'http://api.sgy.plus',
    // withCredentials: process.env.NODE_ENV == "development" ? false : false,
    method: "get",
    responseType: "json",
    timeout: 10000,
    headers: {}
});

if(typeof location == 'object' && /https/.test(location.href)){
    instance.defaults.baseURL = 'https://api.sgy.plus';
}

instance.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
instance.interceptors.request.use(function (config) {
    // console.log(config.url);
    if(/\?/g.test(config.url)){

    }else{
        config.url = config.url + '?' + (new Date()).getTime();
    };
    return config;
}, function (error) {
    return Promise.reject(error);
});



instance.interceptors.response.use(
    function(res) {
        if (res.data && res.data.error_code == 0) {
            return Promise.resolve(res.data);
        } else {
            return Promise.reject({
                code: ((res.data && res.data.error_code) ? res.data.error_code : -2),
                message:
                (res.data && res.data.error) ||
                res.config.url.replace(res.config.baseURL, "") +
                "<br />Serve Response Error！(*^▽^*)"
            });
        }
    },
    function(error) {
        // console.log(JSON.stringify(error));
        if (error.message.indexOf("timeout of") === 0) {
            return Promise.reject({
                message: "业务繁忙，请稍后重试",
                code: -1
            });
        }

        return Promise.reject({
            message: error.message,
            code: error.code
        });
    }
);

Vue.use(vueAxios, instance);
export default instance;
