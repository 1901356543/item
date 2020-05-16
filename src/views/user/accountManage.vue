<template>
    <div class="container">
        <!--
        <Header
          :title="$t('user.accountTitle')"
          :right-icon="require('../../assets/images/my_edit@2x.png')"
          :right-ev="openEdit"
          v-if="!editMode"
        />
        <Header
          :title="$t('user.accountTitle')"
          v-if="editMode"
          :left-icon="require('../../assets/images/top_off_white@2x.png')"
          :left-ev="openEdit"
        /> -->
        <Header :title="$t('user.accountTitle')"  :leftEv="returnUser" />
        <div class="account-list">
            <p class="account-list-text">{{$t('lang97')}}</p>
            <div class="account-item" v-for="(item, index) in accountsList" :key="index" v-if="item">
                <i @click="selectAddress(index)" class="choose" :class="{chosen : index == addressIndex}"></i>
                <div class="item-content">
                    <div class="name" @click="chooseItem(item)">
                        {{nameList[index] || $t('title')}} <small v-if="index == addressIndex" style="opacity: 0.8;">({{$t('lang96')}})</small>
                    </div>
                    <div class="name up" @click="chooseItem(item)">
                        {{balanceAccount[item] || '-'}} SGY
                    </div>
                    <div class="address">
                        <r-copy :copyText="item">{{item}}</r-copy>
                    </div>
                </div>
            </div>

            <div class="account-import" @click="submitPsw">
                {{$t('create') + $t('address')}}{{submitState ? '...' : ''}}
            </div>

            <div class="account-import" v-if="!editMode" @click="$router.push({path: '/exportAddr'})">
                <i></i>
                {{$t('importAddress')}}
            </div>
        </div>
        <!--<div class="edit-bottom" v-show="editMode">
            <i class="choose" :class="{'chosen': isChosenAll}" @click="chooseAll"></i>
            <span>全选</span>
            <button class="delete">删除</button>
        </div>-->

        <r-modal :title="$t('create') + $t('address')"
                 @on-ok="addAddress"
                 :show="isShowPswModal"
                 @on-cancel="isShowPswModal = false">
            <div class="inp-password">
                <input type="text" v-model="name" :placeholder="$t('lang32')" />
            </div>
            <br>
            <div class="inp-password">
                <input type="password" v-model="password" :placeholder="$t(`wallet.zhuanqian12`)">
            </div>
        </r-modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                editMode: false,
                name: "",
                password: "",
                isChosenAll: false,
                addressIndex: 0,
                submitState: false,
                isShowPswModal: false,
                accountsList: [],
                nameList: [],
                balanceAccount: {},
            };
        },
        created (){
            this.getBalanceAccount();
            this.addressIndex = this.account.accounts.addressIndex;
            this.nameList = this.account.accounts.name;
            this.accountsList = JSON.parse(JSON.stringify(this.account.accounts.address));
        },
        methods: {
            getBalance (address){
                return this.balanceAccount[address] || 0;
            },
            getBalanceAccount (){
                let self = this;
                this.account.accounts.address.forEach((item, index) => {
                    setTimeout(() => {
                        self.rcp.getBalances(item).then(res => {
                            self.balanceAccount[item] = res[0].value || '0';
                            // console.log(self.balanceAccount);
                            self.accountsList.push('');
                        })
                    }, index * 100);
                });
            },
            returnUser (){
                this.$router.push("/user");
                return true;
            },
            submitPsw (){
                if(this.submitState) return;
                this.isShowPswModal = true;
            },
            addAddress (){
                if(this.submitState) return;
                let {name} = this;
                if(name.length <= 0){
                    this.$toast.show(this.$t('lang33'));
                    return;
                }
                this.account.verifyPassword(this.password).then(async () => {
                    this.isShowPswModal = false;
                    this.account.accounts.name[this.account.accounts.address.length] = name;
                    this.$toast.show(this.$t('create') + '.....');
                    setTimeout(() => {
                        this.account.addAddress(this.password).then(async data => {
                            // console.log(data);
                            let secret = await this.account.exportPrivate(this.password);
                            let address = this.account.getAddress();
                            this.submitState = false;
                            this.refreshData();
                            this.$toast.show(this.$t('create') + this.$t('success'));
                            this.$router.push(`/exportSecretKey/${address}/${secret}`);
                        }).catch(e => {
                            console.log(e.message);
                            this.submitState = false;
                            this.$toast.show(this.$t('create') + this.$t('error'));
                        });
                    }, 0);
                }).catch(e => {
                    this.submitState = false;
                    this.$toast.show(this.$t('passwordError'));
                });
            },
            refreshData (){
                this.$store.commit('balancesXRP', {});
                this.$store.commit('balancesBTC',  {});
                this.$store.commit('balancesUSDT',  {});
                this.$store.commit('balancesOthers', []);
                this.$store.commit('isjihuo', false);
                this.$store.commit('balances', []);
                this.$store.commit('coinVolume', []);
                this.$store.commit('gatewayBalances', {});
                this.$store.commit('isTrustBtcState', false);
                this.rcp.connected();
            },
            async selectAddress (index){
                if(index == this.account.accounts.addressIndex) return;
                this.account.accounts.addressIndex = index;
                this.addressIndex = index;
                await this.account.save();
                this.refreshData();
            },
            openEdit() {
                this.editMode = !this.editMode;
                return true;
            },
            chooseItem(item) {
                if(!this.editMode) this.$router.push({path: '/addrDetail/' + item})
                // this.addressList.map(o => {
                //     if(o.name == item.name) o.isChosen = !item.isChosen
                //     return o;
                // })
                // this.isChosenAll = this.addressList.every(o => o.isChosen);
            },
            chooseAll() {
                this.isChosenAll = !this.isChosenAll;
                // this.addressList.map(item => (item.isChosen = this.isChosenAll));
            }
        }
    };
