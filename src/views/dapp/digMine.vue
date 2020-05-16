<template>
    <section class="dig-mine">
        <Header :title="$t('lang104')" :rightEv='toacceptCoin' titleColor="#fff" :color="headColor" :leftIcon="require('../../assets/images/top_return_white@2x.png')" :rightIcon="require('../../assets/images/transaction_list_upper_white@2x.png')" />
        <!--  -->
        <div class="coin">{{unitCoin(coin)}}</div>
        <div class="mine-card-info">
            <!-- 激活 -->
            <div class="mine-card-activated" v-if="item.acitve_wk || earningsState2 == false">
                <div class="ystd-profit">{{labels[labels.length - 1] || '-'}} {{$t('lang103')}} <span @click="$router.push('/acceptCoin2/' + coin)">{{$t('svg57')}}</span></div>
                <div class="profit">{{earningsState2 == false ? '-' : (data[data.length - 1] || 0)}} {{$t('title')}}</div>
                <div class="cash">≈ {{(decimal.mul((data[data.length - 1] || 0), moneyConvert)).toFixed(2)}} {{moneyUnit}}</div>
            </div>
            <!-- 未激活 -->
            <div class="mine-card-unactivated" v-else>
                <div class="state">{{$t('lang105')}}</div>
                <div class="statement">{{$t('lang106').replace(/50SGY/gi, (item.min_chibi || 210) + unitCoin(coin))}}</div>
                <span class="to-activate" @click="showActivatedModal">{{$t('lang107')}}</span>
            </div>
            <div class="mask"></div>
        </div>
        <div class="container">

            <div class="x-calc-power calc-power-group">
                <div class="icon-subtitle">
                    <span class="subtitle">{{$t('svg9')}}</span>
                    <span class="subtitle">{{$t('svg10')}}</span>
                </div>
                <div class="divider"></div>
                <div class="calc-power-row">
                    <span class="cal-power-value">{{item.x_power || 0}}</span>
                    <span class="cal-power-value">{{item.y_power || 0}}</span>
                </div>
                <div class="icon-subtitle">

                </div>
            </div>


            <div class="x-calc-power calc-power-group">
                <!--<div class="power-item">
                    <div class="power-item-name">{{$t('lang122')}}</div>
                    <div class="power-item-value">{{item.x_power_base || 0}}</div>
                </div>
                <div class="divider"></div>
                <div class="power-item">
                    <div class="power-item-name">{{$t('lang123')}}</div>
                    <div class="power-item-value">{{item.coin_age || 0}}</div>
                </div>
                <div class="divider"></div>
                <div class="power-item">
                    <div class="power-item-name">{{$t('lang124')}}</div>
                    <div class="power-item-value">{{(item.x_coinage_bonus_power || 0)}}</div>
                </div>-->
                <!--<div class="divider"></div>-->
                <!--<div class="power-item">-->
                    <!--<div class="power-item-name">{{$t('lang125')}}</div>-->
                    <!--<div class="power-item-value">{{(item.y_power_bonus_rate || 0) * 100}} %</div>-->

                <!--</div>-->
                <!--<div class="divider"></div>-->
                <!--<div class="power-item">-->
                    <!--<div class="power-item-name">{{$t('lang126')}}</div>-->
                    <!--<div class="power-item-value">{{(item.y_power_bonus || 0)}}</div>-->
                <!--</div>-->
                <!--<div class="divider"></div>
                <div class="power-item">
                    <div class="power-item-name">{{$t('lang127')}}</div>
                    <div class="power-item-value">{{(item.x_power || 0)}}</div>
                </div>
                <div class="divider" v-if="coin != 'XRP'"></div>-->
                <div class="power-item" v-if="coin != 'XRP'">
                    <div class="power-item-name">{{$t('svg3')}}</div>
                    <div class="power-item-value">{{(item.sgy_power || 0)}}</div>
                </div>
                <div class="divider" v-if="coin != 'XRP'"></div>
                <div class="power-item">
                    <div class="power-item-name">{{$t('adr10')}}</div>
                    <div class="power-item-value">{{(item.best_chibi || 0)}} <span>({{$t('svg56')}} : {{item.best_chibi_profit || '-'}})</span></div>
                </div>
                <div class="divider"></div>
                <div class="power-item">
                    <div class="power-item-name">{{$t('adr11')}}</div>
                    <div class="power-item-value">{{(item.min_chibi || 0)}}</div>
                </div>
                <div class="divider"></div>
                <div class="power-item">
                    <div class="power-item-name" style="height: 50px; display: flex; align-items: center;">
                        {{$t('svg11')}}
                    </div>
                    <div class="power-item-value rprt" @click="$router.push({path: '/jisuan/' + coin})">
                        <sup>3</sup>√<ruby>P <small>max</small><rp>(</rp><rt class="rt-bottom">———</rt><rp>)</rp></ruby>
                        + P<sub>1</sub>
                        + P<sub>2</sub>
                        + P<sub>3</sub>
                        ......
                        P<sub>n</sub>
                    </div>
                </div>
            </div>


            <div class="last-week-profit calc-power-group">
                <div class="icon-subtitle">
                    <i class="icon"></i>
                    <span class="subtitle">{{$t('lang116')}}</span>
                    <!--<small class="subtitle-f" @click="$router.push('/acceptCoin/10')">{{$t('svg12')}}</small>-->
                </div>
                <div class="divider"></div>
                <canvas class="chart-7Day"></canvas>
            </div>

            <div class="last-week-profit calc-power-group">
                <div class="icon-subtitle">
                    <i class="icon"></i>
                    <span class="subtitle">{{$t('svg4')}}</span>
                </div>
                <div class="divider"></div>
                <canvas class="chart-7Day2"></canvas>
            </div>
        </div>
        <!-- 币种选择 -->
        <div class="coin-list-dialog" v-if="coinShow">
            <div class="dialog-wrap" @click="coinShow = false"></div>
            <div class="dialog-content">
                <div class="row" v-for="item in coinVolume" v-if="vCoin(item)" :key="item" @click="selectCoin(item)">{{unitCoin(item)}}</div>
            </div>
        </div>
    </section>
