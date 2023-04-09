const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

const listTypes = ["int", "char", "text", "timestamp", "date"];
const noiseWords = ["primary", "unique", "index", "constraint", "foreign", "references", "engine", "character", "set", "collate"];

// Check if the line has a list type
const indexOfType = (line) => {
  const words = line.split(" ");
  for (let word of words) {
    if (noiseWords.includes(word)) return -1;
  }

  for (let type of listTypes) {
    if (line.includes(type)) return line.indexOf(type);
  }
  return -1;
};

module.exports.readSqlFile = async (filePath) => {
  const fileContent = await readFileAsync(filePath, "utf8");

  // Conponents are the tables
  const components = fileContent
    .toLocaleLowerCase()
    .trim()
    .split(";")
    .filter((component) => component.includes("create table"));

  const tables = [];

  components.forEach((component) => {
    //get table name
    let indexOfFirstReg = component.indexOf("(");
    let i = indexOfFirstReg;
    let tableName = "";

    while (tableName.length < 2 && i > 0) {
      if (component[i] == " ") {
        tableName = component.slice(i, indexOfFirstReg);
      }
      i--;
    }

    component = component.slice(indexOfFirstReg, -1);

    const columns = [];

    const lines = component.split(",");
    lines.forEach((line) => {
      const postType = indexOfType(line);
      if (postType != -1) {
        let lastSpace = 0;
        let firstPos = 0;
        let j = postType + 1;
        while (j > 0) {
          if (line[j] == " " && lastSpace == 0) {
            lastSpace = j;
          } else if (line[j] == " " && lastSpace > 0) {
            firstPos = j;
            break;
          }
          j--;
        }

        const column = {
          name: line.slice(firstPos, lastSpace).replace(/[`"]/g, "").trim(),
          type: "",
        };

        columns.push(column);
      }
    });

    tables.push({
      name: tableName
        .slice(tableName.indexOf(".") + 1, -1)
        .replace(/[`"]/g, "")
        .trim(),
      columns: columns,
    });
  });

  return tables;
};
