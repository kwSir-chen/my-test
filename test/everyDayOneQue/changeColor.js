
function color16ToRgba(color){
    if(/^#\d{3}|\d{6} $/.test(color)){
        let numString = color.replace('#','')
        let rgbaNumArr = []
        if (numString.length === 3) {
            rgbaNumArr = numString.split('').reduce((t,c)=>{
                t.push(parseInt(c+c,16))
                return t
            },[])
        } else {
            while(numString){
                let nums = numString.slice(0,2)
                numString = numString.replace(nums,'')
                rgbaNumArr.push(parseInt(nums,16))
            }
        }
        return `rgba(${rgbaNumArr[0]},${rgbaNumArr[1]},${rgbaNumArr[2]})`
    }else {
        throw '请输入正确格式'
    }
}

console.log(color16ToRgba('#123'))
console.log(color16ToRgba('#12'))

