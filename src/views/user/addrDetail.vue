<template>
    <section>
        <Header :title="name || ($t('address') + $t('details'))" />
        <div class="detail-list">
            <div class="detail-row" @click="changeAddrModal">
                <span>{{$t('lang32')}}</span>
                <i></i>
            </div>
            <div class="detail-row" @click="mnemonicWord" v-if="address == account.accounts.address[0] && account.accounts.backups == false">
                <span>{{$t('backups') + $t('mnemonic')}}</span>
                <i></i>
            </div>
            <!--<div class="detail-row" @click="exportMnemonic" v-if="address == account.accounts.address[0]">-->
                <!--<span>{{$t('export') + $t('mnemonic')}}</span>-->
                <!--<i></i>-->
            <!--</div>-->
            <div class="detail-row" @click="privateKey" >
                <span>{{$t('export') + $t('privateKey')}}</span>
                <i></i>
            </div>
<!--            <div class="detail-row" @click="delAddress" v-if="address != account.accounts.address[0]">
                <span>{{$t('delete') + $t('address')}}</span>
                <i></i>
            </div>-->
            <div class="detail-row" @click="delWallet" v-if="address == account.accounts.address[0]">
                <span>{{$t('exitWallet')}}</span>
                <i></i>
            </div>
        </div>
        <!-- 更换地址弹窗 -->

        <!--
        <r-modal title="修改地址名称"
              @on-ok="submit"
              btnText="激活"
              :show="isShowModal"
              @on-cancel="isShowModal = false">
             <div class="inp-password">
             <input type="text" placeholder="限25字以内">
             </div>
         </r-modal>
         -->

        <r-modal :title="$t('lang32')"
                 @on-ok="submitName"
                 :show="isShowModal"
                 @on-cancel="isShowModal = false">
            <div class="inp-password">
                <input type="text" v-model="name" :placeholder="$t(`lang32`)">
            </div>
        </r-modal>

        <!-- 安全密码弹窗 -->
        <r-modal :title="index == 4 || index == 2 ? $t('exitWalletInfo') : index == 0 ? $t('backups') + $t('mnemonic') : $t(`wallet.zhuanqian10`)"
                 @on-ok="submitPsw"
                 :show="isShowPswModal"
                 @on-cancel="isShowPswModal = false">
            <div class="inp-password">
                <input type="password" v-model="password" :placeholder="$t(`wallet.zhuanqian12`)">
            </div>
        </r-modal>
    </section>
</template>

<script>
    export default {
        props : ['address', 'backups'],
        data(){
            return{
                isShowModal: false,
                isShowPswModal: false,
                submitState: false,
                index : 0,
                password : "",
                name : "",
            }
        },
        created (){
            if(this.backups){
                this.account.accounts.addressIndex = 0;
                this.mnemonicWord();
            }
            if(this.account.accounts.address.indexOf(this.address) >= 0){
                this.name = this.account.accounts.name[this.account.accounts.address.indexOf(this.address)] || '';
            }
        },
        methods: {
            submitName (){
                this.account.accounts.name[this.account.accounts.address.indexOf(this.address)] = this.name;
                this.account.save();
                this.isShowModal = false;
            },
            delWallet (){
                this.index = 4;
                this.isShowPswModal = true;
            },
            exportMnemonic (){
                this.index = 3;
                this.isShowPswModal = true;
            },
            delAddress (){
                this.index = 2;
                this.isShowPswModal = true;
            },
            privateKey (){
                this.index = 1;
                this.isShowPswModal = true;
            },
            mnemonicWord (){
                this.index = 0;
                this.isShowPswModal = true;
            },
            changeAddrModal(){
                this.isShowModal = true;
            },
            submitPsw(){
                if(this.submitState) return;
                this.submitState = true;
                this.account.verifyPassword(this.password).then(async () => {
                    if(this.index == 0){
                        let mnemonic = await this.account.exportMnemonic(this.password);
                        // console.log(mnemonic);
                        this.submitState = false;
                        this.$router.push({name : 'mnemonicWord', params : {
                                mnemonic,
                                stepType : 0
                            }});
                    }
                    if(this.index == 1){
                        let privateKey = await this.account.exportPrivate(this.password, this.address);
                        // console.log(privateKey);
                        this.submitState = false;
                        this.$router.push(`/exportSecretKey/${this.address}/${privateKey}`);
                        // $router.push({path: '/exportSecretKey'})
                    }
                    if(this.index == 2){
                        await this.account.delAddress(this.password, this.address);
                        this.submitState = false;
                        this.$router.push(`/accountManage`);
                    }
                    if(this.index == 3){

                    }
                    if(this.index == 4){
                        this.account.accounts = {
                            mnemonic : "",
                            backups : false,
                            address : [],
                            name : [],
                            privateKey : [],
                            addressIndex : -1,
                            addIndex : 1,
                        };
                        this.account.save().then(() => {
                            this.$router.push('/login');
                        }).catch(e => {
                            this.$router.push('/login');
                        });
                    }
                }).catch(e => {
                    this.submitState = false;
                    this.$toast.show(this.$t('passwordError'));
                });


            },
            submit(){

            }
        }
    }
</script>

<style lang="scss" scoped>
    section{
        .detail-list{
            margin: 0 15px;
            padding-top: 50px;
            .detail-row{
                font-size: 14px;
                color: $active;
                padding: 15px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid $border;
                i{
                    display: inline-block;
                    background-image: url('../../assets/images/triangle@2x.png');
                    background-size: 100% 100%;
                    width: 7px;
                    height: 7px;

                }
            }
        }
    }
</style>