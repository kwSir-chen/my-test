const path = require('path') 
const fs = require('fs') 
const iconv = require('iconv-lite'); 
const BufferHelper = require('bufferhelper');
const readline = require('readline');
const { ripemd160 } = require('hash.js');

const bufferHelper = new BufferHelper()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let filePath = ''

// 请输入要转换的html文件夹路径
function getInput(text){
    rl.question(text, (input) => {
        if(!input){
            console.log('-- 输入不能为空 --')
            getInput(text)
            return
        }

        if(/^(exit|end)$/.test(input)){
            rl.close()
            return
        }

        let htmlArr
        try {
            fs.realpathSync(input)
            filePath = input.replace(/\\/g,'//')
            htmlArr = getPathDoc(filePath)
        } catch (error) {
            console.log('-- 找不到路径，请输入一个文件夹路径，格式类似 C:\ckhd  --')
            getInput('请重新输入：')
            return
        }

        

        if(htmlArr.length === 0) {
            console.log('-- 文件夹中无html或htm文件 --')
            getInput(text)
            return
        }
        createFolder(filePath)
        transform(htmlArr,filePath)
        getInput('请输入要转换的html文件夹路径：')
        // rl.close();  //关闭输入
    });
}


function createFolder(path){
    try {
        fs.realpathSync(`${path}/addMetaHtml`)
    } catch (error) {
        console.log('\n----- 创建addMetaHtml文件夹存放转换后的html ------')   
        fs.mkdirSync(`${path}/addMetaHtml`)
    }
}

function getPathDoc(path){
    let files = fs.readdirSync(path);
    let arr = []
    files.forEach(function (item, index) {
        if(/(.htm)|(.html)/.test(item)){
            arr.push(item)
        }
    })
    return arr
}

function transform(arr,filePath){
    console.log('')
    try {
        arr.forEach((file,index)=>{
            addMeta(file,filePath)
        })
    } catch (error) {
        console.log('转换失败')
    }
    console.log(`\n---- ${arr.length}个html转换成功，存放在addMetaHtml文件夹 ----\n`)
}


function addMeta(file,filePath){
    try {
        let resBuf = fs.readFileSync(`${filePath}/${file}`)
        file = file.replace(/.htm$/,'.html')
        let _gbkHtml = iconv.decode(resBuf,'gbk')   //先随便转个 英文字符不受影响 读取到解码后再转
        let htmlCode = /charset=([^"]+)/.exec(_gbkHtml)[1]
        let resHtml = iconv.decode(resBuf,htmlCode)
        if(!/<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"><\/meta>/.test(resHtml)){
            resHtml = resHtml.replace('<head>','<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">')
        }
        //兼容档铺转的html http://www.docpe.com/word/word-to-html.aspx
        // 去除站长提示
        resHtml = resHtml.replace(/<div\sclass="(cnzz|docpe)"[\w\W]+<\/div>/g,'')
        resHtml = iconv.encode(resHtml,htmlCode)
        fs.writeFileSync(`${filePath}/addMetaHtml/${file}`,resHtml)
        console.log(`-- ${file}`)
    } catch (e) {
        console.log(e)
    }
    
}

// let filePath = 'C://Users//ckhd//Desktop//html//word//html'
getInput('请输入要转换的html文件夹路径：')


