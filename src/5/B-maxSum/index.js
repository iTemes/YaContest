/*
В первой строке входных данных записано единственное число 
n -  размер массива.
Во второй строке записано 
n целых чисел - сам массив.

Формат вывода

Выведите одно число - максимальную сумму на отрезке в данном массиве.
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

function getMaxPrefixSum(numbers) {
  const array = numbers.split(" ");

  let currentSum = +array[0];
  let maxSum = currentSum;

  for (let i = 1; i < array.length; i++) {
    if (currentSum <= 0) currentSum = +array[i];
    else currentSum += +array[i];

    maxSum = Math.max(currentSum, maxSum);
  }

  writeResult(maxSum + "\n");

  logger.end();
}

getMaxPrefixSum(numbers);
