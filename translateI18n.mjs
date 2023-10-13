// Define the path to your JSON file and the new value to replace the placeholder string
const [, , , inputFile] = process.argv;

import { fs } from "zx";
const filePath = path.resolve(inputFile);

const originalLanguage =
  filePath.split("/").pop().split(".")[0] === "pt-BR" ? "pt" : "es";

const filePaths = [
  filePath,
  originalLanguage === "pt"
    ? filePath.replace("pt-BR.json", "es.json")
    : filePath.replace("es.json", "pt-BR.json"),
];
// read the JSON file

for (const inputFilePath of filePaths) {
  const actualLanguage =
    inputFilePath.split("/").pop().split(".")[0] === "pt-BR" ? "pt" : "es";

  const json = await fs.readFile(inputFilePath, "utf8");

  const parsedData = JSON.parse(json);

  let stringsToParse = [];

  for (const key in parsedData) {
    // Check if the value of the key is the placeholder string
    if (parsedData[key] === "__STRING_NOT_TRANSLATED__") {
      stringsToParse.push({
        [key]: parsedData[key],
      });
    }
  }

  const promiseParseString = stringsToParse.map(async (value, key) => {
    const string = Object.keys(value)[0];
    const translatedString = (
      await $`trans -brief -s en -t ${actualLanguage} ${string} -no-auto -no-warn`
    )
      .toString()
      .trim()
      .replace(`\n`, "");

    console.log({ string, translatedString });
    return { [string]: translatedString };
  });

  const translatedStringsParsed = await Promise.all(promiseParseString)
    .then((value) => value)
    .catch((err) => err);

  console.log({ translatedStringsParsed });

  const mappedObject = Object.fromEntries(
    Object.entries(parsedData).map(([key, value]) => {
      const translatedString = translatedStringsParsed.find(
        (string) => string[key]
      );
      if (translatedString) {
        return [key, translatedString[key]];
      }
      return [key, value];
    })
  );

  // write into the JSON file

  await fs.writeFile(inputFilePath, JSON.stringify(mappedObject, null, 2));
}
