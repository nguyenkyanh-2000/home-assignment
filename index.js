const fs = require("fs");
const { mergeTimeStamps } = require("./timestamps");

const jsonData = fs.readFileSync("data.json", "utf8");
const input = JSON.parse(jsonData);

const mergedTimestamps = mergeTimeStamps(input);
console.log(mergedTimestamps);
