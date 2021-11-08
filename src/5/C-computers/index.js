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
  const [groupCount, cabinetCount] = groupsOptions.split(" ");
  console.log("Count in group", students);
  console.log("Computers in cabinet", computers);
  console.log("groupCount", groupCount);
  console.log("cabinetCount", cabinetCount);

  const prefixGroups = new Array(+groupCount).fill(0);
  let remainder = 0;

  for (let i = 0; i < groupCount.length; i++) {
    if (+computers >= +students + 1) {
      console.log("хватает на стундентов и преподавателя");
      prefixGroups[i] = 1;
      console.log("%", +computers / (+students + 1));
    } else prefixGroups[i] = 0;
  }
  console.log("prefix", prefixGroups);

  logger.end();
}

getGroupsComputers(groupsOptions, students, computers);
