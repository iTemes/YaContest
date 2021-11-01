/* 
Дан текст. Выведите все слова, встречающиеся в тексте, по одному на каждую строку. 
Слова должны быть отсортированы по убыванию их количества появления в тексте, 
а при одинаковой частоте появления — в лексикографическом порядке. 
Указание. После того, как вы создадите словарь всех слов, вам захочется отсортировать его по частоте встречаемости слова. 
Желаемого можно добиться, если создать список, элементами которого будут кортежи из двух элементов: частота встречаемости слова и само слово. 
Например, [(2, 'hi'), (1, 'what'), (3, 'is')]. Тогда стандартная сортировка будет сортировать список кортежей, 
при этом кортежи сравниваются по первому элементу, а если они равны — то по второму. Это почти то, что требуется в задаче.
*/

/* Формат ввода
Текст
*/


/* Формат вывода
Выведите фамилии всех кандидатов в лексикографическом порядке, затем, через пробел, 
количество отданных за них голосов.

hi
hi
what is your name
my name is bond
james bond
my name is damme
van damme
claude van damme
jean claude van damme

------>
damme
is
name
van
bond
claude
hi
my
james
jean
what
your

*/


const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const text = fileContent.toString().trim().split('\n');

const logger = fs.createWriteStream('output.txt', {
    flags: 'a'
})

function writeResult(result) {
    logger.write(result)
}


function calcWords(text) {
    const hashWords = {};

    text.forEach((item) => {
        const words = item.split(' ');

        words.forEach(word => {
            if (!hashWords[word]) {
                hashWords[word] = 1;
            } else hashWords[word] += 1;
        })
       
    });

    const sortedWords = Object.keys(hashWords).sort((a, b) => {
        if (hashWords[a] !== hashWords[b]) {
            return  hashWords[b] - hashWords[a]
        } else  return a > b ? 1 : -1;
    });
    sortedWords.forEach(name => {
        writeResult(name + '\n');
    });
    logger.end();
}

calcWords(text);