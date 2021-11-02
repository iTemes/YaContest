/*
Статья 83 закона “О выборах депутатов Государственной Думы Федерального Собрания Российской Федерации” определяет 
следующий алгоритм пропорционального распределения мест в парламенте.

Необходимо распределить 450 мест между партиями, участвовавших в выборах. Сначала подсчитывается сумма голосов избирателей, 
поданных за каждую партию и подсчитывается сумма голосов, поданных за все партии. Эта сумма делится на 450, получается величина, 
называемая “первое избирательное частное” 
(смысл первого избирательного частного - это количество голосов избирателей, которое необходимо набрать для получения одного места в парламенте).

Далее каждая партия получает столько мест в парламенте, чему равна целая часть от деления числа голосов 
за данную партию на первое избирательное частное.

Если после первого раунда распределения мест сумма количества мест, отданных партиям, меньше 450, то оставшиеся места 
передаются по одному партиям, в порядке убывания дробной части частного от деления числа голосов за данную партию 
на первое избирательное частное. Если же для двух партий эти дробные части равны, то преимущество отдается той партии, 
которая получила большее число голосов.
*/

/* 
Формат ввода
На вход программе подается список партий, участвовавших в выборах. Каждая строка входного файла 
содержит название партии (строка, возможно, содержащая пробелы), затем, через пробел, количество голосов, 
полученных данной партией – число, не превосходящее 108.


Формат вывода
Программа должна вывести названия всех партий и количество голосов в парламенте, полученных данной партией. 
Названия необходимо выводить в том же порядке, в котором они шли во входных данных.
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const seats = fileContent.toString().trim().split('\n');

const logger = fs.createWriteStream('output.txt', {
    flags: 'a'
})

function writeResult(result) {
    logger.write(result)
}

function distributionOfSeats(seats) {
    const partyObjects = [];
    const votesAmount = 450;
    let votesCount = 0;
    let votesAmountInUse = 0;
    let firstElectoralQuotient = 0;
    
    seats.forEach(seat => {
        let party = seat.split(' ');
        const partyVotesCount = party.pop();
        party = party.join(' ');

        votesCount += +partyVotesCount;
        partyObjects.push({
            party,
            votes: +partyVotesCount,
            seats: 0,
        })
    });
    firstElectoralQuotient = votesCount / votesAmount;

    partyObjects.forEach(party => {
        party.seats = Math.floor(party.votes / firstElectoralQuotient);
        party.quotient = (party.votes / firstElectoralQuotient) - party.seats;
        votesAmountInUse += party.seats;
    });

    partySorted = [...partyObjects].sort((a , b) => {
        return a.quotient === b.quotient ? b.votes - a.votes : b.quotient - a.quotient;
    });

    let votesForOthers = votesAmount - votesAmountInUse;
    for (let index = 0; votesForOthers > 0; index++) {
        partySorted[index].seats += 1;  
        votesForOthers--; 
    }

    partyObjects.forEach(finalItem => writeResult(finalItem.party + ' ' + finalItem.seats + '\n'))
   
    logger.end();
}

distributionOfSeats(seats);