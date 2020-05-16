<template>
    <div class="k-box">
        <div id="chart_container" :class="fullState ? 'full-screen' : ''"></div>
        <load v-if="widgetState == false"></load>
    </div>
</template>
<script>
    export default {
        name:'k',
        data (){
            return {
                onRealtimeCallback: null,
                onHistoryCallback: null,
                fullState: false,
                chartInitState: true,
                chartBarState: false,
                widget : null,
                widgetState : false,
                destroyedState : false,
                bg: '#ffffff',
                resolution: "15",
                chartPlotState: false,
                borderColor: 'rgba(0,0,0,0.1)',
                up: '#0cba71',
                down: '#ff400c',
                supported_resolutions: ['1', '5', '15', '60', "D", "W", 'M'],
                bar : [],
                supported_resolutionsElm: [],
            }
        },
        mounted (){
            this.getKlineData();
        },
        destroyed (){
            this.destroyedState = true;
            if(this.widget){
                this.widget.remove();
            }
        },
        methods : {
            checkData (data){
                var bar = [];
                data.forEach(item => {
                    bar.push({
                        time: item.t,
                        close: item.c,
                        open: item.o,
                        high: item.h,
                        low: item.l,
                        volume: item.v
                    });
                });
                return bar;
            },
            initChart (){
                console.log('initChart');
                if (typeof TradingViewState == 'boolean' && TradingViewState) {
                    this.setWidget();
                } else {
                    window.addEventListener('DOMContentLoaded', () => {
                        window.TradingViewState = true;
                        this.setWidget();
                    }, false);
                };
            },
            getKlineData (update){
                if(this.destroyedState) return;
                let currency1 = this.trade.left.currency || '';
                let currency2 = this.trade.right.currency || '';
                let resolutionCopy = this.resolution;
                let resolution = /W/gi.test(this.resolution) || /M/gi.test(this.resolution) ? 10080 : /D/gi.test(this.resolution) ? 24 * 60 + "" : this.resolution;
                // console.log('getKlineData', resolution);
                if((currency1 || '').length <= 0){
                    return;
                }
                if((currency2 || '').length <= 0){
                    return;
                }
                let option = {
                    name : (this.$t('title') || '').toLowerCase(),
                    market : `${currency1.toLowerCase()}_${currency2.toLowerCase()}`,
                    kline : resolution,
                    ch : Date.now(),
                };
                if(update){

                }else{
                    option.count = 500;
                }
                this.axios({
                    url: process.env.NODE_ENV == 'development' ? "/service/kline" : '/service/kline',
                    // method : 'post',
                    params: option
                })
                    .then(res => {
                        // console.log(resolutionCopy, this.resolution);
                        let data = res.data && res.data.klines || [];
                        let bar = this.checkData(data);
                        console.log(resolution, '-----------');
                        if(update){
                            if(this.onRealtimeCallback){
                                // console.log(bar[0]);
                                // console.log(JSON.stringify(this.bar[this.bar.length - 1]));
                                let b = bar[0];
                                // let n = Date.now();
                                // b.time =  n - (n % 60000);
                                // // console.log(b);
                                this.onRealtimeCallback(b);
                            }
                            // setTimeout(() => {
                            //     this.getKlineData(true);
                            // }, 3000)
                        }else{
                            if(resolution == res.data.kline){
                                this.bar = bar;
                            }
                            // this.getKlineData(true);
                            // if(this.onHistoryCallback){
                            //     if (this.bar.length) {
                            //         this.onHistoryCallback(this.bar, {noData: false});
                            //     } else {
                            //         this.onHistoryCallback([], {noData: true});
                            //     };
                            // }
                        }
                        if(this.onHistoryCallback){
                            if(resolution != res.data.kline){
                                this.getKlineData();
                                return;
                            }else{
                                this.widget.chart().setResolution(this.resolution, () => {
                                    console.log('setResolution', this.resolution);
                                });
                            }
                        }else{
                            console.log('initChart');
                            this.initChart();
                        }
                    })
                    .catch(e => {
                        // this.getKlineData(update);
                        setTimeout(() => {
                            this.getKlineData(update);
                        }, 3000)
                        // console.log(e);
                    });
            },
            datafeed () {
                var {onReady, searchSymbols, resolveSymbol, getBars, subscribeBars, unsubscribeBars, calculateHistoryDepth, getMarks, getTimescaleMarks, getServerTime} = this;
                return {
                    onReady,
                    searchSymbols,
                    resolveSymbol,
                    getBars,
                    subscribeBars,
                    unsubscribeBars,
                    calculateHistoryDepth,
                    getMarks,
                    getTimescaleMarks,
                    getServerTime
                };
            },
            setWidget (){
                var {bg, borderColor, up, down} = this;
                let symbol = this.trade.left.currency;
                this.widget = new TradingView.widget({
                    symbol: symbol.toUpperCase(),
                    interval: this.resolution,
                    datafeed: this.datafeed(),
                    library_path: (/file/gi.test(location.href)) ? "./static/charting_library/" : process.env.NODE_ENV == 'development' ?  "/charting_library/" : './static/charting_library/',
                    locale: "zh",
                    // preset: "mobile",
                    timezone: "Asia/Shanghai",
                    // charts_storage_api_version: "1.1",
                    client_id: 'tradingview.com',
                    user_id: 'public_user_id',
                    // debug: true,
                    enabled_features: [

                    ],
                    // "header_widget"
                    disabled_features: [
                        "widget_logo",
                        "adaptive_logo",
                        "left_toolbar",
                        "pane_context_menu",
                        "legend_context_menu",
                        "show_hide_button_in_legend",
                        "show_interval_dialog_on_key_press",
                        "snapshot_trading_drawings",
                        'timeframes_toolbar',
                        'header_symbol_search',
                        'header_saveload',
                        'header_saveload_to_the_right',
                        'header_compare',
                        'header_undo_redo',
                        'header_screenshot',
                        'control_bar',
                        'header_resolutions',
                        'header_interval_dialog_button',
                        'show_interval_dialog_on_key_press',
                        'display_market_status',
                        "save_chart_properties_to_local_storage",
                        "volume_force_overlay",
                        "items_favoriting",
                        "header_indicators",
                        "header_fullscreen_button",
                    ],
                    overrides: {
                        "volumePaneSize": "small",
                        'paneProperties.background': bg,
                        'paneProperties.vertGridProperties.color': borderColor,
                        'paneProperties.horzGridProperties.color': borderColor,
                        'scalesProperties.textColor': '#888888',
                        'scalesProperties.lineColor': borderColor,
                        'mainSeriesProperties.haStyle.borderColor' : borderColor,
                        'mainSeriesProperties.candleStyle.upColor' : up,
                        'mainSeriesProperties.candleStyle.borderUpColor' : up,
                        'mainSeriesProperties.candleStyle.borderDownColor' : down,
                        'mainSeriesProperties.candleStyle.downColor' : down,
                        'mainSeriesProperties.candleStyle.wickUpColor' : up,
                        'mainSeriesProperties.candleStyle.wickDownColor' : down,
                        'mainSeriesProperties.barStyle.upColor' : up,
                        'mainSeriesProperties.barStyle.downColor' : down,
                        'timeScale.rightOffset' : 2,
                        'paneProperties.topMargin' : 10,
                        "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0)",
                        "volume.columnsStyle.upColor": up,
                        "volume.columnsStyle.downColor": down,
                        // "mainSeriesProperties.style" : 1
                    },
                    chart_zoom: 0,
                    favorites: {
                        intervals: this.supported_resolutions,
                    },
                    studies_overrides : {
                        "macd.macd.color": "#ffff0b",
                        "macd.Signal.color": "#ff80ff",
                        "stoch.%k.color": "#ffff0b",
                        "stoch.%d.color": "#ff80ff",
                        "stoch.hlines background.transparency": 90,
                        "volume.volume.color.0": down,
                        "volume.volume.color.1": up,
                        "volume.volume.transparency": 100,
                    },
                    study_count_limit: 15,
                    // custom_css_url : './css/chart.css',
                    fullscreen: false,
                    autosize: true,
                    toolbar_bg: bg,
                    chart_type: 'area',
                    loading_screen: {backgroundColor: bg, foregroundColor: borderColor},
                    container_id: "chart_container",
                });

                let widget = this.widget;
                let self = this;
                this.widget.headerReady().then(() => {
                    // console.log('headerReady');
                    setTimeout(() => {
                        if (document.querySelector('#chart_container iframe') && document.querySelector('#chart_container iframe').contentWindow.document.querySelector(".pane-legend-minbtn")) {
                            document.querySelector('#chart_container iframe').contentWindow.document.querySelector(".pane-legend-minbtn.apply-common-tooltip.apply").click();
                        };
                        this.widgetState = true;
                    }, 500);

                    this.supported_resolutionsElm = [];
                    function createHeaderButton(text, title, clickHandler, options) {
                        var button = widget.createButton(options);
                        button.setAttribute('title', title);
                        if(/^[0-9]*$/.test(text)){
                            if(text * 1 >= 60){
                                text = (text * 1) / 60 + self.$t('k2');
                            }else{
                                text = text + self.$t('k1');
                            }
                        }
                        text = text.replace(/D/gi, self.$t('k3'));
                        text = text.replace(/W/gi, self.$t('k4'));
                        text = text.replace(/M/gi, self.$t('k5'));
                        button.textContent =  text;
                        button.addEventListener('click', clickHandler);
                        return button;
                    }

                    this.supported_resolutions.forEach((item, index) => {
                        let elm = createHeaderButton(item, item, () => {
                            console.log('createHeaderButton', item);
                            self.resolution = item;
                            self.bar = [];
                            this.getKlineData();
                        });
                        self.supported_resolutionsElm.push(elm);
                        if(item == this.resolution){
                            elm.classList.add("over");
                        };
                    });
                    // let fullElm = createHeaderButton('', 'full', () => {
                    //     this.fullState = !this.fullState;
                    //     if(this.fullState){
                    //         fullElm.classList.add("over");
                    //     }else{
                    //         fullElm.classList.remove("over");
                    //     }
                    //     if(/Token\sBinary/gi.test(navigator.userAgent)){
                    //         if(this.fullState){
                    //             plus.screen.lockOrientation("landscape-primary");
                    //         }else{
                    //             plus.screen.lockOrientation("portrait-primary");
                    //         }
                    //     };
                    // }, {
                    //     align : "right"
                    // });
                    // fullElm.classList.add("fullElm");

                    this.widget.chart().onIntervalChanged().subscribe(null, (interval, obj) => {
                        // console.log('onIntervalChanged', interval);
                        this.supported_resolutionsElm.forEach(em => {
                            em.classList.remove("over");
                        })
                        if(this.supported_resolutions.indexOf(interval.toString()) >= 0){
                            // console.log('onIntervalChanged2', interval);
                            this.supported_resolutionsElm[this.supported_resolutions.indexOf(interval.toString())].classList.add("over");
                        };
                    });

                    let ma5 = this.widget.chart().createStudy('Moving Average', false, false, [5], this.hideLegend, {});

                    let ma10 = this.widget.chart().createStudy('Moving Average', false, false, [10], this.hideLegend, {
                        'plot.color': '#ff80ff'
                    });

                    let ma30 = this.widget.chart().createStudy('Moving Average', false, false, [30], this.hideLegend, {
                        'plot.color': '#376415'
                    });

                    let macd =  this.widget.chart().createStudy('MACD', false, false, [], null);

                }).catch(e => {
                    console.log(e);
                });
            },
            onReadyCallbackParam () {
                return {
                    supports_marks: false,
                    supports_timescale_marks: false,
                    supports_time: false,
                    supports_group_request: true,
                    timezone: "Asia/Shanghai",
                    supported_resolutions: this.supported_resolutions
                }
            },
            onSymbolResolvedCallbackParam () {
                let currency1 = this.trade.left.currency;
                currency1 = this.unitCoin(currency1);
                let currency2 = this.trade.right.currency;
                currency2 = this.unitCoin(currency2);
                return {
                    name: currency1,
                    ticker: currency1 + '_' + currency2,
                    description: currency1 + '/' + currency2,
                    exchange: 'SGY',
                    listed_exchange: 'SGY',
                    sector: currency2,
                    has_intraday: true,
                    has_seconds: true,
                    has_daily: true,
                    // has_no_volume  : true,
                    has_weekly_and_monthly: true,
                    has_empty_bars: true,
                    intraday_multipliers: ['1', '5', '15', '30', '60', '1440', '10080'],
                    seconds_multipliers: [],
                    minmov: 1,
                    pricescale: Math.pow(10, 4),
                    volume_precision: 2,
                    session: "24x7",
                    // timezone : "Asia/Shanghai",
                    timezone: "Asia/Shanghai",
                    supported_resolutions: this.supported_resolutions,

                };
            },
            onReady (callback) {
                setTimeout(() => {
                    callback(this.onReadyCallbackParam());
                }, 0);
            },
            searchSymbols (userInput, exchange, symbolType, onResultReadyCallback) {
            },
            resolveSymbol (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
                setTimeout(() => {
                    onSymbolResolvedCallback(this.onSymbolResolvedCallbackParam());
                }, 0);
            },
            getBars (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
                // console.log('getBars', resolution, firstDataRequest);
                this.onHistoryCallback = onHistoryCallback;
                if (firstDataRequest) {
                    if (this.bar.length) {
                        onHistoryCallback(this.bar, {noData: false});
                    } else {
                        onHistoryCallback([], {noData: true});
                    }
                    // this.resolution = resolution;
                } else {
                    onHistoryCallback([], {noData: true});
                }
                // if(firstDataRequest){
                //     this.getKlineData();
                // }
                // onHistoryCallback(this.bar, {noData: false});
            },
            subscribeBars (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
                // console.log('subscribeBars', resolution);
                this.onRealtimeCallback = onRealtimeCallback;
            },
            unsubscribeBars (subscriberUID) {
            },
            calculateHistoryDepth (resolution, resolutionBack, intervalBack) {
                // console.log('calculateHistoryDepth', resolution);
                if (resolution == 1 || resolution == 5 || resolution == 15 || resolution == 30 || resolution == 60) {
                    return {
                        resolutionBack: 'D',
                        intervalBack: 365
                    };
                } else {
                    return {
                        resolutionBack: 'M',
                        intervalBack: 12
                    };
                }
            },
            getMarks (symbolInfo, startDate, endDate, onDataCallback, resolution) {

            },
            getTimescaleMarks (symbolInfo, startDate, endDate, onDataCallback, resolution) {
            },
            getServerTime (callback) {
                console.log('getServerTime');
                callback(Math.floor((Date.now() / 1000)));
            },
        }
    }
</script>
<style lang="scss" scoped>
    .k-box{
        z-index: 99999;
        height: 400px;
        border-bottom: solid 1px $border;
        margin-bottom: 5px;
        background: #fff;
        box-shadow:0px 0px 10px 0px rgba($border, 0.1);
        position: relative;
        .load{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            min-height: auto;
            background: #fff;
            z-index: 9999;
        }
        #chart_container {
            z-index: 1;
            position: relative;
            height: 100%;
            &.full-screen{
                position: fixed;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                z-index: 999999999999;
            }
            iframe {
                display: block;
                position: relative;
                z-index: 1;
                width: 100%;
                height: 100%;
                background: #fff;
            }
        }
    }
</style>

