// generator和promise

let pro1 = function(){
    return new Promise((res,rej)=>{
        setTimeout(()=>res(1111),2000)
    })
}
let pro2 = function(){
    return new Promise((res,rej)=>{
        setTimeout(()=>res(222),2000)
    })
}

let gen = function* (fn){
    yield fn()
    return ''
}
function asyncfn(fn){
    let g = gen(fn)
    let r1 = g.next()
    let r
    r1.value.then(res=>r)
}
let g = gen()
let r1 = g.next()
console.log(r1)
r1.value.then(res=>console.log(res))