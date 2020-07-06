import * as util from './util'

const utils = {
    install(Vue, options) {
        Vue.prototype.$util = util
    }
}

export default utils
