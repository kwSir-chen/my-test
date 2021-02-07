
const fs=require('fs')
const path=require('path')
const mammoth = require("mammoth");

mammoth.convertToHtml({path: "../doc/document.docx"})
.then(function(result){
    let html = result.value; // The generated HTML
    console.log(html)
    fs.writeFileSync(path.resolve(__dirname,`./document.html`),html)
    // let messages = result.messages; // Any messages, such as warnings during conversion
})
.done();