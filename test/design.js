//  单例
// function getSingle(fn) {
//     var temp
//     return () => {
//         return temp || (temp = fn())
//     }
// }

// function getPop() {
//     let pop = {
//         width: 10,
//         text: 'a pop',
//     }
//     return pop
// }

// let _getPop = getSingle(getPop)

// let pop1 = _getPop()
// let pop2 = _getPop()
// console.log(pop1 === pop2)

// 缓存
// let mult = function () {
//     console.log('开始计算乘积')
//     var a = 1
//     for (var i = 0, l = arguments.length; i < l; i++) {
//         a = a * arguments[i]
//     }
//     return a
// }

// let getMult2 = function () {
//     let record = {}
//     let key
//     return (...rest) => {
//         key = Array.prototype.join.call(rest, ',')
//         console.log(...rest)
//         if (key in record) {
//             return record[key]
//         }
//         console.log('compute ' + key)
//         record[key] = mult(...rest)
//         return record[key]
//     }
// }

// let mult2 = getMult2()
// console.log(mult2(1, 2))
// console.log(mult2(1, 2, 3))
// console.log(mult2(1, 2))
// console.log(mult2(1, 2, 4))

// 职责链模式

// Chain.prototype.setNextSuccessor 指定在链中的下一个节点
// Chain.prototype.passRequest 传递请求给某个节点
var Chain = function (fn) {
    this.fn = fn
    this.nextSuccessor = null
}
Chain.prototype.setNextSuccessor = function (nextSuccessor) {
    return (this.nextSuccessor = nextSuccessor)
}
Chain.prototype.passRequest = function () {
    var ret = this.fn.apply(this, arguments)
    if (ret === 'nextSuccessor') {
        return (
            this.nextSuccessor &&
            this.nextSuccessor.passRequest.apply(this.nextSuccessor, arguments)
        )
    }
    return ret
}

// 用于异步自动next的时候
Chain.prototype.next = function () {
    return (
        this.successor &&
        this.successor.passRequest.apply(this.successor, arguments)
    )
}

function greaterThan0(num) {
    if (num > 0) {
        console.log('> 0')
    } else {
        return 'nextSuccessor'
    }
}

function lessThan0(num) {
    if (num < 0) {
        console.log('< 0')
    } else {
        return 'nextSuccessor'
    }
}

function equalTo0(num) {
    if (num === 0) {
        console.log('= 0')
    }
}

let greaterThan0Chain = new Chain(greaterThan0)
let lessThan0Chain = new Chain(lessThan0)
let equalTo0Chain = new Chain(equalTo0)

greaterThan0Chain.setNextSuccessor(lessThan0Chain)
lessThan0Chain.setNextSuccessor(equalTo0Chain)

greaterThan0Chain.passRequest(-1) // <0

//假如有一天不想要只判断大于0了 还要判断大于10和小于等于10的

function greaterThan10(num) {
    if (num > 10) {
        console.log('>10')
        return
    }
    return 'nextSuccessor'
}

function lessThan10OrEqualTo10(num) {
    if (num <= 10) {
        console.log('<=10')
        return
    }
    return 'nextSuccessor'
}

let greaterThan10Chain = new Chain(greaterThan10)
let lessThan10OrEqualTo10Chain = new Chain(lessThan10OrEqualTo10)

greaterThan10Chain.setNextSuccessor(lessThan10OrEqualTo10Chain)
lessThan10OrEqualTo10Chain.setNextSuccessor(lessThan0Chain)
lessThan0Chain.setNextSuccessor(equalTo0Chain)

greaterThan10Chain.passRequest(1) // <=10
greaterThan10Chain.passRequest(11) // >10

// 异步例子
var fn1 = new Chain(function () {
    console.log(1)
    return 'nextSuccessor'
})
var fn2 = new Chain(function () {
    console.log(2)
    var self = this
    setTimeout(function () {
        self.next()
    }, 1000)
})
var fn3 = new Chain(function () {
    console.log(3)
})
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3)
fn1.passRequest()
