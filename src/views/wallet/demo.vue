<template>
    <section class="lastOrder">
        <Header :title="$t(`Trade.nojilu`)"></Header>
        <!-- <Empty v-if="loadState == false && list.length <= 0"></Empty> -->
        <!-- <load v-if="loadState"></load> -->
        <div class="detais" v-for="item in 6" :key="item" >
            <div class="t">
                <div class="t_l">
                    <span class="type"> {{$t(`Trade.canbuy`)}}</span>
                    <span class="coin"></span>
                </div>
                <div class="t_r">
                    {{ $t(`lang94`)}}
                </div>
            </div>
            <div class="c">
                <div class="textbox textbox2">
                    <div class="text1">{{$t(`Trade.entrusetprice`)}}</div>
                    <div class="tet2">
                      RCP
                    </div>
                </div>
                <div class="textbox textbox2">
                    <div class="text1">{{ $t(`Trade.volume`)}}</div>
                    <div class="tet2">RCP</div>
                </div>
                <div class="textbox textbox3">
                    <div class="text1">{{$t(`Trade.finished`)}}</div>
                    <div class="tet2">RCP</div>
                </div>
            </div>
            <div class="c">
                <div class="textbox" style="width:100%;">
                    <div class="text1">TX : </div>
                    <div class="tet2">
                        <r-copy :copyText="1111">
                            <!-- {{item.id}} -->1111
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
                this.getPayment();
            },
        },
        created (){
            if(this.connected){
                this.getPayment();
            }
        },
        methods : {
            geyType (item){
                var key = Object.keys(item.outcome.orderbookChanges);
                if(key[0] == this.rcp.address){
                    return this.getChanges(item).direction;
                }else{
                    return item.specification.direction;
                }
            },
            getChanges (item){
                var key = Object.keys(item.outcome.orderbookChanges);
                try {
                    return item.outcome.orderbookChanges[key[0]][item.outcome.orderbookChanges[key[0]].length - 1];
                }catch (e) {
                    console.log(item);
                    return {};
                }

            },
            getPayment (){
                this.loadState = true;
                this.list = [];
                this.rcp.api.getTransactions(this.rcp.address, {
                    binary : true,
                    // initiated : false,
                    excludeFailures : true,
                    types : ['order'],
                    limit : 50,
                }).then(data => {
                    // console.log(data);
                    this.list = data;
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

