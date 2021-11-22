const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

function lBinSearch(numbers, n) {
  let left = 0;
  let right = numbers.length - 1;
  let medium;

  while (left < right) {
    medium = Math.floor((left + right) / 2);
    numbers[medium] >= n ? (right = medium) : (left = medium + 1);
  }
  return left;
}

function rBinSearch(numbers, n) {
  let left = 0;
  let right = numbers.length - 1;
  let medium;

  while (left < right) {
    medium = Math.ceil((left + right) / 2);
    numbers[medium] > n ? (right = medium - 1) : (left = medium);
  }

  return left;
}

function fastSearch(fileContent) {
  const [arrLength, arr, queryCount, ...queryes] = fileContent.toString().trim().split('\n');
  const dataArr = arr.split(' ').map(Number);
  const result = [];

  dataArr.sort((a, b) => a - b);

  console.log('dataArr', dataArr);

  for (let i = 0; i < queryes.length; i++) {
    const [left, right] = queryes[i].trim().split(' ').map(Number);

    if (left > dataArr[dataArr.length - 1] || right < dataArr[0]) {
      result.push(0);
    } else {
      const count = rBinSearch(dataArr, right) - lBinSearch(dataArr, left) + 1;
      result.push(count > 0 ? count : 0);
    }
  }
  return result.join(' ');
}

fs.writeFileSync('output.txt', fastSearch(fileContent));
