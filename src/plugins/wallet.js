import Vue from 'vue';
import Wallet from '../store/storeWallet';
if(process.env.NODE_ENV === 'production'){
    require('./test');
}

function plugin(Vue, wallet) {

    if (plugin.installed) {
        return
    }
    plugin.installed = true;

    if (!wallet) {
        console.error('You have to install wallet');
        return
    }
    if (!wallet.account) {
        console.error('You have to install Account');
        return
    }
    if (!wallet.rcp) {
        console.error('You have to install RCP');
        return
    }

    // Vue.account = wallet.Account;
    let account = wallet.account;
    let rcp = wallet.rcp;

    Object.defineProperties(Vue.prototype, {
        account: {
            get() {
                return account
            }
        },
        rcp: {
            get() {
                return rcp
            }
        },

    })
};

Vue.use(plugin, Wallet);


