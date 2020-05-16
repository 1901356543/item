<template>
    <section class="bizhong">

        <Header :title="$t('svg66')"/>
        <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="onSubmit">
                <div class="details ">

                    <div class="bzname bz">
                        <p class="bizhong-error" v-html="$t('svg126')"></p>
                    </div>
                    <!-- 币种名称 -->
                    <ValidationProvider name="fullName" rules="required|mgc|max:15">
                        <div class="bzname bz" slot-scope="{ errors }">
                            <span><small>*</small>{{$t('svg67')}}</span>
                            <input type="text" placeholder="Singularity" v-model="fullName">
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg68')}}{{$t('svg122')}}</p>
                        </div>
                    </ValidationProvider>

                    <!-- 币种字母名称 -->
                    <ValidationProvider name="name" rules="required|alpha|length:3|mgc">
                        <div class="bzLetterName bz" slot-scope="{ errors }">
                            <span><small>*</small>{{$t('svg69')}}</span>
                            <input type="text" placeholder="SGY" v-model="name">
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg70')}}</p>
                        </div>
                    </ValidationProvider>

                    <ValidationProvider name="price" rules="required|min_value:0.00001">
                        <div class="issue bz" slot-scope="{ errors }">
                            <span><small>*</small>{{$t('svg71')}}</span>
                            <input type="text" :placeholder="$t('svg71')" v-model="price">
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg72')}}</p>
                        </div>
                    </ValidationProvider>

                    <!-- 发行总量 -->
                    <ValidationProvider name="circulation" rules="required|numeric|min_value:1000000|max_value:100000000000">
                        <div class="gross bz" slot-scope="{ errors }">
                            <span><small>*</small>{{$t('svg73')}}</span>
                            <input type="number" placeholder="2100000000" v-model="circulation">
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg74')}}</p>
                        </div>
                    </ValidationProvider>

                    <!-- 创世发行量 -->
                    <ValidationProvider name="toCreate" :rules="`required|numeric|max_value:${circulation}`" v-if="circulation >= 1000000">
                        <div class="circulation  bz" slot-scope="{ errors }">
                            <span><small>*</small>{{$t('svg75')}}</span>
                            <input type="number" :placeholder="$t('svg75')" v-model="toCreate">
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg76')}}</p>
                        </div>
                    </ValidationProvider>

                    <ValidationProvider name="ipo" :rules="`numeric|min_value:0|max_value:${toCreate * 0.9}`" v-if="toCreate">
                        <div class="gross bz" slot-scope="{ errors }">
                            <span>{{$t('svg77')}}</span>
                            <input type="text" placeholder="100000" v-model="ipo">
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg78')}} {{toCreate * 0.9}} {{$t('svg79')}}</p>
                        </div>
                    </ValidationProvider>

                    <!-- 发行周期 -->
                    <ValidationProvider name="month" rules="required|numeric|min_value:12">
                        <div class="period  bz" slot-scope="{ errors }">
                            <span><small>*</small> {{$t('svg80')}}</span>
                            <input type="text" placeholder="168" v-model="month">
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg81')}}</p>
                        </div>
                    </ValidationProvider>

                    <!-- 挖矿方案 -->
                    <!--<div class="scheme">-->
                    <!--<div class="scheme" >-->
                    <div class="scheme" v-if="circulation && toCreate && month">
                        <span>{{$t('svg82')}}</span>
                        <p class="wkfats"><small>{{$t('svg125')}}</small></p>
                        <div class="tianjia" @click="addScheme" v-if="addState">
                            <img src="../../assets/images/apply_add.png" alt="">
                        </div>
                        <div class="precept" v-for="item in addSchemeNum">
                            <p @click="delScheme" v-if="item == addSchemeNum && item != 1"><i>{{$t('delete')}}</i></p>
                            <div class="top">
                                <span>{{$t('svg83')}}</span>
                                <input type="text" v-model="monthData[item - 1]" :placeholder="$t('svg84')">
                            </div>
                            <div class="bottom">
                                <span>{{$t('svg85')}}</span>
                                <input type="text" v-model="monthRatio[item - 1]" :placeholder="$t('svg86')">
                            </div>
                        </div>
                        <div class="calculate bz residue" v-if="">
                            <p><span>{{$t('svg87')}}</span> <span>{{$t('svg88')}}</span></p>
                            <p><span>{{residueNum}}</span><span>{{residueMonth}}</span></p>
                        </div>
                    </div>

                    <ValidationProvider name="min_chibi" rules="required|min_value:1" v-if="circulation && toCreate && month && residueMonth < month">
                        <div class="issue bz" slot-scope="{ errors }">
                            <span><small>*</small>{{$t('svg89')}}</span>
                            <input type="text" :placeholder="$t('svg91')" v-model="min_chibi">
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg90')}}</p>
                        </div>
                    </ValidationProvider>

                    <ValidationProvider name="issuer" rules="required|max:15|mgc">
                        <div class="bzname bz" slot-scope="{ errors }">
                            <span><small>*</small>{{$t('svg93')}}</span>
                            <input type="text" :placeholder="$t('svg104')" v-model="issuer">
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg94')}}{{$t('svg122')}}</p>
                        </div>
                    </ValidationProvider>

                    <!-- 官方网站 -->
                    <ValidationProvider name="url" rules="required|url|mgc">
                        <div class="official bz" slot-scope="{ errors }">
                            <span><small>*</small>{{$t('svg95')}}</span>
                            <input type="text" :placeholder="$t('svg95')" v-model="url">
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg96')}}{{$t('svg122')}}</p>
                        </div>
                    </ValidationProvider>


                    <!-- 白皮书链接 -->
                    <ValidationProvider name="bps" rules="required|url|mgc">
                        <div class="white bz" slot-scope="{ errors }">
                            <span><small>*</small>{{$t('svg97')}}</span>
                            <input type="text" :placeholder="$t('svg97')" v-model="bps">
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg98')}}{{$t('svg122')}}</p>
                        </div>
                    </ValidationProvider>

                    <!-- 联系方式 -->
                    <ValidationProvider name="email" rules="required|mgc">
                        <div class="connection  bz"  slot-scope="{ errors }">
                            <span><small>*</small>{{$t('svg99')}}</span>
                            <input type="text" :placeholder="$t('svg99')"  v-model="email">
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg100')}}{{$t('svg122')}}</p>
                        </div>
                    </ValidationProvider>

                    <!-- 发行说明 -->
                    <ValidationProvider name="manifesto" rules="required|max:200|mgc">
                        <div class="explain  bz"  slot-scope="{ errors }">
                            <span><small>*</small>{{$t('svg101')}}</span>
                            <textarea :placeholder="$t('svg101')" v-model="manifesto"></textarea>
                            <p class="bizhong-error" v-if="errors.length">{{$t('svg102')}}{{$t('svg122')}}</p>
                        </div>
                    </ValidationProvider>

                </div>
                <!-- 提交申请   -->
                <div class="add">
                    <button type="submit" @click="onSubmit" :disabled="invalid">
                        <div v-if="submitState" class="loader5"></div>
                        <span v-else>{{invalid ? $t('svg111') : $t('svg103')}}</span>
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </section>
</template>

