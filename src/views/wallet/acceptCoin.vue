<template>
    <section class="acceptCoin">
        <Header :title="$t(`wallet.jilu`)" :leftEv="leftEv" :rightEv='toacceptCoin' :rightIcon="require('../../assets/images/record_black@2x.png')"></Header>
        <!--<div class="acceptCoin_type">-->
            <!--<div    :class="0 == activeIdx ? 'divactive' : '' "  @click="changetype(0)">{{$t(`wallet.shou`)}}</div>-->
            <!--<div   :class="1 == activeIdx ? 'divactive' : '' "  @click="changetype(1)">{{$t(`wallet.fu`)}}</div>-->
            <!--<div    :class="2 == activeIdx ? 'divactive' : '' " @click="changetype(2)">{{$t(`wallet.duihuan`)}}</div>-->
        <!--</div>-->
        <!-- 收款 -->
        <div class="zhuaninfo">
            <load v-if="loadState"></load>
            <empty v-if="loadState == false && list.length <= 0"></empty>
            <div class="zhuan" v-for="item in list" :key="item.id" @click="$router.push('/detais/'+ item.id)">
                <div class="top">
                    <img src="../../assets/images/night_record_time@2x.png" alt srcset />
                    {{item.outcome && item.outcome.ledgerVersion}} {{$t('ledgerVersion')}}
                    <small>({{transactionTypeText(item)}})</small>
                </div>
                <template v-if="item.type == 'payment'">
                    <div class="center">
                        <div>
                            {{item.address == rcp.address ? '-' : '+'}}{{item.specification.source.maxAmount.value}} {{unitCoin(item.specification.source.maxAmount.currency)}}
                        </div>
                        <img src="../../assets/images/triangle@2x.png" alt srcset />
                    </div>
                    <div class="last">{{item.address == rcp.address ? item.specification.destination.address : item.specification.source.address}}</div>
                </template>
                <template v-if="item.type == 'trustline'">
                    <div class="center">
                        <div>
                            {{unitCoin(item.specification.currency)}}
                        </div>
                        <img src="../../assets/images/triangle@2x.png" alt srcset />
                    </div>
                    <div class="last">{{$t('gateway')}} : {{item.specification.counterparty}}</div>
                </template>
            </div>
        </div>
        <!-- 兑换 -->
    </section>
