#!/usr/bin/env zx
var pathPackage = require("path");
import 'zx/globals'

const paths = (await $`find . -maxdepth 3 -name ".git"`)
  .toString()
  .split("\n")
  .filter((value) => value !== "");

const pathsWithAbsolutePath = paths.map((path) => {
  const absolutePath = pathPackage.resolve(path)
  return { absolutePath, path };
});

const repos = pathsWithAbsolutePath.map(async (path) => {
  const commandToRun = `pwd`;

  cd(path.absolutePath.replace(".git",''));

  const response = await $([commandToRun]);
  return response;
});

Promise.all(repos).then((value) => value).catch((err) => err);