</template>

<script>
    import Chart from 'chart.js';
    export default {
        data(){
            return{
                isShowModal: false,
                earningsState2: false,
                item : [],
                labels : [],
                labels2 : [],
                data : [],
                data2 : [],
                myBarChart : null,
                myBarChart2 : null,
                coinShow: false,
                coinList: ['ETH', 'TRX', 'EOS', 'USDT', 'BTC', 'BCH', 'VBC', 'PYC', 'ETC'],
                coin: 'XRP',
                headColor: 'transparent'
            }
        },
        created (){
            this.getData();
        },
        mounted () {
            window.addEventListener("scroll", this.handleScroll); //监听滚动事件
            // console.log(document.querySelector(".chart-7Day"));
        },

        destroyed (){
            if(this.myBarChart){
                this.myBarChart.destroy();
            }
            if(this.myBarChart2){
                this.myBarChart2.destroy();
            }
        },
        methods: {
            vCoin (name){
                if(this.coinList.indexOf(this.unitCoin(name)) >= 0){
                    return false;
                }
                return true;
            },
            handleScroll(){
                let top =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop; //兼容不同的浏览器
                if (top > 1) {
                    this.headColor = 'linear-gradient(315deg, #fb3b5b 0%, #ff6780 100%)'
                }
            },
            selectCoin(item){
                this.coin = item;
                this.coinShow = false;
                this.getData();
            },
            toacceptCoin (){
                this.coinShow = !this.coinShow;
                //this.$router.push('/invteRecord')
            },
            chart2 (){
                if(document.querySelector(".chart-7Day2")){
                    var ctx = document.querySelector(".chart-7Day2").getContext('2d');
                    this.myBarChart2 = new Chart(ctx, {
                        type: 'line',
                        data:  {
                            labels: this.labels2,
                            datasets: [
                                {
                                    borderColor : "#FB3B5B",
                                    backgroundColor : "#FB3B5B",
                                    data: this.data2,
                                    fill: false,
                                    borderWidth: 1,
                                }
                            ],
                        },
                        options: {
                            legend : false,
                        }
                    });
                }
            },
            chart (){
                if(document.querySelector(".chart-7Day")){
                    var ctx = document.querySelector(".chart-7Day").getContext('2d');
                    this.myBarChart = new Chart(ctx, {
                        type: 'line',
                        data:  {
                            labels: this.labels,
                            datasets: [
                                {
                                    borderColor : "#FB3B5B",
                                    backgroundColor : "#FB3B5B",
                                    data: this.data,
                                    fill: false,
                                    borderWidth: 1,
                                }
                            ],
                        },
                        options: {
                            legend : false,
                        }
                    });
                }
            },
            submitActive(){
                this.isShowModal = false;

            },
            showActivatedModal(){
                if(this.isjihuo == false){
                    this.$toast.show(this.$t('home.home8'));
                    return;
                }
                if(this.invite){
                    let balance = 0;
                    this.balances.forEach(item =>{
                        if(item.currency == this.coin.toUpperCase()){
                            balance = item.value || 0;
                        }
                    });
                    if(balance < (this.item.min_chibi || 10)){
                        this.$router.push('/shoukuan');
                    }else{
                        this.$toast.show(this.$t('svg5'));
                    }
                }else{
                    // this.$store.commit('isBinding', true);
                    this.$toast.show(this.$t('home.home14'));
                    this.$router.push('/shoukuan');
                }
            },
            getData (){
                this.axios({
                    url : "/service/wk_info",
                    params : {
                        address : this.account.getAddress(),
                        currency : this.coin.toLowerCase()
                        // address : 'rx08'
                    }
                }).then(data => {
                    // console.log(data);
                    this.earningsState2 = true;
                    this.item = data.data || [];
                    this.labels = [];
                    this.data = [];
                    if(this.item._7day_total_profit){
                        let _7day_total_profit = this.item._7day_total_profit || [];
                        _7day_total_profit.forEach(item => {
                            let t = (new Date(item.time));
                            this.labels.push((t.getMonth() + 1) + '/' + t.getDate());
                            this.data.push(item.profit);
                        })
                    }
                    if(this.item.acitve_wk == false){
                        if((this.balancesKey[this.coin.toUpperCase()] || {}).value >= this.item.min_chibi * 1){
                            this.item.acitve_wk = true;
                        }
                    }
                    let x =[
                        210,   225,    226,
                        269,   301,    320,
                        366,   948,    951,
                        2300, 64106, 107613
                    ];
                    let y= [
                        0.24398533171648565,
                        1.031456153776577,
                        1.0811395913058424,
                        1.4811729028677667,
                        1.7428856583036145,
                        1.8765411029245955,
                        1.9754414668326168,
                        2.7596467108391414,
                        2.7608129887154154,
                        3.222659027719853,
                        3.4920692171391075,
                        3.49510153961742
                    ];

                    // this.data2 = y;
                    // this.labels2 = x;
                    this.data2 = (data.data.hold_rate_plot || {}).y || [];
                    this.labels2 = (data.data.hold_rate_plot || {}).x || [];
                    this.chart();
                    this.chart2();
                }).catch(e => {
                    console.log(e.message);
                    // this.chart();
                })
            },
        }
    };
