#!/usr/bin/env zx
var pathPackage = require("path");

const paths = (await $`find . -maxdepth 3 -name ".git"`)
  .toString()
  .split("\n")
  .filter((value) => value !== "");

const pathsWithAbsolutePath = paths.map((path) => {
  const codeowners = fs.readFileSync(path, "utf8").split("\n")[1];
  const absolutePath = pathPackage.resolve(path)
  return { absolutePath, codeowners };
});

const repos = pathsWithAbsolutePath.map(async (codeowner) => {
  const response = await $`cd ${codeowner.absolutePath.replace(".git",'')} && git stash && git checkout main && git pull origin main `;
  return response;
});

Promise.all(repos).then((value) => value).catch((err) => err);