const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the size of the array: ", function(n) {
    n = parseInt(n);
    let arr = [];

    console.log(`Enter ${n} elements:`);
    let i = 0;
    rl.setPrompt(`Element ${i + 1}: `);
    rl.prompt();
    
    rl.on('line', function(input) {
        arr.push(parseInt(input));
        i++;
        if (i < n) {
            rl.setPrompt(`Element ${i + 1}: `);
            rl.prompt();
        } else {
            console.log("The array you entered is:");
            console.log(arr.join(" "));
            rl.close();
        }
    });
});

rl.on('close', function() {
    process.exit(0);
});
