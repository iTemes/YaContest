/* 
Дан список. Выведите те его элементы, которые встречаются в списке только один раз. 
Элементы нужно выводить в том порядке, в котором они встречаются в списке.
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const [biggestNum, ...guesses] = fileContent.toString().trim().split('\n');



function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}


function getGuessNum(biggestNum, guesses) {
    let no = new Set();
    let yes = [];

    for (let index = 1; index <= biggestNum; index++) {
        yes.push(index)
    }

    for (let index = 0; index < guesses.length; index += 2) {
        const element = guesses[index];
        if (element === 'HELP') break;

        const ansType = guesses[index + 1];
        const currentAnsSet = new Set(
            [...element.split(' ')]
            .map(Number)
        );
        

        if (ansType === 'YES') {
            yes = yes.filter(x => currentAnsSet.has(x));
        } else {
           for (let i of currentAnsSet) no.add(i);
        }
    }
    yes = yes
    .filter(v => !no.has(v))
    .sort((a, b) => a - b)
    .join(' ');

    writeResult(yes + '\n');
}

getGuessNum(biggestNum, guesses);
