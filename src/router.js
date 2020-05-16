import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import nav3D from './views/nav3D.vue'

let Wallet = () => import(/* webpackChunkName: "wallet" */ './views/wallet/index.vue');
let AcceptCoin = () => import(/* webpackChunkName: "wallet" */ './views/wallet/acceptCoin.vue');
let shoukuan = () => import(/* webpackChunkName: "wallet" */ './views/wallet/shoukuan.vue');
let zhuanqian = () => import(/* webpackChunkName: "wallet" */ './views/wallet/zhuanqian.vue');
let zhuanqian2 = () => import(/* webpackChunkName: "wallet" */ './views/wallet/zhuanqian2.vue');
let gateway = () => import(/* webpackChunkName: "wallet" */ './views/wallet/gateway.vue');
let detais = () => import(/* webpackChunkName: "wallet" */ './views/wallet/detais.vue');
let scanning = () => import(/* webpackChunkName: "wallet" */ './views/wallet/scanning.vue');

// import Trade from './views/trade/index.vue' //交易中心
let Trade = () => import(/* webpackChunkName: "trade" */ './views/trade/index.vue');
// import lastOrder from './views/trade/lastOrder' //交易中心历史记录
let lastOrder = () => import(/* webpackChunkName: "trade" */ './views/trade/lastOrder.vue');
// import tradeDetails from './views/trade/tradeDetails' //交易中心对应k线深度图页面
let tradeDetails = () => import(/* webpackChunkName: "trade" */ './views/trade/tradeDetails.vue');

import Download from './views/download' //下载界面
import Invite from "./views/invite" //邀请
import binding from "./views/wallet/binding" //邀请

// import Advert from './views/user/advert.vue' //公告
let Advert = () => import(/* webpackChunkName: "user" */ './views/user/advert.vue');

// import AdvertDetails from './views/user/advertDetails.vue' //公告详情
let AdvertDetails = () => import(/* webpackChunkName: "user" */ './views/user/advertDetails.vue');
// import User from "./views/user" //我的首页
let User = () => import(/* webpackChunkName: "user" */ './views/user/index.vue');
// import Lang from "./views/user/lang" //语言设置
let Lang = () => import(/* webpackChunkName: "user" */ './views/user/lang.vue');
// import AccountManage from './views/user/accountManage' //账号管理
let AccountManage = () => import(/* webpackChunkName: "user" */ './views/user/accountManage.vue');
// import ExportAddr from './views/user/exportAddr' //导出地址
let ExportAddr = () => import(/* webpackChunkName: "user" */ './views/user/exportAddr.vue');
// import MnemonicWord from './views/user/mnemonicWord' //备份助记词
let MnemonicWord = () => import(/* webpackChunkName: "user" */ './views/user/mnemonicWord.vue');
// import ChangeSecurePsw from './views/user/changeSecurePsw' //修改安全密码
let ChangeSecurePsw = () => import(/* webpackChunkName: "user" */ './views/user/changeSecurePsw.vue');
// import AddrDetail from './views/user/addrDetail' //地址详情
let AddrDetail = () => import(/* webpackChunkName: "user" */ './views/user/addrDetail.vue');
// import RemoveAddr from './views/user/removeAddr' //移除地址
let RemoveAddr = () => import(/* webpackChunkName: "user" */ './views/user/removeAddr.vue');
// import ExportSecretKey from './views/user/exportSecretKey' //导出私钥
let ExportSecretKey = () => import(/* webpackChunkName: "user" */ './views/user/exportSecretKey.vue');

import Login from './views/login' //登陆
import SetupAddr from './views/login/setupAddr' //创建地址
import importWallet from './views/login/importWallet' //导入钱包

