/* 
Неизвестный водитель совершил ДТП и скрылся с места происшествия. 
Полиция опрашивает свидетелей. Каждый из них говорит, что запомнил какие-то буквы и цифры номера. 
Но при этом свидетели не помнят порядок этих цифр и букв. Полиция хочет проверить несколько подозреваемых автомобилей. 
Будем говорить, что номер согласуется с показанием свидетеля, если все символы, 
которые назвал свидетель, присутствуют в этом номере (не важно, сколько раз).
*/

/* Формат ввода
Сначала задано число  - количество свидетелей. Далее идет M строк, каждая из которых описывает показания очередного свидетеля. 
Эти строки непустые и состоят из не более чем 20 символов. Каждый символ в строке - либо цифра, либо заглавная латинская буква, 
причём символы могут повторяться.
Затем идёт число  - количество номеров. Следующие строки представляют из себя номера подозреваемых машин и имеют такой же формат, 
как и показания свидетелей.

2
1ABC
3A4B
3
A143BC
C143AB
AAABC1

*/


/* Формат вывода
Выпишите номера автомобилей, согласующиеся с максимальным количеством свидетелей. 
Если таких номеров несколько, то выведите их в том же порядке, 
в котором они были заданы на входе.
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const [witnessNum, ...numbers] = fileContent.toString().trim().split('\n');


function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}

function isSuperset(set, subset) {
    for (var elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}

function getAutoNumList(witnessNum, numbers) {
    let countNumber = 0;
    const witnessArr = [];
    const carNumbers = numbers
        .slice(+witnessNum + 1)
        .map(elem => [elem, new Set(elem), 0]);

    let ans = '';
    let matchetCountMax = 0;

    // заполянем показания свидетелей
    while (countNumber < +witnessNum) {
        const newArr = numbers[countNumber].split('');
        witnessArr.push(new Set(newArr))
        countNumber++;
    }

    for (let index = 0; index < carNumbers.length; index++) {
        const stringSet = carNumbers[index][1];

        witnessArr.forEach(item => {
            if(isSuperset(stringSet, item)) carNumbers[index][2]++;
        })

        matchetCountMax = Math.max(matchetCountMax, carNumbers[index][2])
    }

    ans = carNumbers
        .filter(number => number[2] === matchetCountMax)
        .map(number => number[0]).join('\n');
    console.log('ans', ans);
    writeResult(ans + '\n');
}

getAutoNumList(witnessNum, numbers);
