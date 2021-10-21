/* 
Последовательность состоит из натуральных чисел и завершается числом 0. 
Всего вводится не более 10000 чисел (не считая завершающего числа 0). 
Определите, сколько элементов этой последовательности равны ее наибольшему элементу.

Числа, следующие за числом 0, считывать не нужно.
*/

const fs = require("fs");

const fileContent = fs.readFileSync("input.txt", "utf8");
const nums = fileContent.toString().trim().replace(/\r\n/g,'\n').split('\n');


function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}


function getMaxNumCount(nums) {
    let maxCount = 0;
    let maxNum = 0;
    for (let i = 0; i < nums.length; i++) {
        if (+nums[i] === 0) {
            break;
        }

        if (+nums[i] > maxNum) {
            maxCount = 1;
            maxNum = +nums[i];
            continue;
        }

        if (+nums[i] === maxNum) {
            maxCount++;
        }
    }

    writeResult(maxCount);
}

getMaxNumCount(nums);
