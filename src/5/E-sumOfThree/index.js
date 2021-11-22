const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");

function getSumOfThree(fileContent) {
  const [sum, arr1, arr2, arr3] = fileContent
  .toString()
  .trim()
  .split('\n', 4);

  const hashArr = new Map();
  const [, ...first] = arr1.trim().split(' ').map(Number);
  const [, ...second] = arr2.trim().split(' ').map(Number);
  const [, ...third] = arr3.trim().split(' ');
  const targetSum = +sum;

  third.forEach((element, idx) => {
    if(!hashArr.has(+element)) hashArr.set(+element,  idx);
  });

  let j = 0;
  let ans = '-1';

  for (let i = 0; i < first.length; i++) {
    let findTarget = targetSum - (first[i] + second[j]);
    while (findTarget < 0 && j < second.length) {
      j++;
      findTarget = targetSum - (first[i] + second[j]);
    }

    if (hashArr.has(findTarget)) return `${i} ${j} ${hashArr.get(findTarget)}`;
    
  }

  return ans;
}

fs.writeFileSync("output.txt", getSumOfThree(fileContent));
