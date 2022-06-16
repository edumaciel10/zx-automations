#!/usr/bin/env zx

let tag = process?.argv[3] ?? '';
let url = process?.argv[4] ?? JSON.parse((await $`gh repo view --json url`).toString()).url; 

let gpIssueListAssign = (await $`gh issue list -a "@me" -R ${url}`)
                          .toString()
                          .split('\n')
                          .map(line => line.split('\t'));

let idOfLastIssueAssigned = gpIssueListAssign[0][0];

await $`git push -u origin HEAD` // to not require interective on gh pr create 
let prBody = `${tag}: ${url}/issues/${idOfLastIssueAssigned}`;

let prLink = (await $`gh pr create --fill --body ${prBody}`).toString();
await $`xdg-open ${prLink}`; // open in browser to review