<template>
    <r-modal :title="$t(`trust`) + $t(`gateway`)" @on-ok="submitPsw" :show="true" @on-cancel="cancel">
        <div class="inp-password">
            <input type="password" v-model="password" :placeholder="$t(`wallet.zhuanqian12`)">
        </div>
    </r-modal>
</template>

<script>
    export default {
        name: "trustBtc",
        data() {
            return {
                password : "",
                submitState : false,
                su : '',
                er : '',
            }
        },
        mounted (){
            this.su = this.$t('trust') + this.$t('success');
            this.er = this.$t('trust') + this.$t('error');
        },
        methods : {
            cancel (){
                this.$store.commit("isTrustBtc", false);
            },
            trustline (seed, gatewayKey, index){
                console.log(index);
                if(Array.isArray(gatewayKey) && gatewayKey[index]){
                    this.rcp.prepareTrustline({
                        "currency": gatewayKey[index].toUpperCase(),
                        "counterparty": this.gatewayMain[gatewayKey[index]],
                        "limit": "100000000000",
                    }, seed).then(data => {
                        this.$store.commit("isTrustBtc", false);
                        if(data.engine_result_code == 0){
                            if(index <= gatewayKey.length - 2){
                                this.trustline.call(this, seed, gatewayKey, index + 1);
                            }else{
                                this.$toast.show(this.su);
                            }
                        }else{
                            console.log(data.engine_result_message);
                            this.$toast.show(data.engine_result_message);
                            this.$store.commit('isTrustBtcState', false);
                        }
                    }).catch(e => {
                        console.log(e);
                        this.$toast.show(e.message);
                        this.$store.commit('isTrustBtcState', false);
                    });
                }else{
                    this.$toast.show(this.er);
                    this.$store.commit('isTrustBtcState', false);
                }
            },
            submitPsw (){
                let {password} = this;
                if(this.submitState) return;
                let gatewayKey = Object.keys(this.gatewayMain);
                // console.log(gatewayKey.length * this.fee);
                if(this.balancesXRP.value < gatewayKey.length * this.fee){
                    this.$toast.show(this.$t('svg33') + ' ' + (gatewayKey.length * this.fee) + ' SGY');
                    return;
                }
                // return;
                this.account.verifyPassword(password).then(async () => {
                    let seed = await this.account.exportPrivate(this.password);

                    if(gatewayKey.length > 0){
                        this.$store.commit('isTrustBtcState', true);
                        this.trustline.call(this, seed, gatewayKey, 0);
                    }
                }).catch(e => {
                    this.$toast.show(this.$t('passwordError'));
                });

            },
        }
    }
</script>

<style scoped lang="scss">
</style>