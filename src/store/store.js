import Vue from 'vue'
import Vuex from 'vuex'
import { mapState } from 'vuex'

Vue.use(Vuex);

Vue.mixin({
    computed : {
        ...mapState([
            'connected',
            'connectedTime',
            'isjihuo',
            'balances',
            'balancesXRP',
            'moneyUnit',
            'moneyConvert',
            'coinVolume',
            'fee',
            'invite',
            'inviteAddress',
            'isBinding',
            'balancesBTC',
            'btcAddress',
            'balancesOthers',
            'adAddress',
            'adData',
            'btcDepositAddress',
            'inviteServe',
            'rcp_info',
            'isTrustBtc',
            'inviteX',
            'inviteY',
            'nav3DState',
            'trade',
            'balancesUSDT',
            'usdt_omni',
            'usdt_erc20',
            'guide',
            'pas',
            'ust_gateway_address',
            'lock_asset',
            'newPrice',
            'quote',
            'newTradeQuote',
            'lock_node_asset',
            'gatewayMain',
            'gatewayBalances',
            'chonbi_address',
            'isConnected',
            'isTrustBtcState',
            'moneyConvertAll',
            'acitve_wk',
            'earnings',
            'earningsState',
            'isTrade',
            'api_record',
            'appUpdateStatus',
            'qianggou_edu',
            'qianggou_ust',
            'qianggou_open',
            'orderBalance',
            'vip',
            'earningsLabels',
            'balancesKey',
            'coin_logo',
        ])
    },
});

// r3X73sspnDdFfohkEaUHM81uyMtHuupB7W   shpWCEKcks4PHi9XEcQnwDDchjZ2x
let inviteAddress = 'r3X73sspnDdFfohkEaUHM81uyMtHuupB7W';
// rfsxcm8AqdhCVz1re3bBn9pvwYtGtaTYEW   snt9XjibLt7TjEPYZW8LfLkHgmdo2
let btcAddress = 'rfsxcm8AqdhCVz1re3bBn9pvwYtGtaTYEW';
// rabp6QeFztgCXvjtrz7MuENAbSGxSMH5WQ   sn884U2pfdWqCRKFsSve7wHx3rMJY
let adAddress = 'rabp6QeFztgCXvjtrz7MuENAbSGxSMH5WQ';

