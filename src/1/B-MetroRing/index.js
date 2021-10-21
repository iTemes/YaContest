/* 
Витя работает недалеко от одной из станций кольцевой линии Московского метро, а живет рядом с другой станцией той же линии. 
Требуется выяснить, мимо какого наименьшего количества промежуточных станций необходимо проехать Вите по кольцу, чтобы добраться 
с работы домой. 
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");

let [stations, startStation, endStation] = fileContent.toString().split(' ');

stations = Number(stations);
startStation = Number(startStation);
endStation = Number(endStation);


function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}


function getMinStationsPath(stations, startStation, endStation) {
    const straightPath = Math.abs(endStation - startStation) - 1;
    const reversStationscount = stations - 2 - straightPath;
    let result = Math.min(straightPath, reversStationscount);

    writeResult(result);
}

getMinStationsPath(stations, startStation, endStation);