<script>
    import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
    import { required, email, min, max, length, alpha, numeric, min_value, max_value, digits} from 'vee-validate/dist/rules';

    extend('mgc', value => {
        return !(/SGY/gi.test(value) || /奇点/gi.test(value) || /Singularity/gi.test(value));
    });

    extend('url', value => {
        return /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/gi.test(value);
    });

    extend('digits', {
        ...digits,
        message: 'digits'
    });

    extend('max_value', {
        ...max_value,
        message: 'max_value'
    });
    extend('min_value', {
        ...min_value,
        message: 'min_value'
    });
    extend('numeric', {
        ...numeric,
        message: 'numeric'
    });
    extend('alpha', {
        ...alpha,
        message: 'alpha'
    });
    extend('length', {
        ...length,
        message: 'length'
    });
    extend('required', {
        ...required,
        message: 'required'
    });
    extend('email', {
        ...email,
        message: 'email'
    });
    extend('min', {
        ...min,
        message: 'min'
    });
    extend('max', {
        ...max,
        message: 'max'
    });

    export default {
        data() {
            return {
                issuer: '',  // 币种名称
                fullName: '',  // 币种名称
                name: '', // 币种字母名称大写
                circulation: '', // 发行量
                month: '',
                ipo: '',
                min_chibi: '',
                manifesto: '',
                price: '',
                url: '',
                bps: '',
                email: '',
                addSchemeNum: 1,
                toCreate: '',
                monthData : [],
                monthRatio : [],
                pData : [],
                rData : [],
                residueNum : 0,
                residueMonth : 0,
                addState : false,
                submitState : false,
            };
        },
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        watch : {
            ipo (){
                this.totalNum();
            },
            circulation (){
                this.totalNum();
            },
            toCreate (){
                this.totalNum();
            },
            monthData (n, o){
                // console.log(n);
                this.monthData.forEach((item, index) => {
                    this.monthData[index] = (item + '').replace(/[^0-9\?]*/g, "");
                    this.monthRatio[index] = (this.monthRatio[index] || '').replace(/\./, '?').replace(/[^0-9\?]*/g, "").replace(/\?/g, ".");
                });
                this.totalNum();
            },
            monthRatio (n, o){
                // console.log(n);
                this.monthRatio.forEach((item, index) => {
                    this.monthData[index] = (this.monthData[index] || '').replace(/[^0-9\?]*/g, "");
                    this.monthRatio[index] = (item + '').replace(/\./, '?').replace(/[^0-9\?]*/g, "").replace(/\?/g, ".");
                });
                this.totalNum();
            },
        },
        created (){
            this.get_my_issue_info();
        },
        methods:{
            get_my_issue_info (){
                // console.log('get_my_issue_info');
                this.axios({
                    url : "/service/get_my_issue_info",
                    params : {
                        address : this.account.getAddress(),
                    }
                }).then(data => {
                    console.log(data);
                    if(data.data.uid){
                        this.$store.commit('get_issue_list_item', data.data);
                        this.$router.push('/yajin');
                    }
                }).catch(e => {
                    console.log(e.message);
                    this.submitState = false;
                })
            },
            delScheme (){
                this.addSchemeNum = this.addSchemeNum - 1;
                this.monthData.splice(-1, 1);
                this.monthRatio.splice(-1, 1);
                this.totalNum();
            },
            totalNum (){
                // this.monthData
                // this.monthRatio
                let len = this.monthData.length - 1;
                let p = 0,r = 0;

                let pData = JSON.parse(JSON.stringify(this.monthData));
                let rData = JSON.parse(JSON.stringify(this.monthRatio));

                if(pData[len] && rData[len]){
                }else{
                    len = len - 1;
                    pData.splice(-1, 1);
                    rData.splice(-1, 1);
                }

                let {toCreate, circulation} = this;
                circulation = circulation *1;
                let totalCirculation = toCreate * 1;
                let m = 0;
                pData.forEach((item, index) => {
                    let p = item * 1;
                    if(p > 0 && (rData[index] || 0) > 0){
                        m += p;
                        for (let i = 1; i <= p; i ++){
                            totalCirculation += totalCirculation * ((rData[index] || 0) / 100);
                            // console.log(totalCirculation);
                        }
                    }
                });
                // console.log(pData, rData, totalCirculation, circulation - totalCirculation);
                this.residueMonth = this.month * 1 - m;
                this.residueNum = circulation - totalCirculation;

                this.pData = pData;
                this.rData = rData;

                if(this.residueNum > 0 && this.residueMonth > 0 && pData.length == this.monthData.length && rData.length == this.monthRatio.length){
                    this.addState = true;
                }else{
                    this.addState = false;
                }
            },
            addScheme (){
                this.addSchemeNum += 1;
                this.monthData.push('');
                this.monthRatio.push('');
                this.totalNum();
            },
            issue_symbol_valid (){
                let issue_data = [];

                this.pData.forEach((item, index) => {
                    let id = {};
                    id.p = item;
                    id.r = this.rData[index] / 100;
                    issue_data.push(id);
                });

                console.log(issue_data);

                this.axios({
                    url : "/service/issue",
                    method :'post',
                    data : {
                        address : this.account.getAddress(),
                        coin_name : this.fullName,
                        symbol : this.name,
                        total_num : this.circulation,
                        genesis_num : this.toCreate,
                        ipo_num : this.ipo,
                        issuer_price : this.price,
                        issuer_name : this.issuer,
                        issuer_months : this.month,
                        weburl : this.url,
                        wbookurl : this.bps,
                        contact : this.email,
                        desc : this.manifesto,
                        min_chibi : this.min_chibi,
                        issue_data : issue_data,
                    }
                }).then(data => {
                    console.log(data);
                    this.submitState = false;
                    this.$toast.show(this.$t('svg63'));
                    this.$router.push('/appleCoin');
                }).catch(e => {
                    console.log(e.message);
                    this.submitState = false;
                    this.$toast.show(e.message);
                    // this.chart();
                })
            },
            onSubmit (){
                console.log('onSubmit');
                /*
                *
                *  issuer: '',  // 币种名称
                monthData : [],
                monthRatio : [],
                * */
                // /service/issue_symbol_valid?symbol=ust
                if(this.submitState) return;

                if(this.residueNum < 0){
                    // svg123
                    this.$toast.show(this.$t('svg123'));
                    return;
                }
                if(this.residueMonth < 0){
                    // svg123
                    this.$toast.show(this.$t('svg124'));
                    return;
                }

                this.submitState = true;
                this.axios({
                    url : "/service/issue_symbol_valid",
                    params : {
                        symbol : this.name,
                    }
                }).then(data => {
                    console.log(data);
                    this.issue_symbol_valid();
                }).catch(e => {
                    console.log(e.message);
                    this.$toast.show(this.$t('svg62'));
                    this.submitState = false;
                    // this.chart();
                })
            },
        }

    };
