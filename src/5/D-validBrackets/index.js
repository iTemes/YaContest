/*
Формат ввода

Если из правильного арифметического выражения вычеркнуть всё, кроме круглых скобок, 
то получится правильная скобочная последовательность. 
Проверьте, является ли введённая строка правильной скобочной последовательностью.

Формат вывода
Выведите YES если введённая строка является правильной скобочной последовательностью и NO иначе
(())() - YES
(()))() - NO

*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const logger = fs.createWriteStream("output.txt", {
  flags: "a",
});
const [brackets] = fileContent
  .toString()
  .trim()
  .split("\n");

function writeResult(result) {
  logger.write(result);
}

function isValidBrackets(brackets) {
  console.log('brackets', brackets);
  logger.end();
}

isValidBrackets(brackets);
