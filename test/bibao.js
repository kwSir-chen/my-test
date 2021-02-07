let data = {}

let attrData = (obj)=>{
    let data
    return ()=>{
        data = {...data,...obj}
        return data
    }
}

let gData = function() {
    return 11
}


// let repeat = function(func,times,wait) {
//     return ()=>{
//         let t = 0
//         let interval = setInterval(() => {
//             func('hello world')
//             if(t === times - 1) {
//                 clearInterval(interval)
//             }
//             t++
//         },3000)
//     }
// }

let repeat = function(func,times,wait) {
    return (data)=>{
        let t = 0
        let f = () => setTimeout(()=>{
            func(data)
            if(t < times - 1) {
                t++
                f()
            } 
        },wait)
        f()
    }
}