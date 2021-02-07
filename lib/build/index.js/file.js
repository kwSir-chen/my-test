(function (_) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

    const path = require('path'); 
    const fs = require('fs'); 
    const iconv = require('iconv-lite'); 
    const BufferHelper = require('bufferhelper');

    const bufferHelper = new BufferHelper();

    console.log(___default['default'].concat());

    getPathDoc = (path)=>{
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            console.log(item);
        });
    };

    addHead = (path)=>{
        console.log(path);
        // fs.readFile('../doc/doc.html',(err,resBuf)=>{
        //     console.log(err)
        //     console.log(resBuf)
        //     let resHtml = iconv.decode(resBuf,'gbk')
        //     // console.log(resHtml)
        //     resHtml = resHtml.replace('<head>','<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">')
        //     console.log(resHtml)
        //     resHtml = iconv.encode(resHtml,'gbk')
        //     fs.writeFileSync(path.resolve(__dirname,`../doc/docHead.html`),resHtml)
        // })
    };

    window.getPathDoc = getPathDoc;
    window.addHead = addHead;

}(_));
//# sourceMappingURL=file.js.map
