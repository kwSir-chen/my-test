// es6代理 proxy
const proxy = require("http-proxy-middleware")

let obj = new Proxy({name:'kkw'},{
    
    get:(target,key,receiver) => {
        // console.log(arrs)
        return target[key]
    },

    set:(target,key,val,receiver)=>{
        // console.log(arrs)
        return target[key] = val
    }
})

console.log(obj)

let say = (val) =>{
    console.log(val)
}

let sayP = new proxy(say,{
    apply:(func,thisP,paramArr)=>{
        console.log('param:',paramArr)
        return func(...paramArr)
    }
})