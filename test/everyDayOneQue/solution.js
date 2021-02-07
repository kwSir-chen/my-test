let numberToLetter =function(num) {
    if(num < 1) {
        return 'num < 1'
    } 
    if(parseInt(num) !== num) {
        return 'num 不是整数'
    }
    let prevNum = parseInt(num / 26)
    let prev = new Array(prevNum).fill('a').join('')
    let endLetter = String.fromCharCode( (num % 26) + 96 ) 
    return prev + endLetter
}