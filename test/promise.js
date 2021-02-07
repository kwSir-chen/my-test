// const { reject } = require("core-js/fn/promise")

let fun1 = function(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('fun1')
        },2000)
    })
}

let fun2 = async ()=>{
    try {
        await fun1()
        throw '6666'
        return res
    } catch (error) {
        console.log('fun2 error '+error)
        throw error
    }
}

let run =async ()=>{
    try {
        console.log('run')
        await fun2()
    } catch (error) {
        console.log('run error '+error)
    }
}

export {run}