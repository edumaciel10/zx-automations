#!/usr/bin/env zx
var pathPackage = require("path");
import 'zx/globals'

const paths = (await $`find . -maxdepth 3 -name ".git"`)
  .toString()
  .split("\n")
  .filter((value) => value !== "")
  .filter((value) => !value.includes("zx"))

const pathsWithAbsolutePath = paths.map((path) => {
  const absolutePath = pathPackage.resolve(path)
  return { absolutePath, path };
});

const repos = pathsWithAbsolutePath.map(async (path) => {
  const processArgs = process.argv.slice(3);
  const commandToRun = processArgs?.length > 0 ? processArgs.join(' ') : `pwd`;

  cd(path.absolutePath.replace(".git",''));

  const response = $([commandToRun]);
  return response;
});

Promise.all(repos).then((value) => value).catch((err) => err);