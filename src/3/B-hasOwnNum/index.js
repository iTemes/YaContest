/* 
Во входной строке записана последовательность чисел через пробел. Для каждого числа выведите слово YES (в отдельной строке), 
если это число ранее встречалось в последовательности или NO, если не встречалось.
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const nums = fileContent.toString().trim().replace(/\r\n/g,'\n').split(' ');



function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}


function getOwnNum(nums) {
    let ans = '';
    const objHash = {};
    
    nums.forEach(element => {
        objHash.hasOwnProperty(element) ? ans += 'YES \n' :  ans += 'NO \n';
        objHash[element] = element;
    });

    writeResult(ans);
}

getOwnNum(nums);