</script>

<style lang="scss" scoped>
    .loader5 {
        display:inline-block;
        width: 0;
        height:0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid $bg2  ;
        border-top: 10px solid #faaacc;
        -webkit-animation: loader5 3s ease-in-out infinite alternate;
        animation: loader5 3s ease-in-out infinite alternate;
    }

    @keyframes loader5 {
        from {transform: rotate(0deg);}
        to {transform: rotate(720deg);}
    }
    @-webkit-keyframes loader5 {
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(720deg);}
    }
    .bizhong{
        height: 100%;
        background: #F9F9F9;
        .wkfats{
            color: $blue;
            font-size: 12px;
        }
        textarea{
            color: $active;
            width: 100%;
            display: block;
            height: 80px;
            padding: 15px 10px;
            font-size: 14px;
            font-family: inherit;
        }
        .bizhong-error{
            color: $blue;
            padding-bottom: 5px;
            display: flex;
            align-items: center;
            &:before{
                content: '';
                display: block;
                width: 15px;
                height: 15px;
                background: url("../../assets/images/asset_statement.png") no-repeat;
                background-size: 100% 100%;
                margin-right: 5px;
                vertical-align: middle;
            }
        }
        .details{
            width: 100%;
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            bottom: 90px;
            padding: 0px 15px 50px 15px;
            overflow-y: auto;
            overflow-x: hidden;
            background: #F9F9F9;
            .bz{
                width: 100%;
                margin-top: 15px;
                background:rgba(255,255,255,1);
                box-shadow:0px 3px 5px 0px rgba(0,0,0,0.06);
                border-radius:2px;
                padding: 10px 15px 5px 15px;
                &.residue{
                    display: block;
                    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.06);
                    p{
                        display: flex;
                        justify-content: space-between;
                        &:nth-child(2){
                            padding-top: 5px;
                            span{
                                color: $blue;
                                font-size: 16px;
                            }
                        }
                    }
                }
                span{
                    display: block;
                    font-size: 12px;
                    font-weight:400;
                    color:  #666;
                    small{
                        color: $blue;
                        display: inline-block;
                        margin-right: 5px;
                    }
                }
                input{
                    width: 100%;
                    height: 38px;
                    color: #000;
                }
                div{
                    img{
                        display: block;
                        float: left;
                        width: 12px;
                        height: 12px;
                    }
                    p{
                        color: #FB3B5BFF;
                        font-size: 12px;
                    }
                }
            }
            .scheme{
                width: 100%;
                min-height: 145px;
                background: #fff;
                margin-top: 15px;
                padding: 15px 15px 16px 15px;
                border-radius:2px;
                box-shadow:0px 3px 5px 0px rgba(0,0,0,0.06);
                span{
                    font-size: 12px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
                .tianjia{
                    text-align: right;
                    padding-right: 5px;
                    img{
                        width: 15px;
                        height: 15px;
                    }
                }
                .precept{
                    width: 100%;
                    min-height: 88px;
                    padding: 15px 12px 15px 12px;
                    background:rgba(233,233,233,0.5);
                    border-radius:2px;
                    border:0.5px solid rgba(233,233,233,1);
                    margin-top: 5px;
                    margin-bottom: 10px;
                    p {
                        color: $blue;
                        text-align: right;
                        padding-bottom: 5px;
                        i{
                            font-style: normal;
                        }
                    }
                    .top{
                        border-bottom: 0.5px solid rgba(233,233,233,1);
                        padding-bottom: 5px;
                        input{
                            float: right;
                            text-align: right;
                            background: rgba(233,233,233,0.1);
                            margin-top: 3px;
                        }
                    }
                    .bottom{
                        margin-top: 10px;
                        input{
                            float: right;
                            text-align: right;
                            background: rgba(233,233,233,0.1);
                            margin-top: 3px;
                        }
                    }
                }
            }
        }
        .add{
            position: absolute;
            width: 100%;
            height: 74px;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 10px 15px 20px 15px;
            button{
                display: block;
                width: 100%;
                height: 44px;
                background: #FB3B5B;
                border: 0;
                border-radius:3px;
                font-size: 18px;
                color: #fff;
                text-align: center;
                line-height: 44px;
                &:disabled{
                    opacity: 0.6;
                }
            }
        }
    }
</style>