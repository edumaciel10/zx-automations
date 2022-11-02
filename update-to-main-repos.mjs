#!/usr/bin/env zx
const paths = (await $`find . -maxdepth 3 -name ".git"`)
  .toString()
  .split("\n")
  .filter((value) => value !== "");

const updatedMessage = paths.map(async (path) => {
  const openAndUpdate = await $`cd ${path.replace('.git','')} && git stash && git checkout main && git pull`;
  return [
    path,
    openAndUpdate
  ];
});

const resolve = await Promise.all(updatedMessage).then((value) => value).catch((err) => err);