/* 
На Новом проспекте построили подряд 10 зданий. Каждое здание может быть либо жилым домом, 
либо магазином, либо офисным зданием.

Но оказалось, что жителям некоторых домов на Новом проспекте слишком далеко приходится идти 
до ближайшего магазина. 
Для разработки плана развития общественного транспорта на Новом проспекте мэр города попросил 
вас выяснить, какое же наибольшее 
расстояние приходится преодолевать жителям Нового проспекта, чтобы дойти от своего дома до ближайшего 
магазина.
//  1 - жилой дом
//  2 - магазин
// 0 - офис

Формат ввода - 2 0 1 1 0 1 0 2 1 2

Вывод - число максимального расстояния от дома до магазина

Пример
 Ввод: 2 0 1 1 0 1 0 2 1 2

 Вывод: 3

 Ввод: 0 0 1 2 0 0 2 0 1 1

 Вывод: 3
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
let buildings = fileContent.toString().split(' ');

buildings = buildings.map(item => Number(item));


function writeResult(result) {
    fs.truncateSync('output.txt'); // Clean file
    fs.writeFileSync('output.txt', result.toString(), (err) => {
        if(err) throw err;
        console.log('Result has been added!');
    }); 
}

// мое решение
function getMaxLengthToShop(buildings) {
    const maxLengths = [];
    const shopPos = [];

    for (let i = 0; i < buildings.length; i++) {
        if (buildings[i] === 2) {
            shopPos.push(i);
        }
    }

    for (let i = 0; i < buildings.length; i++) {
        if (buildings[i] === 1) {
            const minLengthToShop = [];

            for (let j = 0; j < shopPos.length; j++) {
                minLengthToShop.push(Math.abs(i - shopPos[j]))
            }

            maxLengths.push(Math.min.apply(null, minLengthToShop));
        }
    }

    const result = Math.max.apply(null, maxLengths);
    writeResult(result);
}

function getMaxLengthToShopYa(buildings) {
    const leftShop = new Array(10).fill(0);
    let shopPos = -20;

    for (let i = 0; i < buildings.length; i++) {
        if (buildings[i] === 2) {
            shopPos = i;
        }

        if (buildings[i] === 1) {
            leftShop[i] = i - shopPos;
        }
    }

    let result = 0;
    shopPos = 20;

    for (let i = buildings.length - 1; i >= 0; i--) {
        if (buildings[i] === 2) {
            shopPos = i;
        }

        if (buildings[i] === 1) {
           const minDist = Math.min(shopPos - i, leftShop[i]);
           result = Math.max(result, minDist);
        }
        
    }
    writeResult(result);
}

// getMaxLengthToShop(buildings);
getMaxLengthToShopYa(buildings);
