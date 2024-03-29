# Introduction

The idea of this repo is add the all automations that I used the zx lib.

## Getting Started

- install repo dependencies

```bash
  npm i
```

- run automations

```bash
  npx zx <path-to-automation>
```

## How to use the automations

### automated-pr-template

- this automation requires the gh-cli to be installed and configured

This automation is used to create a PR template for the github cli, and avoid some checks that is needed to be done manually.

This automation get the last issue that you is assgined ( you can provide the specific repository to get the last issue ) and create a PR template using the keyword of the issue without provide the description and another interaction.

To need to provide the keyword of related issue [see here the availble keywords](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/using-keywords-in-issues-and-pull-requests)

You also can provide a specific repository to get the assigned issues on GitHub ( if you don't provide the repository, it will get the last issue that of actual repository )

- always be assinged to an issue before run the automation

## concurrently repeat

- example of running `zx ~/Projects/zx-automations/concurrently-repeat.mjs <command> <times>`

### Example: show hi 5 times

 `zx ~/Projects/zx-automations/concurrently-repeat.mjs "echo hi" 5`

#### Examples

```bash
  npx zx automated-pr-template related
  npx zx automated-pr-template related https://github.com/edumaciel10/university-homeworks

```

## codeowners

- example of running `zx zx-automations/add-codeowners.mjs @edumaciel10`
- recomended run into root file of repos
- will search all repos that contain CODEOWNERS file and add the user to the file
- the CODEOWNERS file should follow this pattern

```bash
# AUTOMATIC REVIEWERS
* @edumaciel10 ...
```

## run into all repos

- example of running `zx-automations/run-on-all-repos.mjs`
- recomended run into root file of repos
- you can change the code to run any command using zx into all repos

## replace template and create file for each replace

- example of running `zx-automations/replace-and-create-file.mjs <target-folder-for-generated-templates> <template-file> <replace-values-separed-by-comma>`
zx replace-and-create-file.mjs ./templates ./template.md "Banco do Brasil  , Banco da Amazônia  , Banco do Nordeste do Brasil ,"
