const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the size of the array: ", function (n) {
  n = parseInt(n);
  let arr = [];

  console.warn(`Enter ${n} elements:`);
  let i = 0;
  rl.setPrompt(`Element ${i + 1}: `);
  rl.prompt();

  rl.on("line", function (input) {
    arr.push(parseInt(input));
    i++;
    if (i < n) {
      rl.setPrompt(`Element ${i + 1}: `);
      rl.prompt();
    } else {
      console.warn("The array you entered is:");
      console.warn(arr.join(" "));
      rl.close();
    }
  });
});

rl.on("close", function () {
  process.exit(0);
});
