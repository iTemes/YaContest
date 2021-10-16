const fs = require("fs");

const fileContent = fs.readFileSync("input.txt", "utf8");
let [benchOptions, legsCoords] = fileContent
  .toString()
  .trim()
  .replace(/\r\n/g, "\n")
  .split("\n");

const [benchLengs, legsCount] = benchOptions.split(" ");
legsCoords = legsCoords
  .trim()
  .split(" ")
  .map((item) => Number(item));

function writeResult(result) {
  fs.truncateSync("output.txt"); // Clean file
  fs.writeFileSync("output.txt", result.toString(), (err) => {
    if (err) throw err;
    console.log("Result has been added!");
  });
}

function calcBenchLegs(benchLengs, legsCoords, legsCount) {
  const mediumLength = Math.round(benchLengs / 2);
  const mediumElement = mediumLength - 1;

  console.log("mediumLength", mediumLength);
  console.log("mediumElement", mediumElement);
  console.log("@@@test-", benchLengs / 2);

  let leftPointer;
  let rightPointer;

  for (let i = 0; i < legsCoords.length; i++) {
    if (benchLengs % 2 && legsCoords[i] === mediumElement) {
      writeResult(mediumElement.toString() + "\n");
      return mediumElement;
    }
    if (legsCoords[i] < mediumLength) {
      leftPointer = legsCoords[i];
    } else {
      rightPointer = legsCoords[i];
      break;
    }
  }

  const result = [];

  if (leftPointer >= 0) {
    result.push(leftPointer);
  }
  rightPointer && result.push(rightPointer);

  const strResult = result.join(" ") + "\n";

  writeResult(strResult);
}

calcBenchLegs(benchLengs, legsCoords, legsCount);
