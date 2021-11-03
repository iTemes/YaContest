/*
Клуб Юных Хакеров организовал на своем сайте форум. Форум имеет следующую структуру: 
каждое сообщение либо начинает новую тему, либо является ответом на какое-либо предыдущее 
сообщение и принадлежит той же теме.

После нескольких месяцев использования своего форума юных хакеров заинтересовал вопрос - 
какая тема на их форуме наиболее популярна. Помогите им выяснить это.
*/

/* 
Формат ввода
В первой строке вводится целое число N - количество сообщений в форуме (1 <= N <= 1000). 
Следующие строки содержат описание сообщений в хронологическом порядке.
Описание сообщения, которое представляет собой начало новой темы, состоит из трех строк. 
Первая строка содержит число 0. Вторая строка содержит название темы. 
Длина названия не превышает 30 символов. Третья строка содержит текст сообщения.
Описание сообщения, которое является ответом на другое сообщение, состоит из двух строк. 
Первая строка содержит целое число - номер сообщения, ответом на которое оно является. 
Сообщения нумеруются, начиная с единицы. Ответ всегда появляется позже, чем сообщение, 
ответом на которое он является. Вторая строка содержит текст сообщения.
Длина каждого из сообщений не превышает 100 символов.

Формат вывода

Выведите название темы, к которой относится наибольшее количество сообщений. 
Если таких тем несколько, то выведите первую в хронологическом порядке
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const [count, ...forum] = fileContent.toString().trim().split('\n');

const logger = fs.createWriteStream('output.txt', {
    flags: 'a'
})

function writeResult(result) {
    logger.write(result)
}

function getForumTitles(count, forum) {
    const copy = [...forum];
    const hashDialogs = [];
    let currentMessage = 1;

    for (let index = 0; index < copy.length; index++) {
        const element = copy[index];

        if (element === '0') {
            const removed = copy.splice(index, 3);

            hashDialogs.push(
                {
                    title: removed[1],
                    messages: {
                        [currentMessage]: removed[2]
                    },
                }
            );
            index--;
            currentMessage++;
        } else {
            const removedMessage = copy.splice(index, 2);

            for (const key in hashDialogs) {
                const element = hashDialogs[key];
                
                if (element.messages[removedMessage[0]]) {
                    element.messages[currentMessage] = removedMessage[1];
                }
            }

            index--;
            currentMessage++;
        }
        
    }

    hashDialogs.sort((a, b) => Object.keys(b.messages).length - Object.keys(a.messages).length)

    const ans = hashDialogs[0].title;
    writeResult(ans + '\n');
    logger.end();
}

getForumTitles(count, forum);