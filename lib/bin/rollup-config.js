import resolve      from '@rollup/plugin-node-resolve';
import commonjs      from '@rollup/plugin-commonjs';


export default {
    input: {
        file: 'utils.js'
    }
    ,
    output:{
        dir:'build/index.js', // 输出文件
        format: 'iife',
        // name:'UTILS',  //当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
        sourcemap:true  //生成bundle.map.js文件，方便调试
    },
    plugins:[
        resolve(),
        commonjs({extensions: ['.js', '.ts']})
    ]
}
