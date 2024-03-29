#!/usr/bin/env zx
var pathPackage = require("path");
import 'zx/globals'

const tag = process.argv[3];

const issues = await JSON.parse( await ($`gh issue list --label "${tag}" --json title,url --limit 100`));

const issuesAsChecklist = issues.map((issue) => {
  const checklistRow = `- [ ] ${issue.title} ${issue.url}`;
  console.log(chalk.green(checklistRow));
  return checklistRow;
});

// console.log(...issuesAsChecklist);