// import Dapp from './views/dapp/index.vue' //DAPP首页
let Dapp = () => import(/* webpackChunkName: "dapp" */ './views/dapp/index.vue');
// import Convolution from './views/dapp/convolution' //卷积
let Convolution = () => import(/* webpackChunkName: "dapp" */ './views/dapp/convolution.vue');
// import Exchange from './views/dapp/exchange' //兑换
let Exchange = () => import(/* webpackChunkName: "dapp" */ './views/dapp/exchange.vue');
// import DigMine from './views/dapp/digMine' //挖矿
let DigMine = () => import(/* webpackChunkName: "dapp" */ './views/dapp/digMine.vue');
// import HashGuess from './views/dapp/hashGuess' //竞猜
let HashGuess = () => import(/* webpackChunkName: "dapp" */ './views/dapp/hashGuess.vue');
// import Sequence from './views/dapp/sequence' //接龙
let Sequence = () => import(/* webpackChunkName: "dapp" */ './views/dapp/sequence.vue');
// import TradeCompaign from './views/dapp/tradeCompaign' //交易大赛
let TradeCompaign = () => import(/* webpackChunkName: "dapp" */ './views/dapp/tradeCompaign.vue');
// import NewbieReward from './views/dapp/newbieReward' //新人奖
let NewbieReward = () => import(/* webpackChunkName: "dapp" */ './views/dapp/newbieReward.vue');
// import XPowerCompaign from './views/dapp/xPowerCompaign' //X算力争霸
let XPowerCompaign = () => import(/* webpackChunkName: "dapp" */ './views/dapp/xPowerCompaign.vue');
// import YPowerCompaign from './views/dapp/yPowerCompaign' //Y算力竞赛
let YPowerCompaign = () => import(/* webpackChunkName: "dapp" */ './views/dapp/yPowerCompaign.vue');
// import AlphaPowerDetail from './views/dapp/alphaPowerDetail' //α算力明细
let AlphaPowerDetail = () => import(/* webpackChunkName: "dapp" */ './views/dapp/alphaPowerDetail.vue');
// import BetaPowerDetail from './views/dapp/betaPowerDetail' //β算力明细
let BetaPowerDetail = () => import(/* webpackChunkName: "dapp" */ './views/dapp/betaPowerDetail.vue');
let market = () => import(/* webpackChunkName: "dapp" */ './views/market/index.vue');
let fund = () => import(/* webpackChunkName: "dapp" */ './views/fund/index.vue');
let funding = () => import(/* webpackChunkName: "dapp" */ './views/fund/fund.vue');
let fundDetail = () => import(/* webpackChunkName: "dapp" */ './views/fund/detail.vue');
let fundRecord = () => import(/* webpackChunkName: "dapp" */ './views/fund/record.vue');
let kuangchilist = () => import ('./views/kuangchilist/index.vue'); // 矿池列表
let jisuan = () => import('./views/kuangchilist/jisuan.vue'); // 计算公式
let bizhongapply = () => import('./views/bizhongapply/index.vue'); // 币种发行申请
let yajin = () => import('./views/bizhongapply/yajin.vue'); // 支付押金
let appleCoin = () => import('./views/bizhongapply/appleCoin.vue'); // 支付押金
let xrwg = () => import('./views/qianbao/xrwg.vue'); // 信任网关

let zhongchou = () => import('./views/zhongchou/index.vue') // 众筹主页
let preheat = () => import('./views/zhongchou/preheat.vue') // 预热
let underway  = () => import('./views/zhongchou/underway.vue') // 进行中
let finished  = () => import('./views/zhongchou/finished.vue') // 已结束

let zen = () => import('./views/zhongchou/zen.vue'); // 去众筹
let zcrecord = () => import('./views/zhongchou/zcrecord.vue') // 众筹记录
let zcdetail = () => import('./views/zhongchou/zcdetail.vue') // 众筹详情页