</template>
<script>
    export default {
        name: "acceptCoin",
        props : ['activeIdx'],
        data() {
            return {
                //0 收款 1 转账 2 兑换
                // activeIdx: this.$route.query.type || 0,
                list : [],
                loadState : true,
                routerNum : 0,
                listHidden : [
                    'r2JdhTVbe2qt1nb73zoG8cwSxRtv4M1GV',
                    'r3bCnSbNR53vPzH1RZHPvgeG7ajxPutmxF',
                    'r3xx3pRTrn7a3LFeS7D246eKH1pySUMSa4',
                    'r44ZhW44HugttBf4Lcmf2L8qnUMrAjVHDt',
                    'rD9aJmbFN5TaGSpAitqMwCs2eJfcNmmWRH',
                    'rEqayB7zaXrcmXAY61bbBamayWSHeevSXP',
                    'rHDwDhoY8ehJfGycGwvduspTEPVh21wLoY',
                    'rHFRbvHzzwNh4vmtfijP9tS26xkx72yiTR',
                    'rHUszZaPWj7FwrmVNuFPQH9jY7RZWfmAD4',
                    'rKEeU27ZZ1FKtkbgBDPxgfabeDtQwoai6o',
                    'rKfDkYSaaFcKoSuAyFp3KuCPjVPArWiaXP',
                    'rLEJCceEe83RJHQboMsA9steVSdtQKdhVc',
                    'rMsmX72LyBN1ff9e8zkh5wQ3q3Ce4MuTGa',
                    'rMxoZd5BuMqpTwAe2Nbizx2n6piTtrBThN',
                    'rNNLPsCPSmQgbUyYjassA9AfrZBzTHtczE',
                    'rNvqwFoo9qiK7gqao3Xbq6nJqoGudQ2gEK',
                    'rPeLpvCfCRGXcMGcfPpGXEkFZh7qAzAbqi',
                    'rU5dF3on6ho2CQgGuizY4FWgHMCniFmsot',
                    'raCQqoGT8sMrw25TTAvR3izKtqDrbStVCp',
                    'rh7QYBEmcosKy4UNSdej1QAe72fqLCwERW',
                    'rmiMfRH2mhXah6n31iHHL7TtoVUqVkah1',
                    'rpFLNWg2o3mXHrjiCZ6jJMN9Uohu8Cudhw',
                    'rpqiJ6ZbGtnwcpyFLjYBA5sDr7fzXGrJQi',
                    'rpuBTD58xaHsN1daNNviDdZobUJemXgCgL',
                    'rwRSxoPCPZmzyVcyNSZ4x9oRjiy6bXe7ru',
                    'rwhRQN63v8vKwNFXyXYH42XjCqj6K1nSW5',
                    'rU2vmniseWtNQzWmVVKX1g3URmwx8mSDCQ',
                ],

            };
        },
        watch : {
            activeIdx (){
                this.routerNum ++;
                this.getPayment();
            },
            connected (n, o){
                if(n != o){
                    this.getPayment();
                }
            }
        },
        created (){
            this.getPayment();
        },
        methods: {
            toacceptCoin (){
                this.$router.push('/acceptCoin4');
            },
            leftEv (){
                if(this.routerNum > 3){
                    this.$router.push('/wallet');
                    return true;
                }else{
                    return false;
                }
            },
            changetype(activeIdx) {
                if(activeIdx != this.activeIdx){
                    this.$router.push({name : this.$route.name, params : {activeIdx}});
                }
            },
            getPayment (){
                if(!this.connected){
                    return;
                }
                let activeIdx = this.activeIdx;
                // console.log(activeIdx);
                this.loadState = true;
                this.list = [];
                let option = {
                    binary : true,
                    excludeFailures : true,
                    types : ['payment', 'trustline'],
                    limit : 100,
                };
                if(activeIdx == 10){
                    option.initiated = true;
                    option.counterparty = this.rcp_info.miner_profit_address;
                }
                // console.log(option);
                let myAddress = this.account.getAddress();
                // console.log(myAddress);
                this.rcp.api.getTransactions(this.account.getAddress(), option).then(data => {
                    // console.log(data);
                    let list = [];
                    data.forEach((item, index) => {
                        if( item.type == 'payment' &&
                            item.specification.source.address == myAddress &&
                            (item.specification.destination.address.toLowerCase() == 'rG3YW4893Tr9fxmsnmeBtb6Z6RFKihvEae'.toLowerCase()
                            || item.specification.destination.address.toLowerCase() == 'rQK1DhupmnKmUv3oUmaAGTmNQqawQxNv6m'.toLowerCase()
                            )
                        ){

                        }else{
                            list.push(item);
                        }
                    });
                    let list2 = [];
                    if(this.listHidden.indexOf(this.rcp.address) >= 0){
                        list.forEach((item, index) => {
                            if(list[index - 1] && list[index - 1].type == 'payment'){
                                if( item.type == 'payment' &&
                                    item.specification.destination.address == myAddress &&
                                    item.specification.source.address.toLowerCase() == 'rG3YW4893Tr9fxmsnmeBtb6Z6RFKihvEae'.toLowerCase() &&
                                    item.specification.source.maxAmount.value == list[index - 1].specification.source.maxAmount.value
                                ){

                                }else{
                                    list2.push(item);
                                }
                            }else{
                                list2.push(item);
                            }
                        });
                    }else{
                        list2 = list;
                    }

                    this.list = list2;
                    this.loadState = false;
                }).catch(e => {
                    console.log(e);
                    this.list = [];
                    this.loadState = false;
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    // xm
      .acceptCoin {
        margin-bottom: 60px;
        .acceptCoin_type {
            display: flex;
            margin-top: 50px;
            justify-content: space-around;
            align-items: center;
            background: $nav-bg;
            height: 35px;
            color: $color1;
            font-size: 14px;
            .divactive {
                height: 100%;
                line-height: 35px;
                color: $active;
                border-bottom: 1px solid $active;
            }
            div:hover {
                color: $active;
                line-height: 35px;
                border-bottom: 1px solid $active;
            }
        }
        .zhuaninfo {
            margin-top :50px;
            border-top: solid 1px $border;
            .zhuan {
                color: $color1;
                padding: 15px;
                font-size: 12px;
                border-bottom: 1px solid $border;
                .top {
                    margin-bottom: 10px;
                    img {
                        width: 12px;
                        height: 12px;
                        margin-right: 5px;
                    }
                }
                .last{
                  color: $active;
                }
                .center {
                    margin-bottom: 7px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    font-weight: 500;
                    color: $active;
                    small{
                        color:$active;
                    }
                    img {
                        width: 8px;
                        height: 8px;
                    }
                }
            }
        }
    }
</style>
