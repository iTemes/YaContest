/* 
На координатной плоскости расположены равнобедренный прямоугольный треугольник ABC 
с длиной катета d и точка X. Катеты треугольника лежат на осях координат,
 а вершины расположены в точках: A (0,0), B (d,0), C (0,d).

Напишите программу, которая определяет взаимное расположение точки X и треугольника. 
Если точка X расположена внутри или на сторонах треугольника, выведите 0. 
Если же точка находится вне треугольника, выведите номер ближайшей к ней вершины.
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");

let [catetLenght, coords] = fileContent.toString().replace(/\r\n/g,'\n').split('\n');

catetLenght = Number(catetLenght);
coords = coords.trim().split(' ').map(item => Number(item));



function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}


function getSchoolCoords(d, coords) {
    const [Px, Py] = coords;

    if (Px >=0 && Py >=0 && Px + Py <= d) {
        writeResult(0);
    } else {
        const dists = [
            {
                point: 1,
                dist:(Px ** 2 + Py ** 2)
            }, 
            {
                point: 2,
                dist: ((Px - d) ** 2 + Py ** 2)
            }, 
            {
                point: 3,
                dist: (Px ** 2 + (Py - d) ** 2)
            }
        ];
        console.log('dist', dists);

        const minDist = dists.reduce((acc, item) => {
            if (!Object.keys(acc).length) {
                return item;
            }

            if (item.dist < acc.dist) {
                return item;
            }

            return acc;
        }, {})
        
        writeResult(minDist.point);
    }
}

getSchoolCoords(catetLenght, coords);
