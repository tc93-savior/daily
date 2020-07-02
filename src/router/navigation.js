
class NavigatorStack {
    constructor() {
        this.stack = []
    }

    push(router, params) {
        let navigator = {router, params}
        this.stack.push(navigator)
        this.$router.push('/uiTest')
    }

    pop(num = 1) {
        this.stack.slice(0, -num)
        this.$router.push(this.stack.slice(-1))
    }

    replace(router, num) {
        this.stack.splice(num, 1, router)
    }
};

let navigatorStack = new NavigatorStack()
navigatorStack.push({url: 1, params: 2})

// export default new NavigatorStack()

// let arr = [1, 2, 3, 4, 5, 6, 7]

// console.log(arr.slice(0, -2))
// console.log(arr);
