/* Лена руководит разработкой тестирующей системы, в которой реализованы интерактивные задачи.
До заверщения очередной стадии проекта осталось написать модуль, определяющий итоговый вердикт системы для интерактивной задачи. 
Итоговый вердикт определяется из кода завершения задачи, вердикта интерактора и вердикта чекера по следующим правилам:

Вердикт чекера и вердикт интерактора — это целые числа от 0 до 7 включительно.

Код завершения задачи — это целое число от -128 до 127 включительно.

Если интерактор выдал вердикт 0, итоговый вердикт равен 3 в случае, если программа завершилась с ненулевым кодом, 
и вердикту чекера в противном случае.
Если интерактор выдал вердикт 1, итоговый вердикт равен вердикту чекера.
Если интерактор выдал вердикт 4, итоговый вердикт равен 3 в случае, если программа завершилась с ненулевым кодом, и 4 в противном случае.
Если интерактор выдал вердикт 6, итоговый вердикт равен 0.
Если интерактор выдал вердикт 7, итоговый вердикт равен 1.

В остальных случаях итоговый вердикт равен вердикту интерактора.
Ваша задача — реализовать этот модуль.

Формат вывода
Выведите одно целое число от 0 до 7 включительно — итоговый вердикт системы. */

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");

let [code, interactorVerdict, checkerVerdict] = fileContent.toString().split('\n');

code = Number(code);
interactorVerdict = Number(interactorVerdict);
checkerVerdict = Number(checkerVerdict);
/**
 * Check params of getVerdictFunction.
 * @param {number} code - The code of operation -128 <= i <= 127.
 * @param {number} interactorVerdict - The interactorVerdict value 0 <= i <= 7.
 * @param {number} checkerVerdict - The checkerVerdict value 0 <= i <= 7.
 * @return {boolean} The result of check.
 */
function checkParams(code, interactorVerdict, checkerVerdict) {
    if (typeof code === 'undefined') return false;
    if (typeof interactorVerdict === 'undefined') return false;
    if (typeof checkerVerdict === 'undefined') return false;

    if (code < -128 || code > 127) return false;
    if (interactorVerdict < 0 || interactorVerdict > 7) return false;
    if (checkerVerdict < 0 || checkerVerdict > 7) return false;

    return true;
}

function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}

/**
 * Represents a module of generator result.
 * @param {number} code - The code of operation -128 <= i <= 127.
 * @param {number} interactorVerdict - The interactorVerdict value 0 <= i <= 7.
 * @param {number} checkerVerdict - The checkerVerdict value 0 <= i <= 7.
 * @return {number} The result of generator.
 */
function getVerdict(code, interactorVerdict, checkerVerdict) {
    if(!checkParams(code, interactorVerdict, checkerVerdict)) {
        console.assert(false, { msg: 'Not valid input values' });
        return false;
    }

    let result;

    if (interactorVerdict === 0 && code !== 0) {
        result = 3;
        writeResult(result);
        return result;
    } else if (interactorVerdict === 0) {
        result = checkerVerdict;
        writeResult(result);
        return result;
    }

    if (interactorVerdict === 4 && code !== 0) {
        result = 3;
        writeResult(result);
        return result;
    } else if (interactorVerdict === 4) {
        result = 4;
        writeResult(result);
        return result;
    }

    switch (interactorVerdict) {
        case 1:
            result = checkerVerdict;
            break;
        case 6:
            result = 0;
            break;
        case 7:
            result = 1;
            break;
        default:
            result = interactorVerdict;
    }

    
    writeResult(result);
    return result;
}

getVerdict(code, interactorVerdict, checkerVerdict);
