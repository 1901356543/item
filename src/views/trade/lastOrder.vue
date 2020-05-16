<template>
    <section class="lastOrder">
        <Header :title="$t(`Trade.nojilu`)"></Header>
        <Empty v-if="loadState == false && list.length <= 0"></Empty>
        <load v-if="loadState"></load>
        <div class="detais" v-for="item in list" :key="item.id" :class="{ up : geyType(item) == 'sell', down : geyType(item) == 'buy',}">
            <div class="t">
                <div class="t_l">
                    <span class="type">{{geyType(item) == 'sell'  ? $t(`Trade.cansell`) : $t(`Trade.canbuy`)}}</span>
                    <span class="coin">{{unitCoin(item.specification.quantity.currency)}}/{{unitCoin(item.specification.totalPrice.currency)}}</span>
                </div>
                <div class="t_r">
                    {{getState(item) == 'created'
                    ? $t('lang92')
                    : getState(item) == 'partially-filled' ? $t('lang93')
                    : getState(item) == 'cancelled' ? $t('lang95')
                    : $t(`lang94`)}}
                </div>
            </div>
            <div class="c">
                <div class="textbox textbox2">
                    <div class="text1">{{$t(`Trade.entrusetprice`)}}</div>
                    <div class="tet2">
                        {{getPrice2(item)}}
                        <!--{{-->
                        <!--geyType(item) == 'sell'-->
                        <!--? decimal(getChanges(item).makerExchangeRate).toFixed(8) * 1-->
                        <!--: decimal(1 / getChanges(item).makerExchangeRate).toFixed(8) * 1-->
                        <!--}}-->
                        {{unitCoin(item.specification.totalPrice.currency)}}
                    </div>
                </div>
                <div class="textbox textbox2">
                    <div class="text1">{{getState(item) == 'created' ? $t(`Trade.entrustnum`) : $t(`Trade.volume`)}}</div>
                    <div class="tet2">{{getState(item) == 'created' ? getTotal(item).entrustNum : getTotal(item).quantity}} {{unitCoin(item.specification.quantity.currency)}}</div>
                </div>
                <div class="textbox textbox3">
                    <div class="text1">{{$t(`Trade.finished`)}}</div>
                    <div class="tet2">{{getTotal(item).totalPrice}} {{unitCoin(item.specification.totalPrice.currency)}}</div>
                </div>
            </div>
            <div class="c">
                <div class="textbox" style="width:100%;">
                    <div class="text1">TX : </div>
                    <div class="tet2">
                        <r-copy :copyText="item.id">
                            {{item.id}}
                        </r-copy>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data (){
            return {
                list : [],
                loadState : true
            }
        },
        watch : {
            balances (n, o){
                // this.getPayment();
            },
        },
        created (){
            if(this.connected){
                this.getPayment();
            }
        },
        methods : {
            // getPrice (item){
            //     let type = "buy";
            //     if(item.outcome.orderbookChanges[this.rcp.address]){
            //         type = this.geyType (item);
            //     }else{
            //         type = this.getChanges(item).direction;
            //     }
            //     if(type == 'buy'){
            //         return this.decimal(1 / this.getChanges(item).makerExchangeRate).toFixed(8) * 1
            //     }else{
            //         return this.decimal(this.getChanges(item).makerExchangeRate).toFixed(8) * 1
            //     }
            // },
            geyType (item){
                if(item.address == this.rcp.address){
                    return item.specification.direction;
                }else{
                    return item.outcome.orderbookChanges[this.rcp.address] && item.outcome.orderbookChanges[this.rcp.address][0].direction;
                }
                // if(item.outcome.orderbookChanges[this.rcp.address]){
                //     return item.outcome.orderbookChanges[this.rcp.address][0].direction;
                // }else{
                //     return item.specification.direction;
                // }
            },
            getState (item){
                if(item.address == this.rcp.address){
                    let key = Object.keys(item.outcome.orderbookChanges);
                    let totalPrice = item.specification.quantity.value * 1;
                    let MaxTotal = this.getTotal(item).quantity * 1;
                    // console.log(totalPrice, MaxTotal);
                    if(MaxTotal >= totalPrice){
                        return 'filled'
                    }else if(MaxTotal == 0){
                        return 'created'
                    }else{
                        return 'partially-filled'
                    };
                    //partially-filled
                }else{
                    return item.outcome.orderbookChanges[this.rcp.address] && item.outcome.orderbookChanges[this.rcp.address][0].status;
                }


            },
            getChanges (item){
                var key = Object.keys(item.outcome.orderbookChanges);
                try {
                    return (item.outcome.orderbookChanges[this.rcp.address] && item.outcome.orderbookChanges[this.rcp.address][0]) || item.outcome.orderbookChanges[key[0]][0];
                }catch (e) {
                    // console.log(item);
                    return {};
                }
            },
            getPrice2 (item){
                if(item.address == this.rcp.address){
                    return this.decimal(item.specification.totalPrice.value).div(item.specification.quantity.value).toFixed(4);
                }else{
                    if(item.outcome.orderbookChanges[this.rcp.address]){
                        var dItem = item.outcome.orderbookChanges[this.rcp.address][0] || {};
                        return this.decimal(dItem.totalPrice.value).div(dItem.quantity.value).toFixed(4);
                    }else{
                        return this.decimal(item.specification.totalPrice.value).div(item.specification.quantity.value).toFixed(4);
                    }
                }
            },
            getTotal (item){
                let quantity = 0;
                let totalPrice = 0;
                let key = Object.keys(item.outcome.orderbookChanges);
                let direction = item.specification.direction;
                let entrustNum = 0;
                let entrustPrice = 0;
                if(item.address != this.rcp.address){
                    if(Array.isArray(item.outcome.orderbookChanges[this.rcp.address])){
                        item.outcome.orderbookChanges[this.rcp.address].forEach(it => {
                            if(it.status == "partially-filled" || it.status == "filled" || it.status == 'created'){
                                quantity += it.quantity.value * 1;
                                totalPrice += it.totalPrice.value * 1;
                            }
                        });
                    }
                }else{
                    key.forEach(k => {
                        // if(k != this.rcp.address || item.address != this.rcp.address){
                        if(Array.isArray(item.outcome.orderbookChanges[k])){
                            item.outcome.orderbookChanges[k].forEach(it => {
                                if(it.status == "partially-filled" || it.status == "filled" || it.status == 'created'){
                                    if(item.address != k){
                                        quantity += it.quantity.value * 1;
                                        totalPrice += it.totalPrice.value * 1;
                                    }else{
                                        if(direction == it.direction){
                                            entrustNum += it.quantity.value * 1;
                                            entrustPrice += it.totalPrice.value * 1;
                                        }else{
                                            entrustNum += it.totalPrice.value * 1;
                                            entrustPrice += it.quantity.value * 1;
                                        }
                                    }
                                }
                            });
                        }
                        // }
                    });
                }
                // console.log(quantity, totalPrice);
                quantity = this.decimal(quantity).toFixed(2);
                totalPrice = this.decimal(totalPrice).toFixed(4);
                return {quantity, totalPrice, entrustNum, entrustPrice}
            },
            getPayment (){
                console.log('getPayment');
                let {left, right} = this.trade;
                this.rcp.api.getTransactions(this.rcp.address, {
                // this.rcp.api.getTransactions('r37A4bDm93rQJc5f227QT6CW17kAPdeD8a', {
                    binary : true,
                    // initiated : true,
                    excludeFailures : true,
                    types : ['order'],
                    limit : 35,
                }).then(data => {
                    // console.log(data);
                    let list = [];
                    data.forEach(item => {
                        if(
                            item.specification.quantity.currency == left.currency
                            && item.specification.quantity.counterparty == left.counterparty
                            && item.specification.totalPrice.currency == right.currency
                            && item.specification.totalPrice.counterparty == right.counterparty
                        ){
                            list.push(item);
                        }
                    });
                    this.list = list;
                    this.loadState = false;
                }).catch(e => {
                    console.log(e);
                    this.list = [];
                    this.loadState = false;
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    .lastOrder {
        padding: 50px 15px;
        .copy-container{
            color: $active;
        }
        .detais {
            padding: 15px 0;
            border-bottom: 1px solid $border;
            &.up {
                .t{
                    .t_l{
                        .type {
                            color: $up;
                        }
                        .coin {
                            color: $up;
                        }
                    }
                    .t_r{
                        color: $up;
                    }
                }
                .c{
                    .textbox {
                        .tet2{
                            color: $up;
                        }
                    }
                }
            }
            &.down {
                .t{
                    .t_l{
                        .type {
                            color: $down;
                        }
                        .coin {
                            color: $down;
                        }
                    }
                    .t_r{
                        color: $down;
                    }
                }
                .c{
                    .textbox {
                        .tet2{
                            color: $down;
                        }
                    }
                }
            }
            .t {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .t_l {
                    font-size: 14px;
                    .type {
                        color: $active;
                    }
                    .coin {
                        color: $color1;
                        padding-left: 5px;
                    }
                    .time {
                        color: $color1;
                        font-size: 12px;
                        padding-left: 5px;
                    }
                }
                .t_r {
                    color: $active;
                    font-size: 12px;
                }
            }
            .c {
                padding-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .textbox3 {
                    text-align: right;
                }
                .textbox2 {
                    // text-align: center;
                }
                .textbox {
                    width: 33%;
                    font-size: 12px;
                    .text1 {
                        color: $color1;
                        padding-bottom: 5px;
                    }
                    .tet2 {
                        color: $active;
                        word-wrap:break-word;
                    }
                }
            }
        }
    }
</style>

