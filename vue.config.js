let appState = process.argv[4] === 'app';
process.env.appState = appState;
global.APP_STATE = appState;
const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var plugins =[];
var optimization = {
    splitChunks : {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/](ripple|web3|bip39|ripple-binary-codec|ripple-lib|lodash|sockjs-client|crypto-js|decimal\.js)[\\/]/,
                name: 'rcp',
                chunks: 'all'
            },
        }
    }
};
if(process.env.NODE_ENV === 'production'){
    console.log('=================production=====================');
}else{
    // plugins.push(new BundleAnalyzerPlugin());
}
module.exports = {
    configureWebpack: {
        optimization,
        plugins,
    },
    publicPath: appState ? './static/' : process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: appState ? 'D:\\rcpApp\\jidiandAPP\\static' : path.resolve(__dirname, "./dist"),
    assetsDir: appState ? "./" : "static",
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    transpileDependencies : process.env.NODE_ENV === 'production' ? [/node_modules/gi] : [],
    // transpileDependencies: [
    //     'axios',
    //     'chart.js',
    //     'decimal',
    //     'decimal.js',
    //     'highcharts',
    //     'qrcode',
    //     'rcp-offline-wallet',
    //     'swiper',
    //     'vue',
    //     'vue-axios',
    //     'vue-clipboard2',
    //     'vue-i18n',
    //     'vue-router',
    //     'vuex',
    // ],
    devServer: {
        proxy: {
            // '/service/children': {
            //     target: 'http://192.168.0.117:9001/',
            //     secure: false,
            //     changeOrigin: true,
            //     pathRewrite: {}
            // },
            // '/service/get_my_issue_info': {
            //     target: 'http://192.168.0.117:9001/',
            //     secure: false,
            //     changeOrigin: true,
            //     pathRewrite: {}
            // },
            // '/service/issue': {
            //     target: 'http://192.168.0.117:9001/',
            //     secure: false,
            //     changeOrigin: true,
            //     pathRewrite: {}
            // },
            // '/service/get_issue_list': {
            //     target: 'http://192.168.0.117:9001/',
            //     secure: false,
            //     changeOrigin: true,
            //     pathRewrite: {}
            // },
            // '/service/books': {
            //     target: 'http://47.240.110.55:9003/',
            //     secure: false,
            //     changeOrigin: true,
            //     pathRewrite: {}
            // },
            // '/service/quote': {
            //     // target: 'https://trading.adrchain.org/',
            //     target: 'http://47.240.110.55:9003/',
            //     secure: false,
            //     changeOrigin: true,
            //     pathRewrite: {}
            // },
            // '/service/kline': {
            //     target: 'http://api.sgy.plus/',
            //     secure: false,
            //     changeOrigin: true,
            //     pathRewrite: {}
            // },
            '/service': {
                // target: 'http://192.168.0.117:9001/',
                target: 'http://api2.sgy.plus/',
                secure: false,
                changeOrigin: true,
                pathRewrite: {}
            },
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/css/config.scss";`
            },
        }
    },
    chainWebpack: config => {
        // config.plugin('html').tap(args => {
        //     // args[0].filename = "test.html";
        //     return args;
        // });

        // config.entry = ["@babel/polyfill", "./src/main.js"];
        // console.log(config.entry.app);
        // config.entry.app = ["@babel/polyfill", "./src/main.js"];
        // config.entry('app').add("@babel/polyfill");
        // console.log(config.entry);
        // config.module.rule('js');

        // config.module.rule('compile')
        //     .test(/\.js$/)
        //     .include
        //     .add(resolve('src'))
        //     // .add('/node_modules/')
        //     .add(resolve('node_modules'))
        //     .end()
        //     .use('babel')
        //     .loader('babel-loader')
        //     .options({
        //         presets: [
        //             [
        //                 "@babel/preset-env",
        //                 {
        //                     modules: false,
        //                 }
        //             ]
        //         ],
        //     });
        // config.entry('app').add('@babel/polyfill');

        if (appState) {
            config.plugin('html').tap(args => {
                args[0].filename = "D:\\rcpApp\\jidiandAPP\\index.html";
                return args;
            });

            config.plugin('copy').tap(args => {
                args[0][0].ignore.push('app/*');
                args[0][0].ignore.push('pdf/*');
                return args;
            });
        }
    }
}