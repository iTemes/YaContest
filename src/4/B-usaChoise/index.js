/* 
Как известно, в США президент выбирается не прямым голосованием, а путем двухуровневого голосования. 
Сначала проводятся выборы в каждом штате и определяется победитель выборов в данном штате. 
Затем проводятся государственные выборы: на этих выборах каждый штат имеет определенное 
число голосов — число выборщиков от этого штата. На практике, все выборщики от штата голосуют 
в соответствии с результами голосования внутри штата, то есть на заключительной стадии выборов 
в голосовании участвуют штаты, имеющие различное число голосов. Вам известно за кого проголосовал 
каждый штат и сколько голосов было отдано данным штатом. Подведите итоги выборов: для каждого из 
участника голосования определите число отданных за него голосов.
*/

/* Формат ввода
Каждая строка входного файла содержит фамилию кандидата, за которого отдают голоса выборщики этого штата, 
затем через пробел идет количество выборщиков, отдавших голоса за этого кандидата.

*/


/* Формат вывода
Выведите фамилии всех кандидатов в лексикографическом порядке, затем, через пробел, 
количество отданных за них голосов.

McCain 10  
McCain 5
Obama 9
Obama 8
McCain 1
------>
McCain 16
Obama 17

*/


const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const candidates = fileContent.toString().trim().split('\n');

const logger = fs.createWriteStream('output.txt', {
    flags: 'a'
})

function writeResult(result) {
    logger.write(result)
}


function calcElections(candidates) {
    if (candidates[0] === '') {
        writeResult('\n');
        logger.end();
        return;
    }

    const hashElections = {};

    candidates.forEach((item) => {
        const [name, count] = item.split(' ');
        
        if (!hashElections[name]) {
            hashElections[name] = +count;
        } else hashElections[name] += +count;
    });

    const names = Object.keys(hashElections).sort();

    names.forEach(name => {
        writeResult(name + ' ' + hashElections[name] + '\n');
    });
    logger.end();
}

calcElections(candidates);