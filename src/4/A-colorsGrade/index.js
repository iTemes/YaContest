/* 
Толя-Карп запросил для себя n посылок с «Аллигатор-экспресс».

Посылка представляет из себя ящик. Внутри ящика лежит целое число ai. 
Номер на ящике di указывает на цвет числа, лежащего внутри.

Толю-Карпа интересует, чему будут равны значения чисел, если сложить между собой все те, 
что имеют одинаковый цвет. Напишите, пожалуйста, программу, которая выводит результат.
*/

/* Формат ввода
В первой строке одно число n (0 ≤ n ≤ 2*105).

В следующих n строках заданы по два числа: цвет числа в ящике di и значение числа ai (-1018 ≤ di, ai ≤ 1018).

Гарантируется, что сумма чисел одного цвета не превышает 1018.

*/


/* Формат вывода
ыведите в порядке возрастания номера цвета пары чисел, 
каждая в новой строке: номер цвета и сумму всех чисел данного цвета.
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const [colorsNum, ...colorsArr] = fileContent.toString().trim().split('\n');
var logger = fs.createWriteStream('output.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
})

function writeResult(result) {
    logger.write(result)
}

function colorsGrade(colorsArr) {
    const hashColors = {};
    const data = colorsArr.map(item =>  item.split(' '));

    data.forEach(([key, val]) => {
        if (!hashColors[key]) {
            hashColors[key] = BigInt(val);
        } else hashColors[key] += BigInt(val);
    });

    Object.entries(hashColors)
        .sort((a , b) => a[0] - b[0])
        .forEach(item => {
            writeResult(item.join(' ') + '\n');
        });
    logger.end();
}

colorsGrade(colorsArr);
