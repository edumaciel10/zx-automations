#!/usr/bin/env zx
let targetFolder = process.argv[3];
let template = process.argv[4];

const templatesToReplace = process.argv[5]
  .split(",")
  .map((template) => template.trim());
console.log(templatesToReplace);
let templatePath = path.join(__dirname, template);
const templateContent = fs.readFileSync(templatePath, "utf8");

const removeRepeatedChar = (str, char) => {
  let newStr = str;
  while (newStr.indexOf(char + char) != -1) {
    newStr = newStr.replace(char + char, char);
  }
  return newStr;
};

templatesToReplace.forEach((templateToReplace) => {
  const templateContentToReplace = templateContent.replaceAll(
    "{{template}}",
    templateToReplace
  );
  const filename = templateToReplace
    .replaceAll(/[\.\/\-]/g, "")
    .toLowerCase();

  // remove repeated - from filename
  const filenameRemoveRepeated = ["-", "_",'.', " "].reduce((acc, curr) => {
    return removeRepeatedChar(acc, curr);
  }, filename).replace(/ /g, "-");

  fs.writeFileSync(`${targetFolder}/${filenameRemoveRepeated}.md`, templateContentToReplace);
});
