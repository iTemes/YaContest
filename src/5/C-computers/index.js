/*

*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const logger = fs.createWriteStream("output.txt", {
  flags: "a",
});
const [, numbers] = fileContent.toString().trim().split("\n");

function writeResult(result) {
  logger.write(result);
}

function getGroupsComputers(numbers) {
  logger.end();
}

getGroupsComputers(numbers);
