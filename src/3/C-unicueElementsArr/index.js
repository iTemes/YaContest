/* 
Дан список. Выведите те его элементы, которые встречаются в списке только один раз. 
Элементы нужно выводить в том порядке, в котором они встречаются в списке.
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const nums = fileContent.toString().trim().replace(/\r\n/g,'\n').split(' ');



function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}


function unicueElements(nums) {
    let ans = '';
    const objHash = {};

    nums.forEach(item => {
        if (objHash.hasOwnProperty(`item-${item}`)) {
            const oldValue = objHash[`item-${item}`];
            objHash[`item-${item}`] = oldValue + 1;
        } else {
            objHash[`item-${item}`] = 1; 
        }
    });

    ans = Object.entries(objHash).reduce((acc, [key, value]) => {
        value === 1 && (acc +=  +/\d+/.exec(key) + ' ');
        return acc;
    }, '');

    writeResult(ans + '\n');
}

unicueElements(nums);