import currency from "./views/user/currency"
import explorer from "./views/user/explorer"
import acceptCoin2 from "./views/dapp/acceptCoin2"
import acceptCoin3 from "./views/dapp/acceptCoin3"
import acceptCoin4 from "./views/dapp/acceptCoin4"
import digMineQuery from "./views/dapp/digMineQuery"
import detais2 from "./views/dapp/detais2"
import Issued from "./views/dapp/issued"
import invteRecord from "./views/invite/invteRecord"
let demo = () => import(/* webpackChunkName: "wallet" */ './views/wallet/demo.vue');
let convertAds = () => import(/* webpackChunkName: "wallet" */ './views/wallet/convertAds');
let convertUsdt = () => import(/* webpackChunkName: "wallet" */ './views/wallet/convertUsdt');
let convertSGY = () => import(/* webpackChunkName: "wallet" */ './views/wallet/convertSGY');
Vue.use(Router)
export default new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    mode: (/file/gi.test(location.href)) ? 'hash' : process.env.NODE_ENV === 'production' ? 'hash' : 'history',
    // base: process.env.BASE_URL,
    base: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
    scrollBehavior(to, from, savedPosition) {
        if (document.querySelector('.router-box')) {
            document.querySelector('.router-box').scrollTop = 0;
        }
        return { x: 0, y: 0 }
    },
    routes: [
        // {
        //     path: '/',
        //     name: 'nav3D',
        //     component : nav3D,
        // },
        {
            path: '/',
            redirect: (/file/gi.test(location.href)) ? '/home' : process.env.NODE_ENV === 'production' ? '/download' : '/home',
            // path: '/download',
            // name: 'download',
            // component: Download
        },
        {
            path: '/appleCoin',
            name: 'appleCoin',
            component: appleCoin,
            props: true
        },
        {
            path: '/digMineQuery/:adr?',
            name: 'digMineQuery',
            component: digMineQuery,
            props: true
        },
        {
            path: '/acceptCoin3',
            name: 'acceptCoin3',
            component: acceptCoin3
        },
        {
            path: '/acceptCoin4',
            name: 'acceptCoin4',
            component: acceptCoin4
        },
        {
            path: '/convertSGY',
            name: 'convertSGY',
            component: convertSGY
        },
        {
            path: '/convertAds',
            name: 'convertAds',
            component: convertAds
        },
        {
            path: '/convertUsdt',
            name: 'convertUsdt',
            component: convertUsdt
        },
        {
            path: '/invteRecord',
            name: 'invteRecord',
            component: invteRecord
        },
        {
            path: '/explorer',
            name: 'explorer',
            component: explorer
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/demo',
            name: 'demo',
            component: demo
        },
        {
            path: '/currency',
            name: 'currency',
            component: currency
        },
        {
            path: '/acceptCoin2/:coin?',
            name: 'acceptCoin2',
            component: acceptCoin2,
            props: true
        },
        {
            path: '/detais2',
            name: 'detais2',
            component: detais2
        },
        {
            path: '/binding/:invite?',
            name: 'binding',
            component: binding
        },
        {
            path: '/gateway/:address?/:coin?',
            name: 'gateway',
            component: gateway
        },
        {
            path: '/scanning/:type?',
            name: 'scanning',
            component: scanning,
            props: true
        },
        {
            path: '/importWallet',
            name: 'importWallet',
            component: importWallet
        },
        {
            path: '/trade',
            name: 'trade',
            component: Trade
        },
        {
            path: '/tradeDetails',
            name: 'tradeDetails',
            component: tradeDetails
        },
        {
            path: '/lastOrder',
            name: 'lastOrder',
            component: lastOrder
        },
        {
            path: '/wallet',
            name: 'wallet',
            component: Wallet
        },
        {
            path: '/dapp',
            name: 'dapp',
            component: Dapp
        },
        {
            path: '/shoukuan',
            redirect: '/shoukuan/XRP'
        },
        {
            path: '/shoukuan/:coin/:type?',
            name: 'shoukuan',
            component: shoukuan,
            props: true
        },
        // {
        //     path: '/zhuanqian',
        //     redirect: '/zhuanqian/XRP'
        // },
        {
            path: '/zhuanqian/:coin?/:toAddress?/:gateway?',
            name: 'zhuanqian',
            component: zhuanqian,
        },
        {
            path: '/zhuanqian2',
            redirect: '/zhuanqian2/XRP'
        },
        {
            path: '/zhuanqian2/:coin/:toAddress?/:gateway?',
            name: 'zhuanqian2',
            component: zhuanqian2,
        },
        {
            path: '/detais/:id',
            name: 'detais',
            component: detais,
            props: true
        },
        {
            path: '/advert',
            name: 'advert',
            component: Advert
        },
        {
            path: '/advertDetails/:index',
            name: 'advertDetails',
            component: AdvertDetails,
            props: true
        },
        {
            path: '/acceptCoin',
            redirect: '/acceptCoin/0'
        },
        {
            path: '/acceptCoin/:activeIdx',
            name: 'acceptCoin',
            component: AcceptCoin,
            props: true
        },
        {
            path: '/download',
            name: 'download',
            component: Download
        },
        {
            path: '/invite',
            name: 'invite',
            component: Invite
        },
        {
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '/lang',
            name: 'lang',
            component: Lang
        },
        {
            path: '/changeSecurePsw',
            name: 'changeSecurePsw',
            component: ChangeSecurePsw
        },
        {
            path: '/accountManage',
            name: 'accountManage',
            component: AccountManage
        },
        {
            path: '/exportAddr',
            name: 'exportAddr',
            component: ExportAddr
        },
        {
            path: '/mnemonicWord/:mnemonic/:stepType',
            name: 'mnemonicWord',
            component: MnemonicWord,
            props: true
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/convolution',
            name: 'convolution',
            component: Convolution
        },
        {
            path: '/exchange',
            name: 'exchange',
            component: Exchange
        },
        {
            path: '/digMine',
            name: 'digMine',
            component: DigMine
        },
        {
            path: '/hashGuess',
            name: 'hashGuess',
            component: HashGuess
        },
        {
            path: '/sequence',
            name: 'sequence',
            component: Sequence
        },
        {
            path: '/tradeCompaign',
            name: 'tradeCompaign',
            component: TradeCompaign
        }, {
            path: '/newbieReward',
            name: 'newbieReward',
            component: NewbieReward
        }, {
            path: '/xPowerCompaign',
            name: 'xPowerCompaign',
            component: XPowerCompaign
        }, {
            path: '/yPowerCompaign',
            name: 'yPowerCompaign',
            component: YPowerCompaign
        },
        {
            path: '/alphaPowerDetail',
            name: 'alphaPowerDetail',
            component: AlphaPowerDetail
        },
        {
            path: '/betaPowerDetail',
            name: 'betaPowerDetail',
            component: BetaPowerDetail
        },
        {
            path: '/addrDetail/:address/:backups?',
            name: 'addrDetail',
            component: AddrDetail,
            props: true,
        },
        {
            path: '/removeAddr',
            name: 'removeAddr',
            component: RemoveAddr
        },
        {
            path: '/exportSecretKey/:address/:seed',
            name: 'exportSecretKey',
            component: ExportSecretKey,
            props: true
        },
        {
            path: '/setupAddr',
            name: 'setupAddr',
            component: SetupAddr
        },
        {
            path: '/issued',
            name: 'issued',
            component: Issued
        },
        {
            path: '/market',
            name: 'market',
            component: market
        },
        {
            path: '/fund',
            name: 'fund',
            component: fund
        },
        {
            path: '/funding',
            name: 'funding',
            component: funding
        },
        {
            path: '/fundDetail',
            name: 'fundDetail',
            component: fundDetail
        },
        {
            path: '/fundRecord',
            name: 'fundRecord',
            component: fundRecord
        },
        {
            path: '/jisuan/:coin',
            name: 'jisuan',
            component: jisuan,
            props: true
        },
        {
            path: '/kuangchilist',
            name: 'kuangchilist',
            component: kuangchilist
        },
        {
            path: '/bizhongapply',
            name: 'bizhongapply',
            component: bizhongapply
        },
        {
            path: '/yajin/:gateway?',
            name: 'yajin',
            component: yajin,
            props: true
        },
        {
            path: '/xrwg',
            name: 'xrwg',
            component: xrwg
        },
        {
            path: '/zhongchou',
            name: 'zhongchou',
            component: zhongchou,
            // 嵌套路由
            children:[
                {
                    path: 'preheat',
                    name: 'preheat',
                    component: preheat
                },
                {
                    path: 'underway',
                    name: 'underway',
                    component:underway 
                },
                {
                    path: 'finished',
                    name: 'finished',
                    component: finished
                },
            ]
        },
        {
            path: '/zen',
            name: zen,
            component: zen
        },
        {
            path: '/zcrecord',
            name: zcrecord,
            component: zcrecord
        },
        {
            path: '/zcdetail',
            name: zcdetail,
            component: zcdetail
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
    ]
})
