
// 每日一题 货物转入转出test
class Deopsitory{
    store = {}
    constructor(options) {
        if([1,2].includes(getObjLevel(options))) {
            this.store = mergeObj(this.store,options)
        }
    }

    // 转入
    transferIn(cargo) {
        try {
            
        } catch (error) {
            
        }
    }

    // 转出
    transferOut(cargo) {

    }
}


/**
 * 获取object层数
 * @param {} obj 
 */
function getObjLevel(obj) {
    if (!isObject(obj)) {
        return 0
    }
    let levelArr = [];
    for (let key in obj) {
        if (isObject(obj[key])) {
            levelArr.push(getObjLevel(obj[key])+1)
        } else {
            levelArr.push(1)
        }
    }
    return getArrMax(levelArr)
}

/**
 * 
 * @param {*} obj1 
 * @param {*} obj2 
 * @param {*} type 'add','subtract'
 */
function mergeObj(obj1, obj2, type) {

    if(!/^(add|subtract)$/.test(type))  throw 'type error'

    let tObj  = JSON.parse(JSON.stringify(obj1))
    for (let key in obj2) {
        if(isObject(obj2[key])) {
            if (key in tObj) {
                tObj[key] = mergeObj(tObj[key], obj2[key], type)
            } else {
                if (type === 'add') {
                    tObj[key] = JSON.parse(JSON.stringify(obj2[key]))
                } 
                if (type === 'subtract') {
                    throw `转出失败 无产品${key}`
                }
            }
        } else {
            if (key in tObj) {
                if (type === 'add') {
                    tObj[key]+=obj2[key]
                }
                if (type === 'subtract') {
                    if (tObj[key] - obj2[key] < 0) {
                        throw `转出失败 产品${key}不足`
                    }
                    tObj[key]-=obj2[key]
                }
                
            } else {
                if (type === 'add') {
                    tObj[key] = obj2[key]
                }
                if (type === 'subtract') {
                    throw `转出失败 无产品${key}`
                }
            }
        }
    }
    return tObj
}

function isObject(param) {
    return Object.prototype.toString.call(param) === '[object Object]'
}

/**
 * 获取arr中最大值
 * @param {*} arr 
 */
function getArrMax(arr) {
    let tArr = arr.sort((a,b)=>{return b-a})
    return tArr[0]
}

let  o1 = {a:11,2:22,3:{name:33}}
let  o2 = {a:11,2:22,3:{name:66}}

console.log(mergeObj(o1,o2,'subtract'))
console.log(getObjLevel(o1),getObjLevel(o2))
console.log(isObject(o1),isObject(11))
console.log(getArrMax([1,55,4,3,44]))