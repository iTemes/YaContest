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
  const bracketsArr = brackets.split('');
  if (
    bracketsArr[0] === ')' || 
    bracketsArr.length % 2 || 
    bracketsArr[bracketsArr.length - 1] === '(') {
    return 'NO';
  }

  let right = 1;
  const bracketsInUse = {};

  for (let i = 0; i < bracketsArr.length; i++) {
    while (bracketsInUse[i] && i < bracketsArr.length) {
      i++;
    }

    while (right < bracketsArr.length - 1 && bracketsArr[right] === bracketsArr[i] && !bracketsInUse[right]) {
      right++;
    }

    if (i < bracketsArr.length && bracketsArr[i] === '(') {
      bracketsInUse[right] = true;
      bracketsInUse[i] = true;
    }
    
    if (right < bracketsArr.length - 1) {
      right++;
    }
  }
 
  return Object.keys(bracketsInUse).length === bracketsArr.length ? 'YES' : 'NO';
}

writeResult(isValidBrackets(brackets) + '\n');
logger.end();