let guide = 0;
let isTrade = true;
if(/offlinewallet/gi.test(navigator.userAgent) && !/android/gi.test(navigator.userAgent)){
    isTrade = false;
}
let Store = new Vuex.Store({
    state: {
        get_issue_list_item : {},  // 行情
        coin_logo : {},  // 行情
        chonbi_address : {},  // 行情
        gatewayMain : {},  // 行情
        gatewayBalances : {},  // 行情
        newTradeQuote : {},  // 行情
        quote : {},  // 行情
        rcp_info : {},  // rcp_info  rcp 系统相关地址
        inviteAddress : inviteAddress,  // 激活地址
        btcAddress : btcAddress, // BTC 网关地址
        adAddress : adAddress, // 公告 网关地址
        btcDepositAddress : "", // BTC 充币地址
        ust_gateway_address : "", // USDT 网关
        invite : "",
        lock_asset : "",
        pas : "",
        lock_node_asset : 0,
        connectedTime : 0,
        tradePrice : 0,
        newPrice : 0,
        usdt_omni : "",
        usdt_erc20 : "",
        inviteX : "",
        inviteY : "",
        inviteServe : "",
        earningsLabels : "",
        showNav : true,
        isBinding : false,
        qianggou_open : false,
        api_record : false,
        isTrade : isTrade,
        acitve_wk : false,
        guide : 1,
        isTrustBtc : false,
        isTrustBtcState : false,
        nav3DState : false,
        isConnected : false,
        earningsState : false,
        connected : false,
        isjihuo : false, // 链激活状态
        balances : [],  // 链上全部资产余额
        balancesKey : [],  // 链上全部资产余额
        balancesOthers : [],  // 链上除了XRP BTC 官方网关资产余额
        balancesXRP : {}, // 主链余额
        balancesXRPTotal : {}, // 主链余额
        balancesBTC : {}, // BTC余额
        balancesUSDT : {}, // USDT余额
        moneyUnit : 'CNY', // ¥ 人民币 CNY， $ 美元 USD，₽ 俄罗斯 RUB
        moneyConvert : 1, // 当前当我 换算价格 1 XRP = 1 moneyUnit
        moneyConvertAll : {}, // 当前当我 换算价格 1 XRP = 1 moneyUnit
        coinVolume : [], // 当前地址货币列表
        earnings : [],
        fee : 0, // 手续费
        qianggou_edu : 0, // 手续费
        qianggou_ust : 0, // 手续费
        adData : [],  // 公告数据
        appUpdateStatus : false,
        vip : false,
        acceptCoin2Item : {},  // 公告数据
        orderBalance : {},  // 公告数据
        trade : {
            init : false,
            right : {
                // "currency": "ADS",
                // "counterparty": "rUv87XRK3nnpfHizwC9eRD1b7xHydXGPkU"
            },
            left : {
                // "currency": "XRP",
            }
        }
    },
    mutations: {
        coin_logo (state, data) {
            state.coin_logo = data;
        },
        get_issue_list_item (state, data) {
            state.get_issue_list_item = data;
        },
        balancesKey (state, data) {
            state.balancesKey = data;
        },
        earningsLabels (state, data) {
            state.earningsLabels = data;
        },
        vip (state, data) {
            state.vip = data;
        },
        orderBalance (state, data) {
            state.orderBalance = data;
        },
        qianggou_open (state, data) {
            state.qianggou_open = data;
        },
        qianggou_edu (state, data) {
            state.qianggou_edu = data;
        },
        qianggou_ust (state, data) {
            state.qianggou_ust = data;
        },
        appUpdateStatus (state, data) {
            state.appUpdateStatus = data;
        },
        api_record (state, data) {
            state.api_record = data;
        },
        isTrade (state, data) {
            state.isTrade = data;
        },
        connectedTime (state, data) {
            state.connectedTime = data;
        },
        earningsState (state, data) {
            state.earningsState = data;
        },
        earnings (state, data) {
            state.earnings = data;
        },
        acitve_wk (state, data) {
            state.acitve_wk = data;
        },
        isTrustBtcState (state, data) {
            state.isTrustBtcState = data;
        },
        isConnected (state, data) {
            state.isConnected = data;
        },
        chonbi_address (state, data) {
            state.chonbi_address = data;
        },
        gatewayBalances (state, data) {
            state.gatewayBalances = data;
        },
        gatewayMain (state, data) {
            state.gatewayMain = data;
        },
        lock_node_asset (state, data) {
            state.lock_node_asset = data;
        },
        newTradeQuote (state, data) {
            state.newTradeQuote = data;
        },
        quote (state, data) {
            state.quote = data;
        },
        newPrice (state, data) {
            state.newPrice = data;
            // state.moneyConvert = (state.moneyConvertAll[state.moneyUnit.toLowerCase() + '_price'] || 1) * data;
        },
        lock_asset (state, data) {
            state.lock_asset = data;
        },
        tradePrice (state, data) {
            state.tradePrice = data;
        },
        pas (state, data) {
            state.pas = data;
        },
        guide (state, data) {
            state.guide = data;
        },
        usdt_erc20 (state, data) {
            state.usdt_erc20 = data;
        },
        usdt_omni (state, data) {
            state.usdt_omni = data;
        },
        ust_gateway_address (state, data) {
            state.ust_gateway_address = data;
        },
        balancesUSDT (state, data) {
            state.balancesUSDT = data;
        },
        trade (state, data) {
            state.trade = data;
        },
        acceptCoin2Item (state, data) {
            state.acceptCoin2Item = data;
        },
        nav3DState (state, data) {
            state.nav3DState = data;
        },
        inviteX (state, data) {
            state.inviteX = data;
        },
        inviteY (state, data) {
            state.inviteY = data;
        },
        isTrustBtc (state, data) {
            state.isTrustBtc = data;
        },
        rcp_info (state, data) {
            state.rcp_info = data;
        },
        inviteServe (state, data) {
            state.inviteServe = data;
        },
        btcDepositAddress (state, data) {
            state.btcDepositAddress = data;
        },
        moneyConvertAll (state, data) {
            state.moneyConvertAll = data;
        },
        adData (state, data) {
            state.adData = data;
        },
        adAddress (state, data) {
            state.adAddress = data;
        },
        balancesOthers (state, data) {
            state.balancesOthers = data;
        },
        btcAddress (state, data) {
            state.btcAddress = data;
        },
        balancesBTC (state, data) {
            state.balancesBTC = data;
        },
        isBinding (state, data) {
            state.isBinding = data;
        },
        inviteAddress (state, data) {
            state.inviteAddress = data;
        },
        invite (state, data) {
            state.invite = data;
        },
        connected (state, data) {
            state.connected = data;
        },
        fee (state, data) {
            state.fee = data;
        },
        coinVolume (state, data) {
            state.coinVolume = data;
        },
        moneyConvert (state, data) {
            state.moneyConvert = data;
            // if(state.newPrice > 0){
            //     state.moneyConvert = data * state.newPrice;
            // }else{
            //     state.moneyConvert = data;
            // }
        },
        moneyUnit (state, data) {
            state.moneyUnit = data;
            // if(state.newPrice > 0){
            //     state.moneyConvert = state.moneyConvertAll[state.moneyUnit.toLowerCase() + '_price'] || 1 * state.newPrice;
            // }else{
            //     state.moneyConvert = state.moneyConvertAll[state.moneyUnit.toLowerCase() + '_price'] || 1;
            // }
            state.moneyConvert = state.moneyConvertAll[state.moneyUnit.toLowerCase() + '_price'] || 1;
        },
        balancesXRP (state, data) {
            state.balancesXRP = data;
        },
        balances (state, data) {
            state.balances = data;
        },
        isjihuo (state, data) {
            state.isjihuo = data;
        },
        showNav (state, data) {
            state.showNav = data;
        },

    },
    actions: {

    }
});

function plusReady2(callback) {
    if(window.plus) {
        setTimeout(function() {
            callback();
        }, 0);
    } else {
        document.addEventListener("plusready", function() {
            callback();
        }, false);
    }
};

function analysisVersion(str) {
    let l = str.split('.');
    let num = 0;
    l.forEach((item, i) => {
        num += Math.pow(10, l.length - 1 - i) * item;
    });
    console.log(num);
    return num;
}

if(/offlinewallet/gi.test(navigator.userAgent)){
    let version = '1.0.0';
    plusReady2(function () {
        if(typeof plus == 'object'){
            version = plus.runtime.version;
        }
        Store.commit('guide', localStorage.getItem(version) || 0);
    })
}else{
    Store.commit('guide', localStorage.getItem('guide2') || 0);
    // let guide = localStorage.getItem('guide2') || 0;
}

export default Store;