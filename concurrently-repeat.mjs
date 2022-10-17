#!/usr/bin/env zx

import { $ } from "zx";
const command = process.argv[3];

const times = parseInt(process.argv[4]) || 1;

const commands = new Array(times).fill(command);

await $`concurrently ${commands}`
