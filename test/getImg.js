// 文件夹图片处理。爬取诡秘同人图用的。

const request = require('request')
const fs = require('fs')
const path = require('path');
const axios = require("axios")
const cheerio = require("cheerio")

// axios.get("https://www.zcool.com.cn/work/ZNDI0NzUzNzY=.html").then(resp => {
//     var $ = cheerio.load(resp.data)
//     var imgArr = $('.reveal-work-wrap > .photo-information-content img')
//     console.log( imgArr[0] )
//     // console.log( $('.reveal-work-wrap > .photo-information-content') )
//     return
//     var srcArr = []
//     for(let key in imgArr) {
//         srcArr.push(imgArr[key].src)
//     }
//     console.log(srcArr)
// })

// 读取文件夹
// let filePath = 'C:/Users/ckhd/Desktop/test'
// fs.readdir(filePath,(err,files)=>{
//     if(err) {
//         console.log('获取文件夹信息失败 ' + err)
//         return
//     }
//     console.log(files)
// })




let srcArr =  ["https://img.zcool.cn/community/0131715e37a3f1a80120a895520db2.jpg@1280w_1l_0o_100sh.jpg", "https://img.zcool.cn/community/011e355e37a3f6a80121651832b448.jpg@1280w_1l_0o_100sh.jpg", "https://img.zcool.cn/community/01a4425e37a3f9a80120a8954e770c.jpg@1280w_1l_0o_100sh.jpg", "https://img.zcool.cn/community/0127035e37a403a801216518d58c5f.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/018acf5e37a40aa80120a895953b12.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/013e235e37a40aa801216518fd00b0.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0167ca5e37a40aa80120a8958b5959.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/018d0f5e37a40aa801216518fc1d5a.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0139bd5e37a40ba80120a8955daeb1.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/010f6d5e37a40ba801216518225700.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01710b5e37a40ba80120a895d13b79.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01e9065e37a40da80120a895e21577.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0145205e37a40da801216518041e89.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01ae565e37a40ea801216518a92bf5.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/013c335e37a40ea80120a895658a5e.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/014a7d5e37a40ea80121651815e12f.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01cf0e5e37a40fa80120a89553031b.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0167b65e37a40fa801216518fd0cb3.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01497a5e37a40fa80120a895287d26.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01c4d45e37a411a80120a895667684.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01f29a5e37a411a801216518d26361.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0192a05e37a411a801216518ea8761.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/012d9e5e37a412a80120a895c5bc09.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01947c5e37a412a8012165188c9954.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0112895e37a413a80120a895ea3fbc.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01b0665e37a413a801216518d9011d.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0182155e3bc194a80120a895a05cbf.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01415d5e3bc195a801216518aa3acb.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0109b25e3bc198a8012165186ba77b.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/014e745e3bc198a80120a89533f3e5.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/011cc55e3bc199a801216518c1ff61.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0195db5e3bc19ba80120a895aa7489.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01adad5e3bc19ca801216518039373.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01e3685e3bc19da80120a895b495d6.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0170835e3bc19ea801216518f22bc2.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/014f505e3bc19ea80120a895186c41.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/011ebc5e3bc19fa8012165183c7511.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01386c5e3bc1a0a80120a895c0b74a.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01887c5e3bc1a1a80121651843f330.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0106935e3bc1a2a80120a895752e38.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/019aac5e3bc1a3a801216518f4504e.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01be2e5e3bc1a4a80120a895eb0cd0.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0135fc5e3bc1a5a801216518ef4c2e.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01e0c55e3bc1a7a80120a89532a81c.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0134e55e3bc1a9a801216518b46469.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/01c2cf5e3bc1aaa80120a895edb03f.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0139bb5e3bc1aba801216518571704.jpg@1280w_1l_2o_100sh.jpg", "https://img.zcool.cn/community/0104cd5e3bc1aba80120a895a7afc2.jpg@1280w_1l_2o_100sh.jpg"]

// let url = 'http://kr-christmas.ck-dev.haifurong.cn/03.6eea251e.png'
// const name = url.slice(url.lastIndexOf('/') + 1)
// request(url).pipe(fs.createWriteStream('./guimiImg/' + name));

for (let i = 0; i < srcArr.length; i++) {
    let name = 'gm' + ((i+'').padStart('2','0'))+'.jpg'
    request(srcArr[i]).pipe(fs.createWriteStream('./guimiImg/' + name));
}
