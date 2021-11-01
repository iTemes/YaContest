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

/*
Python

box_count = int(input())
col_cnt = {}

for _ in range(box_count):
    color, value = map(int, input().split())
    if color in col_cnt:
        col_cnt[color] += value
    else:
        col_cnt[color] = value

for key, value in sorted(col_cnt.items()):
    print(f"{key} {value}")
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const [colorsNum, ...colorsArr] = fileContent.toString().trim().split('\n');


function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}


function colorsGrade(colorsArr) {
    const hashColors = {};
    const data = colorsArr.map(item =>  item.split(' '));

    data.forEach(([key, val]) => {
        if (!hashColors[key]) {
            hashColors[key] = BigInt(val);
        } else hashColors[key] += BigInt(val);
    });

    const ans = 
        Object.entries(hashColors)
        .sort((a , b) => a[0] - b[0])
        .reduce((acc, item) => {
            return acc += item.join(' ') + '\n'
        }, '');

    writeResult(ans);
}

colorsGrade(colorsArr);