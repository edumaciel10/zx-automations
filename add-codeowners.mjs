#!/usr/bin/env zx
import open from 'open';

const newCodeOwner = process.argv[3] || "";

var pathPackage = require("path");

const paths = (await $`find . -maxdepth 3 -name "CODEOWNERS"`)
  .toString()
  .split("\n")
  .filter((value) => value !== "");

const codeowners = paths.map((path) => {
  const codeowners = fs.readFileSync(path, "utf8").split("\n")[1];
  const absolutePath = pathPackage.resolve(path)
  return { absolutePath, codeowners };
});

const newCodeowners = codeowners.map((codeowner) => {
  const newCodeowners = codeowner.codeowners + ` ${newCodeOwner}`;

  return { ...codeowner, newCodeowners };
});

const prs = await newCodeowners.map(async (codeowner) => {
  const codeownersFile = await fs.readFileSync(codeowner.absolutePath, "utf8").split("\n");
  codeownersFile[1] = codeowner.newCodeowners;
  fs.writeFileSync(codeowner.absolutePath, codeownersFile.join("\n"));

  const branchName = "chore/add-codeowners";
  const commitName = `chore(add-codeowners): add ${newCodeOwner} to CODEOWNERS`;

  const response = await $`cd ${codeowner.absolutePath.replace("CODEOWNERS",'')} && git checkout -b ${branchName} && git add . && git commit -m ${commitName} -n && git push -u origin HEAD && gh pr create --fill --body ''`;
  let prLinkRegex = /https:\/\/github.com\/[^\/]+\/[^\/]+\/pull\/\d+/;
  let prLinkMatch = response.match(prLinkRegex);
  return prLinkMatch
});

Promise.all(prs).then((value) => value).catch((err) => err);

// prs.forEach(async (pr) => {
//   console.log({pr})
// });
