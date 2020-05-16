<template>
    <section class="xrwg">
        <Header :title="$t('svg115')"/>

        <!-- 提示 -->
        <div class="tishi">
            <span>{{$t('svg116')}}</span>
            <strong @click="toShow">{{$t('svg117')}} <img src="../../assets/images/asset_statement.png" alt=""></strong>
        </div>

        <!-- 选择网关 -->
        <div class="centre">
            <load v-if="listState"></load>
            <empty v-if="list.length <= 0 && listState == false"></empty>
            <div class="choice" v-for="item in list" v-if="vGateway(item)">
                <div>
                    <p>
                        <img v-if="coin_logo[(item.symbol || '').toLowerCase()]" :src="coin_logo[(item.symbol || '').toLowerCase()]" alt="">
                        <i v-else class="op">{{(item.symbol || '-')[0]}}</i>
                        {{(item.symbol || '').toUpperCase()}}
                    </p>
                    <!-- 开关 -->
                    <div class="switch changeColor" @click="clickGateway(item)">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 遮罩层 -->
        <div class="modal" v-show="isShow"></div>
        <div class="dialogbox" v-show="isShow">
            <h1>{{(clickItem.symbol || '').toUpperCase()}} {{$t('svg117')}}</h1>
            <div class="text" v-html="$t('svg118')"></div>
            <div class="btn" @click="submit" v-if="clickItem.symbol">{{$t('svg120')}} {{(clickItem.symbol || '').toUpperCase()}} {{$t('svg121')}}</div>
            <div class="btn" @click="toShow" v-else>{{$t('svg119')}}</div>
        </div>

        <r-modal :title="$t(`wallet.zhuanqian10`)"
                 @on-ok="submitPsw"
                 :show="isShowPswModal"
                 @on-cancel="isShowPswModal = false">
            <div class="inp-password">
                <input type="password" v-model="password" :placeholder="$t(`wallet.zhuanqian12`)">
            </div>
        </r-modal>
        <load v-if="lodaState"></load>

        <!--<div class="btn" @click="$router.push('/gateway')">信任自定义网关</div>-->
    </section>
</template>

<script>

export default {
    data() {
        return{
            isShow: false,
            lodaState: false,
            isShowPswModal: false,
            list: [],
            listState: true,
            changeColor: true,
            clickItem : {},
            password : '',
        }
    },
    created (){
        this.getList();
    },
    methods:{
        vGateway (item){
            return item.gateway && !(this.balancesKey[(item.symbol || '').toUpperCase()] && this.balancesKey[(item.symbol || '').toUpperCase()].counterparty == item.gateway);
        },
        submitPsw (){
            this.account.verifyPassword(this.password).then(async () => {
                this.isShowPswModal = false;
                let seed = await this.account.exportPrivate(this.password);
                let {gateway, symbol} = this.clickItem;
                this.$toast.show(this.$t('svg113'));
                this.lodaState = true;
                this.rcp.prepareTrustline({
                    "currency": (symbol || '').toUpperCase(),
                    "counterparty": gateway,
                    "limit": "100000000000",
                }, seed).then(data => {
                    if(data.engine_result_code == 0){
                        this.$toast.show((symbol || '').toUpperCase() + this.$t('svg114'));
                    }else{
                        this.xrpMsg(data);
                    }
                    this.getList();
                    setTimeout(() => {
                        this.getList();
                        this.lodaState = false;
                    }, 4000);
                }).catch(e => {
                    this.submitState = false;
                    this.$toast.show(e.message);
                    setTimeout(() => {
                        this.lodaState = false;
                    }, 4000);
                });
            }).catch(e => {
                this.$toast.show(this.$t('passwordError'));
            });
        },
        submit (){
            console.log(this.clickItem);
            this.isShow = false;
            this.isShowPswModal = true;
        },
        clickGateway (item){
            this.clickItem = item;
            this.isShow = true;
        },
        getList (){
            this.axios({
                url : "/service/get_issue_list",
                params : {
                }
            }).then(data => {
                let list = [];
                this.listState = false;
                data.data.forEach(item =>{
                    if(this.vGateway(item)){
                        list.push(item)
                    }
                });
                this.list = list;
            }).catch(e => {
                this.listState = false;
                this.list = [];
                console.log(e.message);
            })
        },
        // 遮罩层显示隐藏
        toShow() {
            this.clickItem = {};
            this.isShow = !this.isShow;
        },
        // 开关
        clickfun(){
            this.changeColor = !this.changeColor
        }
    }
}
</script>

