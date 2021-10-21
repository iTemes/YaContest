/* 
Как известно, два наиболее распространённых формата записи даты — это европейский (сначала день, потом месяц, потом год) и американски 
(сначала месяц, потом день, потом год). Системный администратор поменял дату на одном из бэкапов и сейчас хочет вернуть дату обратно. 
Но он не проверил, в каком формате дата используется в системе. Может ли он обойтись без этой информации?
Иначе говоря, вам даётся запись некоторой корректной даты. Требуется выяснить, однозначно ли по этой записи определяется дата даже без 
дополнительной информации о формате.
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");

let [x, y, z] = fileContent.toString().split(' ');

x = Number(x);
y = Number(y);
z = Number(z);


function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}


function getCurrentDateFormat(x, y, z) {
    if (x > 12 || y > 12 || x == y) {
        writeResult(1);
    } else writeResult(0);

}

getCurrentDateFormat(x, y, z);
