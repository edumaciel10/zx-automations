#!/usr/bin/env zx

const fs = require('fs');
const path = require('path');

const [,,, inputFile, outputFile] = process.argv;

// Define input and output file paths
const inputFilePath = path.join(__dirname, inputFile);
const outputFilePath = path.join(__dirname, outputFile);

// Run command and write output to file
const output = await $`cat ${inputFilePath} | trans -brief -s pt -t en > ${outputFilePath}`;

console.log(`Markdown file ${inputFilePath} has been translated from Portuguese to English and saved to ${outputFilePath}`);