<style lang="scss" scoped>
    .xrwg{
        height: 100%;
        .load{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.1);
            z-index: 1000;
        }
        .tishi{
            padding: 0 15px 0 15px;
            display: flex;
            height: 42px;
            top: 50px;
            left: 0;
            right: 0;
            position: fixed;
            border-top: 0.5px solid rgba(233,233,233,1);
            justify-content: space-between;
            align-items: center;
            line-height: 42px;
            z-index: 10;
            background: #fff;
            span{
                color: #97A2AF;
                font-size: 12px;
            }
            strong{
                font-weight:400;
                color: #333333;
                font-size: 12px;
            }
            img{
                display: block;
                float: right;
                margin-top: 15px;
                margin-left: 5px;
                width: 12px;
                height: 12px;
            }
        }
        .tishi:after{
            content:"";
            width: 92%;
            height: 0.5px;
            background-color:rgba(233,233,233,1);
            position:absolute;
            left:10px;
            right: 0;
            bottom:0;
            z-index:1;
        }
        .centre{
            position: absolute;
            width: 100%;
            top: 100px;
            left: 0;
            right: 0;
            padding: 0  15px 0 15px;
            overflow-x: hidden;
            overflow-y: auto;
            .choice{
                height: 32px;
                width: 100%;
                margin: 22px 0 22px 0;
                overflow: hidden;
                div{
                    height: 32px;
                    img{
                        display: block;
                        float: left;
                        height: 22px;
                        margin-top: 5px;
                        &.op{
                            opacity: 0.8;
                        }
                    }
                    i.op{
                        display: inline-block;
                        position: static;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background: $blue;
                        color: #fff;
                        font-size: 16px;
                        line-height: 30px;
                        text-align: center;
                        text-transform: uppercase;
                        font-style: normal;
                        margin-right: 8px;
                    }
                    p{
                        line-height: 32px;
                        margin-left: 12px;
                        font-size: 14px;
                        float: left;
                    }
                    .switch{
                        height: 20px;
                        width: 36px;
                        float: right;
                        border-radius:10px;
                        position: relative;
                        display: flex;
                        margin-top: 6px;
                        background: #FB3B5B;
                        span{
                            position: absolute;
                            top: 2px;
                            left: 18px;
                            bottom: 0;
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            background: #fff;
                        }
                    }

                    // 开关
                    .changeColor{
                        background: #D8D8D8;
                        span{
                            left: 2px;
                        }
                    }
                }
            }
        }
    }
     // 遮罩层
        .modal{
            position: absolute;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            background:rgba(0, 0, 0, 0.5);
            opacity:0.5;
            z-Index:999;  
        }
        .dialogbox{
            position: absolute;
            padding: 0 15px 30px 15px;
            width: 95%;
            min-height: 302px;
            background: #fff;
            top: 315px;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius:5px;
            z-index: 9999;
            overflow: hidden;
            h1{
                text-align: center;
                margin-top: 30px;
                font-size: 18px;
                font-weight:500;
            }
            .text{
                width: 100%;
                min-height: 170px;
                color: #A7A7A7;
                font-size: 14px;
                font-weight:400;
                margin-top: 30px;
                line-height:24px;
            }
            .btn{
                border-radius:5px;
                font-weight:500;
                line-height:44px;
                font-size:16px;
                position: static;
            }
        }
</style>