/* 
Даны два списка чисел, которые могут содержать до 100000 чисел каждый. 
Посчитайте, сколько чисел содержится одновременно как в первом списке, так и во втором. 
Примечание. Эту задачу на Питоне можно решить в одну строчку.
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");

let [arr1, arr2] = fileContent.toString().split('\n');

arr1 = arr1.trim().split(' ');
arr2 = arr2.trim().split(' ');



function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}

const objHash = {

}


function getEqualCount(arr1, arr2) {
    let ans = 0;
    arr1.forEach(element => {
        objHash[element] = element;
    });

    arr2.forEach(item => objHash.hasOwnProperty(item) && ans++);
    writeResult(ans + '\n');
}

getEqualCount(arr1, arr2);