</script>

<style lang="scss" scoped>
    .account-list-text{
        color: $color1;
        margin-bottom: 10px;
    }
    .container {
        height: 100%;
        background-color: $bodybg;
        .copy-container{
            color: $color1;
        }
        i.choose {
            width: 18px;
            height: 18px;
            border: 1px solid $border;
            display: inline-block;
            vertical-align: middle;
            border-radius: 50%;
            &.chosen {
                background-image: url("../../assets/images/selection@2x.png");
                border: 0;
                background-size: 100% 100%;
            }
        }
        .account-list {
            margin: 0 15px;
            padding-top: 75px;
            .account-item {
                background: $border2;
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                overflow: hidden;
                box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
                .item-content{
                    overflow: hidden;
                    span{
                        float: right;
                        color: $blue;
                    }
                }
                i {
                    margin-right: 15px;
                }
                .name {
                    font-size: 14px;
                    color: $active;
                }
                .address {
                    color: $color1;
                    font-size: 12px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
            .account-import {
                background-color: $border2;
                box-shadow:0px 6px 10px 0px rgba(0,0,0,0.06);
                color: $blue;
                padding: 15px 15px;
                border-radius: 10px;
                font-size: 14px;
                text-align: center;
                margin-top: 20px;
                i {
                    display: inline-block;
                    background-image: url("../../assets/images/copy@2x.png");
                    width: 14px;
                    height: 14px;
                    background-size: 100% 100%;
                    vertical-align: middle;
                }
            }
        }
        .edit-bottom {
            background-color: #2a2e3d;
            padding: 15px;
            position: fixed;
            bottom: 0;
            width: 100%;
            padding: 15px;
            color: $white;
            font-size: 14px;
            i {
                margin-right: 5px;
            }
            .delete {
                background-color: $active;
                padding: 7px 20px;
                font-size: 14px;
                color: $white;
                position: absolute;
                right: 15px;
                top: 10px;
                border: 0;
                border-radius: 4px;
            }
        }
    }
</style>