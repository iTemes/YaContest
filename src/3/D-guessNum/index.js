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

function getEqualCount(values) {
    const [arr1, arr2] = values;
    const objHash = {}    
    let ans = [];

    if (arr2.length) {
        arr1.forEach(element => {
            objHash[element] = element;
        });
    
        arr2.forEach(item => !objHash.hasOwnProperty(item) && ans.push(item));
    } else ans = new Set(...arr1);

    return ans = [...ans];
}


function getGuessNum(biggestNum, guesses) {
    const answers = {
        'NO': [],
        'YES': [],
    }

    for (let index = 0; index < guesses.length; index += 2) {
        const element = guesses[index];
        if (element === 'HELP') break;
        console.log('element', element);
        answers[guesses[index + 1]].push(...element.split(' '));
    }

    console.log('answers', answers);
    const ans = getEqualCount(Object.values(answers)).join(' ');

    console.log('####ans', ans);
    writeResult(ans + '\n');
}

getGuessNum(biggestNum, guesses);
