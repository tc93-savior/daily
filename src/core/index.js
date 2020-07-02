import * as util from './util'

const nav = {
    install(Vue, options) {
        // Vue.mixin({
        //     mounted() {
        //         console.log('mounted')
        //     }
        // })
        Vue.prototype.$util = util
    }
}

export default nav