</script>

<style lang="scss" scoped>
    .chart-7Day{
        height: 200px;
        margin-top: 15px;
        width: 100%;
    }
    .dig-mine {
        background-color: $bodybg;
        position: relative;
        .power-item-value.rprt{
            color: $blue !important;
        }
        .rt-bottom{
            border-bottom: solid 1px $blue;
            text-indent: -9999px;
        }
        .coin{
            position: fixed;
            top: 13px;
            right: 50px;
            color: #fff;
            font-size: 16px;
            z-index: 10;
        }
        .mine-card-info {
                background-image: url("../../assets/images/mining_card_bj@2x.png");
                background-size: 100% 100%;
                padding: 60px 20px 22.5px;
                position: relative;
                background: linear-gradient(315deg,rgba(251,59,91,1) 0%,rgba(255,103,128,1) 100%);
                
                .mine-card-activated {
                    margin-bottom: 15px;
                    .ystd-profit {
                        color: rgba(255, 255, 255, 1);
                        font-size: 16px;
                        margin-bottom: 12px;
                        overflow: hidden;
                        span{
                            display: block;
                            float: right;
                            font-size: 12px;
                        }
                    }
                    .profit {
                        font-size: 34px;
                        color: $white;
                        margin-bottom: 5px;
                        font-family: DINAlternate-Bold, DINAlternate;
                    }
                    .cash {
                        font-size: 16px;
                        color: $white;
                        font-family: LucidaGrande-Bold, LucidaGrande;
                    }
                    i.eye {
                        background-size: 100% 100%;
                        background-image: url("../../assets/images/mining_asset_eye@2x.png");
                        display: inline-block;
                        width: 22px;
                        height: 22px;
                        position: absolute;
                        right: 20px;
                        top: 20px;
                    }
                }
                .mine-card-unactivated {
                    position: relative;
                    color: $white;
                    overflow: hidden;
                    .state {
                        font-size: 29px;
                        font-weight: bold;
                        margin-bottom: 10px;
                        line-height: 1.4;
                    }
                    .statement {
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 15px;
                    }
                    .to-activate {
                        position: absolute;
                        right: 0;
                        top: 0;
                        padding: 6px 12px;
                        background-color: $white;
                        font-size: 14px;
                        color: $blue;
                        border-radius: 17px;
                    }
                }
                .mask{
                    height: 20px;
                    border-radius: 60px 60px 0px 0px;
                    background: #F9F9F9;
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    left: 0;
                }
            }

        .container {
            margin: 0 15px;

            .divider {
                background: $inpBg;
                height: 1px;
                margin: 0 -15px;
            }

            .power-item {
                padding: 15px 0;
                overflow: hidden;
                font-size: 14px;
                .power-item-name {
                    float: left;
                    color: $color1;
                }
                .power-item-value {
                    float: right;
                    color: $active;
                    .power-item-arrow {
                        margin-left: 6px;
                        width: 7px;
                        height: 9px;
                        background-image: url("../../assets/images/triangle@2x.png");
                        background-size: 100% 100%;
                        display: inline-block;
                    }
                    span{
                    }
                }
            }

            .calc-power-group {
                margin: 15px 0;
                padding: 14px 15px 0px;
                background: $border2;
                color: $white;
                box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
                overflow: hidden;
            }
            .x-calc-power{
                .icon-subtitle {
                    display: flex;
                    justify-content: space-between;
                }
            }

            .icon-subtitle {
                margin-bottom: 14px;
                .icon {
                    vertical-align: middle;
                    margin-right: 8px;
                    display: inline-block;
                    background-size: 100% 100%;
                    width: 14px;
                    height: 14px;
                    margin-top: -2px;
                }
                .subtitle {
                    font-size: 12px;
                    color: $active;
                }
                .subtitle-f{
                    display: block;
                    position: absolute;
                    right: 15px;
                    top: 15px;
                    color: $blue;
                }
            }

            
            .x-calc-power {
                .icon {
                    background-image: url("../../assets/images/mining_x@2x.png");
                }

                .calc-power-row {
                    margin: 18px 0;
                    font-size: 24px;
                    font-weight: bold;
                    display: flex;
                    justify-content: space-between;
                    color: $active;
                }
            }

            .y-calc-power {
                .icon {
                    background-image: url("../../assets/images/mining_y@2x.png");
                }
            }

            .last-week-profit {
                position: relative;
                .icon {
                    background-image: url("../../assets/images/mining_profit@2x.png");
                }

                .profit-chart {
                    padding: 15px 0;

                    .pillar-group {
                        display: flex;
                        align-items: baseline;
                        justify-content: space-between;

                        .pillar {
                            height: 50px;
                            width: 16px;
                            border-radius: 100px 100px 0 0;
                            background:linear-gradient(180deg,rgba(1,101,237,1) 0%,rgba(1,101,237,0) 100%);
                        }
                    }

                    .no-data {
                        padding: 47px 0;
                        text-align: center;
                        i.no-data-logo {
                            margin: 0 auto;
                            background-image: url("../../assets/images/blank_page@2x.png");
                            background-size: 100% 100%;
                            display: inline-block;
                            border: 1px dashed $color1;
                            width: 80px;
                            height: 80px;
                        }

                        .no-data-note {
                            color: $color1;
                            font-size: 12px;
                        }
                    }

                    .inside-chart {
                        margin: 0;
                    }

                    .date-group {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        .date {
                            color: $color1;
                            font-size: 10px;
                            line-height: 10px;
                            margin-top: 8px;
                        }
                    }
                }
            }
        }
        .active-content{
            text-align: center;
            font-size: 14px;
            color:$color1;
        }
        .coin-list-dialog{
            .dialog-wrap{
                position: fixed;
                width: 100%;
                height: 100%;
                top: 50px;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1;
            }
            .dialog-content{
                background-color: #fff;
                text-align: center;
                position: fixed;
                width: 100%;
                top: 50px;
                z-index: 2;
                
                .row{
                    padding: 15px 0;
                }
            }
        }
    }
</style>