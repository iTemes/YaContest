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
  return numbers[left] === n ? left + 1 : 0;
}

function rBinSearch(numbers, n) {
  let left = 0;
  let right = numbers.length - 1;
  let medium;

  while (left < right) {
    medium = Math.ceil((left + right) / 2);
    numbers[medium] > n ? (right = medium - 1) : (left = medium);
  }

  return numbers[left] === n ? left + 1 : 0;
}

function RLE(fileContent) {
  const [arrLength, arr, queryCount, ...queryes] = fileContent.toString().trim().split('\n');
  const dataArr = arr.split(' ').map(Number);
  const dataQueryes = queryes[0].split(' ').map(Number);
  let result = ``;

  for (let i = 0; i < dataQueryes.length; i++) {
    const left = lBinSearch(dataArr, dataQueryes[i]);
    const right = rBinSearch(dataArr, dataQueryes[i]);

    result += `${left} ${right}\n`;
  }
  return result;
}

fs.writeFileSync('output.txt', RLE(fileContent));
