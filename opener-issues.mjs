#!/usr/bin/env zx
import 'zx/globals'

const issuesSeparatedByComma = process.argv[3];
const tag = process.argv[4];
const body = process.argv[5] ?? 'This issue was created automatically by the zx-automations/opener-issues.mjs script.';

const issuesTitle = issuesSeparatedByComma.split(',')

for(const issue of issuesTitle) {
  const issueTitle = issue.trim();
  const issueUrl = await $`gh issue create --title ${issueTitle} --label ${tag} --body ""`;
  console.log(chalk.green(issueUrl));
}