/*
Формат ввода

На первой строке входного файла расположены числа N и M (1 ≤ N ≤ M ≤ 1000). На второй строке расположено N чисел 
— X1, …, XN (1 ≤ Xi ≤ 1000 для всех 1 ≤ i ≤ N). На третьей строке расположено M чисел Y1, ..., 
YM (1 ≤ Yi ≤ 1000 для всех 1 ≤ i ≤ M).
Формат вывода

Выведите на первой строке число P - количество групп, которые удастся распределить по аудиториям. 
На второй строке выведите распределение групп по аудиториям – N чисел, i-е число должно 
соответствовать номеру аудитории, в которой должна заниматься i-я группа. 
(Нумерация как групп, так и аудиторий, начинается с 1). 
Если i-я группа осталась без аудитории, i-е число должно быть равно 0. 
Если допустимых распределений несколько, выведите любое из них.
*/

const fs = require("fs");
const fileContent = fs.readFileSync("input.txt", "utf8");
const logger = fs.createWriteStream("output.txt", {
  flags: "a",
});
const [groupsOptions, students, computers] = fileContent
  .toString()
  .trim()
  .split("\n");

function writeResult(result) {
  logger.write(result);
}

function getGroupsComputers(groupsOptions, students, computers) {
  const [groupCount, cabinetCount] = groupsOptions.split(" ").map(Number);
  const sortedStudents = students
    .split(' ')
    .map(item => Number(item) + 1) // добавляем учителя
    .sort((a, b) => a - b);

  const sortedComputers = computers
    .split(' ')
    .map((item, idx) => ({count: Number(item), order: idx + 1}))
    .sort((a, b) => a.count - b.count);

  let currentCabinet = 0;
  let ansGroups = new Array(groupCount).fill(0);
  let ansCabinets = 0;
  console.log("Отсортированные группы", sortedStudents);
  console.log("Отсортированные аудитории", sortedComputers);

  for (let i = 0; i < sortedStudents.length; i++) {
    while (currentCabinet <= sortedComputers.length - 1 && sortedStudents[i] > sortedComputers[currentCabinet].count) {
      console.log('Попали в цикл');
      console.log('sortedStudents[i]', sortedStudents[i], '<=');
      console.log('currentCabinet', sortedComputers[currentCabinet].count);
      currentCabinet++;
    }

    if (currentCabinet > sortedComputers.length - 1) {
      break;
    }

    ansGroups[i] = sortedComputers[currentCabinet].order;
    console.log('Добавили в - ', currentCabinet, sortedComputers[currentCabinet].order);
    console.log('________________________');
    currentCabinet++;
    ansCabinets++;

  }
  console.log('ansCabinets', ansCabinets);
  console.log('ansGroups', ansGroups);

  writeResult(ansCabinets + '\n');
  writeResult(ansGroups.join(' ') + '\n');
  logger.end();
}

getGroupsComputers(groupsOptions, students, computers);
