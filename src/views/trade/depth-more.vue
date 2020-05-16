<template>
    <section class="depth-more">
        <h4>{{$t('svg51')}}</h4>
        <div id="container"></div>
        <div class="depth-more-title">
            <span>{{$t('lang157')}}</span>
            <span>{{$t('lang158')}}({{unitCoin(trade.left.currency)}})</span>
            <span>{{$t('lang159')}}({{unitCoin(trade.right.currency)}})</span>
            <span>{{$t('lang158')}}({{unitCoin(trade.left.currency)}})</span>
            <span>{{$t('lang160')}}</span>
        </div>
        <section class="depth-type-box">
            <!--<ul class="depth-type depth-type-buy">
                <li v-for="(item, i) in bids" :key="item.data.index">
                    <span>{{i + 1}}</span>
                    <span>{{toFixedNumber(item.specification.quantity.value, 4)}}</span>
                    <span>{{toFixedNumber(1 / (item.properties.makerExchangeRate || 0), 4)}}</span>
                    <i :style="{width : toFixedNumber(item.specification.quantity.value / bidsNum * 100, 2) + '%'}"></i>
                </li>
            </ul>-->
            <ul class="depth-type depth-type-buy">
                <empty v-if="bids.length <= 0"></empty>
                <li v-for="(item, i) in bids" :key="item.p">
                    <span>{{i + 1}}</span>
                    <span>{{item.v}}</span>
                    <span>{{item.p}}</span>
                    <i :style="{width : toFixedNumber(item.t / bidsNum * 100, 2) + '%'}"></i>
                </li>
            </ul>
            <ul class="depth-type depth-type-sell">
                <empty v-if="asks.length <= 0"></empty>
                <li v-for="(item, i) in asks" :key="item.p">
                    <span>{{item.p}}</span>
                    <span>{{item.v}}</span>
                    <span>{{i + 1}}</span>
                    <i :style="{width : toFixedNumber(item.t / asksNum * 100, 2) + '%'}"></i>
                </li>
                <!--<li v-for="(item, i) in asks" :key="item.data.index">
                    <span>{{toFixedNumber((item.properties.makerExchangeRate || 0), 4)}}</span>
                    <span>{{toFixedNumber(item.specification.quantity.value, 4)}}</span>
                    <span>{{i + 1}}</span>
                    <i :style="{width : toFixedNumber(item.specification.quantity.value / asksNum * 100, 2) + '%'}"></i>
                </li>-->
            </ul>
        </section>
    </section>
</template>

