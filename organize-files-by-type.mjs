#!/usr/bin/env zx
let targetFolder = process.argv[3];
let files = (await $`ls ${targetFolder}`).toString().split("\n");

let extensions = files.map((file) => file.split(".")[1])
  .filter(extensions => !!extensions)
  // remove duplicates
  .reduce((acc, curr) => {
    if (acc.indexOf(curr) === -1) {
      acc.push(curr);
    }
    return acc;
  },[]);

// linux terminal get folders name with ls
let folders = (await $`cd ${targetFolder} && ls -d  */`).toString().split("\n");

let extensionsWithFolders = folders.map((folder) => folder.split("/")[0])
  .filter(foldersName => extensions.indexOf(foldersName) != -1)

if(extensionsWithFolders.length > 0) {
  extensionsWithFolders.forEach(extension => {
    let filesWithExtension = files.filter(file => file.split(".")[1] === extension);
    if(filesWithExtension.length > 0) {
      filesWithExtension.forEach(file => {
        console.log(`mv ${targetFolder}/${file} ${targetFolder}/${extension}`);
        $`mv ${targetFolder}/${file} ${targetFolder}/${extension}`;
      });
    }
  });
}

let extensionsWithoutFolders = extensions.filter(extension => extensionsWithFolders.indexOf(extension) == -1)

extensionsWithoutFolders.map(async extension => {
  let folder = await $`cd ${targetFolder} && mkdir ${extension}`;
  let filesWithExtension = files.filter(file => file.split(".")[1] == extension);
  filesWithExtension.map(async file => {
    let fileName = file.split(".")[0];
    let filePath = `${targetFolder}/${file}`;
    let newFilePath = `${targetFolder}/${extension}/${fileName}.${extension}`;
    console.log(`mv ${filePath} ${newFilePath}`);

    await $`mv ${filePath} ${newFilePath}`;
  });
});