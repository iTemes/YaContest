/*
В первой строке записано два целых числа 
n q - размер массива и количество запросов.
Во второй строке записаны 
n целых чисел - сам массив.
Далее в q строках описаны запросы к массиву. Каждый запрос описывается 
двумя числами l  r- левой и правой границей отрезка, на котором нужно 
найти сумму.
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const logger = fs.createWriteStream("output.txt", {
  flags: "a",
});
const [params, numbers, ...queries] = fileContent.toString().trim().split("\n");

function writeResult(result) {
  logger.write(result);
}

function getPrefixSum(params, numbers, queries) {
  const [length] = params.split(" ");
  const array = numbers.split(" ");

  const prefixArr = new Array(+length + 1).fill(0);
  for (let i = 1; i < prefixArr.length; i++) {
    prefixArr[i] = +array[i - 1] + prefixArr[i - 1];
  }

  queries.forEach((query) => {
    const [l, r] = query.split(" ");

    writeResult(prefixArr[r] - prefixArr[l - 1] + "\n");
  });

  logger.end();
}

getPrefixSum(params, numbers, queries);
