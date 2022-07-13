#!/usr/bin/env zx

const targetIssueId = process.argv[3] || '';
let body = JSON.parse((await $`gh issue view ${targetIssueId} --json body`).toString());

const issueIdToAppend = process.argv[4] || '';

let urlAndTitle = JSON.parse((await $`gh issue view ${issueIdToAppend} --json url,title`).toString());

const checklistFormat = `- [ ] ${urlAndTitle.title} (${urlAndTitle.url})`;

body.body+= `\n${checklistFormat}`;

const newIssueId = (await $`gh issue edit ${targetIssueId} --body ${body.body}`).toString();
