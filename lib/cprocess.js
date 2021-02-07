const child_process = require('child_process');

const cprocess = child_process.spawnSync('start WINWORD')

console.log(cprocess)