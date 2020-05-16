<template>
    <section class="dig-mine">
        <Header title="查询" />
        <div class="container2" v-if="submitState == false">
            <div class="box2">
                <div class="text2">
                    <input type="text" v-model="address" :placeholder="$t(`wallet.zhuanqian9`)">
                </div>
            </div>
            <div class="btn" @click="clickQurey(address)"> {{$t(`wallet.zhuanqian6`)}}</div>
        </div>
        <div class="container" v-if="submitState">
            <div class="btn" @click="goQuery">继续查询</div>
            <div class="box2">
                <div class="text2">
                    <input type="text" disabled v-model="address">
                </div>
            </div>

            <div class="x-calc-power calc-power-group">
                <div class="divider"></div>
                <div class="power-item">
                    <div class="power-item-name">SGY余额</div>
                    <div class="power-item-value">{{(connected ? (balanceAddress.value || 0) : '-')}} SGY</div>
                </div>
                <div class="divider"></div>
                <div class="power-item">
                    <div class="power-item-name">上级地址</div>
                    <div class="power-item-value" @click="clickQurey(inviterUid)">{{inviterUid || '-'}}</div>
                </div>
                <div class="divider"></div>
                <div class="power-item">
                    <div class="power-item-name">激活总数</div>
                    <div class="power-item-value" @click="clickQurey(inviterUid)">{{team_count || '-'}}</div>
                </div>
                <div class="divider"></div>
                <template v-for="(v, k) in valid_device_table">
                    <div class="power-item">
                        <div class="power-item-name">{{(k || '').toUpperCase()}}有效设备总数</div>
                        <div class="power-item-value">{{v || '-'}}</div>
                    </div>
                    <div class="divider"></div>
                </template>
            </div>

            <div class="x-calc-power calc-power-group">
                <div class="icon-subtitle">
                    <span class="subtitle">设备总数</span>
                    <span class="subtitle">有效设备总数</span>
                </div>
                <div class="divider"></div>
                <div class="calc-power-row">
                    <span class="cal-power-value">{{device_count || 0}}</span>
                    <span class="cal-power-value">{{valid_device_count || 0}}</span>
                </div>
            </div>

            <!-- 收款 -->
            <div class="zhuaninfo">
                <load v-if="loadState"></load>
                <empty v-if="loadState == false && (0 == activeIdx && listX.length <=0 ? true : 1 == activeIdx && listY.length <=0 ? true : false)"></empty>
                <div class="zhuan" v-for="item in (activeIdx == 0 ? listX : listY)" :key="item.id">
                    <div class="top">
                        <img src="../../assets/images/night_record_time@2x.png" alt srcset />
                        {{item.create_time}}
                    </div>
                    <div class="center">
                        <div>
                            {{$t('lang101')}}：{{item.total_wk_achnum}} SGY
                        </div>
                    </div>
                    <div class="last" @click="clickQurey(item.uid)">地址：{{item.uid}} <span>({{item.team_count || '-'}})</span></div>
                    <div class="last" @click="clickQurey(item.uid)">设备号：{{item.device_id || '-'}} <span>({{item.device_count || '-'}})</span></div>
                    <div class="last" @click="clickQurey(item.uid)">有效创世设备数量：{{item.valid_device_count || '-'}}</div>
                    <div v-for="(v, k) in item.valid_device_table" class="last">{{(k || '').toUpperCase()}}有效创世设备数量：{{v || '-'}}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props :['adr'],
        data(){
            return{
                address : "",
                mpool : "",
                inviterUid : "",
                isShowModal: false,
                submitState: false,
                bantx2: true,
                mp_ignore: true,
                item : [],
                labels : [],
                data : [],
                myBarChart : null,
                activeIdx: 0,
                listX : [],
                listY : [],
                loadState : true,
                routerNum : 0,
                balanceAddress : {},
                valid_device_table : {},
                device_count : 0,
                team_count : 0,
                valid_device_count : 0,
            }
        },
        beforeRouteUpdate (to, from, next){
            console.log('beforeRouteUpdate');
            console.log();
            next();
            console.log(to.params.adr);
            if(to.params.adr){
                this.address = to.params.adr;
                this.qureyAddress();
            }else{
                this.submitState = false;
            }
        },
        // beforeRouteEnter (){
        //
        // },
        created (){
            // this.getData();
            // this.getChildren();
            if(this.adr){
                this.address = this.adr;
                this.qureyAddress();
            }else{
                this.submitState = false;
            }
        },
        mounted () {
            // console.log(document.querySelector(".chart-7Day"));
        },
        destroyed (){
        },
        methods: {
            goQuery(){
                this.address = '';
                this.$router.push('/digMineQuery');
            },
            getBalance (){
                this.rcp.getBalances(this.address).then(data => {
                    this.balanceAddress = data[0] || {};
                }).catch(e => {
                    this.balanceAddress = {};
                });
            },
            clickQurey (address){
                if(!this.rcp.api.isValidAddress(address)){
                    this.$toast.show(this.$t('wallet.addressError'));
                    return;
                }
                this.address = address;
                this.$router.push('/digMineQuery/' + this.address);
            },
            qureyAddress (){
                if(!this.rcp.api.isValidAddress(this.address)){
                    this.$toast.show(this.$t('wallet.addressError'));
                    return;
                }
                this.submitState = true;
                this.getBalance();
                this.getChildren();
            },
            getChildren (){
                this.loadState = true;
                this.list = [];
                this.axios({
                    url : "/service/children2",
                    params : {
                        address : this.address
                    }
                }).then(data => {
                    console.log(data);
                    this.listX = data.data.children.x_children || [];
                    this.listY = data.data.children.y_children || [];
                    this.inviterUid = data.data.inviter || '';
                    this.device_count = data.data.device_count || '';
                    this.valid_device_table = data.data.valid_device_table || {};
                    this.valid_device_count = data.data.valid_device_count || '';
                    this.team_count = data.data.team_count || '';
                    this.loadState = false;
                }).catch(e => {
                    this.list = [];
                    this.loadState = false;
                })
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
                    if(this.mpool_balance < 10){
                        this.$router.push('/exchange2');
                    }
                }else{
                    // this.$store.commit('isBinding', true);
                    this.$router.push('/binding');
                }
            },
            changetype(activeIdx) {
                if(activeIdx != this.activeIdx){
                    this.activeIdx = activeIdx;
                }
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
        background: #F9F9F9;
        min-height: 100%;
        .container2{
            padding: 70px 15px 0;
            .btn{
                position: static;
                margin-top: 50px;
            }
        }
        .box2 {
            margin-bottom: 15px;
            color: $active;
            font-size: 14px;
            background: $border2;
            padding: 15px;
            border-radius: 4px;
            box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
            input {
                height: 100%;
                border: none;
                min-width: 90%;
                background: none;
            }
        }

        .acceptCoin_type {
            display: flex;
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
            /*margin-top :50px;*/
            border-top: solid 1px $border;
            padding-bottom: 100px;
            background: #F9F9F9;
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
                    span{
                        color: $blue;
                    }
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
                        color: $active;
                    }
                    img {
                        width: 8px;
                        height: 8px;
                    }
                }
            }
        }

        .container {
            padding-top: 70px;
            /*margin: 0 15px;*/
            .divider {
                background: $bg;
                height: 1px;
                margin: 0 -15px;
            }

            .power-item {
                padding: 10px 0;
                overflow: hidden;
                font-size: 14px;
                .power-item-name {
                    float: left;
                    color: $color1;
                }
                .power-item-value {
                    float: right;
                    color: $blue;
                    .power-item-arrow {
                        margin-left: 6px;
                        width: 7px;
                        height: 9px;
                        background-image: url("../../assets/images/triangle@2x.png");
                        background-size: 100% 100%;
                        display: inline-block;
                    }
                }
            }

            .calc-power-group {
                margin: 0 0;
                padding: 0px 15px 10px;
                background: $border2;
                color: $white;
            }
            .x-calc-power{
                .icon-subtitle {
                    display: flex;
                    justify-content: space-between;
                }
            }
            .icon-subtitle {
                margin-bottom: 10px;
                .icon {
                    vertical-align: middle;
                    margin-right: 10px;
                    display: inline-block;
                    background-size: 100% 100%;
                    width: 14px;
                    height: 14px;
                }
                .subtitle {
                    font-size: 12px;
                    color: $active;
                }
            }

            .mine-card-info {
                background-image: url("../../assets/images/mining_card_bj@2x.png");
                background-size: 100% 100%;
                padding: 22.5px 20px;
                position: relative;
                .mine-card-activated {
                    .ystd-profit {
                        color: rgba(255, 255, 255, 1);
                        font-size: 16px;
                        margin-bottom: 12px;
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
                        display: block;
                        font-size: 29px;
                        font-weight: bold;
                        line-height: 1.4;
                    }
                    .statement {
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .to-activate {
                        position: absolute;
                        right: 0;
                        top: 0;
                        padding: 6px 12px;
                        background-color: $white;
                        font-size: 14px;
                        color: $active;
                        border-radius: 17px;
                        &.money{
                            width: 80px;
                            top: auto;
                            bottom: 0px;
                            text-align: center;
                        }
                    }
                }
            }

            .x-calc-power {
                .icon {
                    background-image: url("../../assets/images/mining_x@2x.png");
                }

                .calc-power-row {
                    margin: 12px 0;
                    font-size: 24px;
                    font-weight: bold;
                    display: flex;
                    justify-content: space-between;
                    color: $blue;
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
                            background: linear-gradient(
                                            180deg,
                                            rgba(0, 194, 143, 1) 0%,
                                            rgba(0, 194, 143, 0) 100%
                            );
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
    }
</style>