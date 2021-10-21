/* 
В строкоремонтную мастерскую принесли строку, состоящую из строчных латинских букв. 
Заказчик хочет сделать из неё палиндром. В мастерской могут за 1 байтландский тугрик 
заменить произвольную букву в строке любой выбранной заказчиком буквой.
Какую минимальную сумму придётся заплатить заказчику за ремонт строки?
Напомним, что палиндромом называется строка, которая равна самой себе, прочитанной в 
обратном направлении.

Формат ввода
    Входные данные содержат непустую строку, состоящую из строчных латинских букв, которую принёс заказчик. Длина строки не превосходит 
    10**4.
Формат вывода
    Выведите одно целое число — минимальную сумму, которую заказчику придётся заплатить за превращение принесённой заказчиком строки в палиндром.

Пример 1
    Ввод a - вывод 0

Пример 2
    Ввод ab - вывод 1

Пример 3
    Ввод cognitive - вывод 4
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
let string = fileContent.toString().trim();


function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}


function createPallindrome(string) {
    if (string.length === 1) {
        console.log("Слово из 1 буквы");
        writeResult(0);
        return 0;
    }

    if (string === string.split('').reverse().join('')) {
        console.log('This is pallindrom');
        writeResult(0);
        return 0
    } 

    let leftPointer = 0;
    let rightPointer = string.length - 1;
    let symbolCount = 0;

    while (leftPointer < rightPointer) {
        if(string[leftPointer] !== string[rightPointer]) {
            symbolCount++;
        }
        leftPointer++;
        rightPointer--;
    }

    writeResult(symbolCount);
}

createPallindrome(string);
