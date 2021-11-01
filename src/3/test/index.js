/* 
Даны две строки строчных латинских символов: строка J и строка S. 
Символы, входящие в строку J, — «драгоценности», входящие в строку S — «камни». Нужно определить, 
какое количество символов из S одновременно являются «драгоценностями». 
Проще говоря, нужно проверить, какое количество символов из S входит в J.
Это разминочная задача, к которой мы размещаем готовые решения. Она очень простая и нужна для того, 
чтобы вы могли познакомиться с нашей автоматической системой проверки решений. 
Ввод и вывод осуществляется через файлы, либо через стандартные потоки ввода-вывода, как вам удобнее.
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const [jewely, stones] = fileContent.toString().trim().split('\n');


function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}

function jewelyAndStones(jewely, stones) {
    let count = 0;
    if (!stones) {
        writeResult(count + '\n');
        return;
    }
   
    const jewelySet = new Set(jewely.split(''));
    const stonesArr = stones.split('');
    

    stonesArr.forEach(element => {
        if (jewelySet.has(element)) count++;
    });
    writeResult(count + '\n');
}

jewelyAndStones(jewely, stones);
