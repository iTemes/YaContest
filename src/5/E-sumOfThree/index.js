const fs = require('fs');
const fileContent = fs.readFileSync('threesum.in', 'utf8');

function getSumOfThree(fileContent) {
  const [sum, arr1, arr2, arr3] = fileContent.toString().trim().split('\n', 4);

  const hashArr = new Map();
  const [, ...first] = arr1.trim().split(' ').map(Number);
  const [, ...second] = arr2.trim().split(' ').map(Number);
  const [, ...third] = arr3.trim().split(' ');
  const targetSum = +sum;
  let ans = '-1';

  third.forEach((element, idx) => {
    if (!hashArr.has(+element)) hashArr.set(+element, idx);
  });

  for (let i = 0; i < first.length; i++) {
    let j = 0;
    while (j < second.length) {
      findTarget = targetSum - (first[i] + second[j]);
      if (hashArr.has(findTarget)) {
        return `${i} ${j} ${hashArr.get(findTarget)}\n`;
      }
      j++;
    }
  }

  return ans;
}

fs.writeFileSync('threesum.out', getSumOfThree(fileContent));