<script>
    import Highcharts from 'highcharts/highstock';
    export default {
        name: "depth-more",
        data() {
            return {
                type : 1,
                bids : [], // 买 buy
                asks : [], // 卖 sell
                bidsNum : 0,
                asksNum : 0,
                Highcharts : null,
                booksState : false,
            }
        },
        watch : {
            trade (){
                // this.getOrderbook();
            },
            balances (n, o){
                // this.getOrderbook();
            },
        },
        created (){
        },
        mounted (){
            this.HighchartsInit();
            // if(this.connected){
            //     this.getOrderbook();
            // }
            this.getOrderbook2();
        },
        methods : {
            HighchartsInit (){
                this.Highcharts = Highcharts.chart('container', {
                    chart: {
                        type: 'area',
                        zoomType: 'xy'
                    },
                    title: false,
                    credits: false,
                    xAxis: {
                        minPadding: 0,
                        maxPadding: 0,
                        plotLines: [{
                            color: '#888',
                            value: this.newTradeQuote.price * 1,
                            width: 1,
                            label: {
                                text: this.newTradeQuote.price * 1,
                                rotation: 90
                            }
                        }],
                        title: false
                    },
                    yAxis: [{
                        lineWidth: 1,
                        gridLineWidth: 1,
                        title: null,
                        tickWidth: 1,
                        tickLength: 5,
                        tickPosition: 'inside',
                        labels: {
                            align: 'left',
                            x: 8
                        }
                    }, {
                        opposite: true,
                        linkedTo: 0,
                        lineWidth: 1,
                        gridLineWidth: 0,
                        title: null,
                        tickWidth: 1,
                        tickLength: 5,
                        tickPosition: 'inside',
                        labels: {
                            align: 'right',
                            x: -8
                        }
                    }],
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillOpacity: 0.2,
                            lineWidth: 1,
                            step: 'center'
                        }
                    },
                    tooltip: {
                        headerFormat: `<span style="font-size=10px;">${this.$t('Trade.price')}: {point.key}</span><br/>`,
                        valueDecimals: 2
                    },
                    series: [{
                        name: this.$t('lang156'),
                        data: [],
                        color: '#D04F5F'
                    }, {
                        name: this.$t('lang155'),
                        data: [],
                        color: '#3FAE90'
                    }]
                });
            },
            getOrderbook2 (){
                let {left, right} = this.trade;
                if((left.currency || '').length <= 0){
                    return;
                }
                if((right.currency || '').length <= 0){
                    return;
                }
                this.axios({
                    url: process.env.NODE_ENV == 'development' ? "/service/books" : '/service/books',
                    params: {
                        name : this.$t('title').toLowerCase(),
                        market : (left.currency || '').toLowerCase() + '_' + (right.currency || '').toLowerCase()
                    }
                })
                    .then(res => {
                        // console.log(res);
                        this.booksState = true;
                        this.disposeBook2(res.data.books || {});
                        setTimeout(() => {
                            this.getOrderbook2();
                        }, 4000);
                    })
                    .catch(e => {
                        this.booksState = false;
                        setTimeout(() => {
                            this.getOrderbook2();
                        }, 4000);
                    });
            },
            disposeBook2 (data){
                this.asksNum = 0;
                this.bidsNum = 0;
                let asksChart = [];
                let bidsChart = [];

                let asks = (data.asks || []);
                this.asks = asks;

                let bids = (data.bids || []);
                this.bids = bids;

                // if(this.bids.length > this.asks.length){
                //     this.bids.splice(this.asks.length - 1, this.bids.length - this.asks.length);
                // }
                // if(this.asks.length > this.bids.length){
                //     this.asks.splice(this.bids.length - 1, this.asks.length - this.bids.length);
                // }
                let asksChartP = {};
                this.asks.forEach(item => {
                    item.v1 = item.v * 1 > 100000 ? 100000 : item.v * 1;
                    this.asksNum += item.v1 * 1;
                    item.t = this.asksNum;
                    if(item.p * 1 > this.newTradeQuote.price * 5){

                    }else{
                        let p = (Math.floor(item.p * 100) / 100).toString();
                        if(asksChartP[p]){
                            asksChartP[p] = asksChartP[p] + item.v * 1;
                        }else{
                            asksChartP[p] = item.v * 1;
                        }
                    }
                });
                let bidsChartP = {};
                this.bids.forEach(item => {
                    item.v1 = item.v * 1 > 100000 ? 100000 : item.v * 1;
                    this.bidsNum += item.v1 * 1;
                    item.t = this.bidsNum;

                    let p = (Math.floor(item.p * 100) / 100).toString();
                    if(bidsChartP[p]){
                        bidsChartP[p] = bidsChartP[p] + item.v * 1;
                    }else{
                        bidsChartP[p] = item.v * 1;
                    }
                });

                let aV = 0;
                let asksChartPD =Object.keys(asksChartP);
                asksChartPD.sort((a, b) => {
                    return a - b;
                });

                asksChartPD.forEach( k => {
                    aV = asksChartP[k] * 1 + aV;
                    asksChart.push([k * 1, aV]);
                });

                let bV = 0;
                let bidsChartPD =Object.keys(bidsChartP);
                bidsChartPD.sort((a, b) => {
                    return b - a;
                });
                bidsChartPD.forEach( k => {
                    bV = bidsChartP[k] * 1 + bV;
                    bidsChart.push([k * 1, bV]);
                });

                console.log(asksChart.length, bidsChart.length);
                this.Highcharts.update({
                    xAxis : {
                        plotLines: [{
                            value: this.newTradeQuote.price * 1,
                            label: {
                                text: this.newTradeQuote.price,
                            }
                        }],
                    },
                    series: [{
                        data: asksChart,
                    }, {
                        data: bidsChart.reverse(),
                    }]
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    #container{
        height: 200px;
    }
    .depth-more{
        display: block;
        color: $color3;
        padding: 15px 0;
        background: #ffffff;
        margin-bottom: 5px;
        & > h4{
            font-size: 16px;
            color: $active;
            padding: 0 12px 15px;
            margin-bottom: 12px;
            border-bottom: solid 1px $border3;
        }
        .depth-more-title{
            display: flex;
            font-size: 12px;
            text-align: center;
            padding: 10px 0 5px;
            border-top: solid 1px $border3;
            span{
                &:nth-child(1){
                    flex: 12%;
                }
                &:nth-child(2){
                    flex: 15%;
                    text-align: left;
                }
                &:nth-child(3){
                    flex: 46%;
                }
                &:nth-child(4){
                    flex: 15%;
                    text-align: right;
                }
                &:nth-child(5){
                    flex: 12%;
                }
            }
        }
        .depth-type-box{
            display: block;
            overflow: hidden;
            ul{
                display: block;
                width: 50%;
                float: left;
                min-height: 10px;
                &.depth-type-sell{
                    li{
                        i{
                            right: auto;
                            left: 0;
                            background: rgba($up, 0.2);
                        }
                        span{
                            &:nth-child(1){
                                width: 46%;
                                justify-content: start;
                                color: $up;
                                padding-left: 5px;
                            }
                            &:nth-child(2){
                                width: 30%;
                                justify-content: flex-end;
                                color: $black;
                            }
                            &:nth-child(3){
                                width: 24%;
                                justify-content: center;
                                color: $color1;
                            }
                        }
                    }
                }
                li{
                    display: flex;
                    position: relative;
                    height: 25px;
                    line-height: 25px;
                    i{
                        display: block;
                        position: absolute;
                        height: 100%;
                        width: 80%;
                        z-index: 1;
                        background: rgba($down, 0.2);
                        right: 0;
                        top: 0;
                    }
                    span{
                        display: flex;
                        position: relative;
                        z-index: 10;
                        &:nth-child(1){
                            width: 24%;
                            justify-content: center;
                            color: $color3;
                        }
                        &:nth-child(2){
                            width: 30%;
                            justify-content: start;
                            color: $black;
                        }
                        &:nth-child(3){
                            width: 46%;
                            justify-content: flex-end;
                            color: $down;
                            padding-right: 5px;
                        }
                    }
                }
            }
        }
    }
</style>