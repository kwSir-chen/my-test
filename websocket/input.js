const WebSocketClient = require('websocket').client;
var client = new WebSocketClient();

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question('Please enter the first number : ', (answer1) => {
//     rl.question('Please enter the second number : ', (answer1) => {
//         var result = (+answer1) + (+answer1);
//         console.log(`The sum of above two numbers is ${result}`);
//         rl.close();
//     });
// });

let chat = (connection) => rl.question('kw: ',(input) => {
    if (input.toString() === 'end') {
        rl.close()
        process.exit()
    }
    connection.sendUTF(input)
})

client.on('connect',(connection)=>{
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("robot: '" + message.utf8Data + "'");
        }
        chat(connection)
    });
    chat(connection)
})

client.connect('ws://localhost:8080/', 'echo-protocol');