#!/usr/bin/env zx

import { argv, fs } from 'zx';

let limit = argv.limit ?? 1000; 

let body = JSON.parse((await $`gh pr list --limit ${limit} --json createdAt,closedAt,author --state closed -S '-author:app/dependabot'`).toString());

// if you need make a test, uncomment the lines below and comment the line above
// const raw = fs.readFileSync('../zx-automations/test.json', 'utf8'); 
// const body = JSON.parse(raw);

const averageTime = body.reduce((acc, curr) => {
  const time = new Date(curr.closedAt) - new Date(curr.createdAt);
  return acc + time;
}, 0) / body.length;

const averageTimeInMinutes = averageTime / 1000 / 60;
console.log(`Average time to close a PR: ${averageTimeInMinutes.toFixed(2)}mins`);

// console.dir({body}, {depth: null, colors: true});