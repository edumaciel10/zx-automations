import { $, fs } from 'zx';

async function compareFolders(sourceFolder, destinationFolder) {
  const sourceFiles = await fs.readdir(sourceFolder);
  const destinationFiles = await fs.readdir(destinationFolder);

  const missingFiles = sourceFiles.filter(file => !destinationFiles.includes(file));

  for (const file of missingFiles) {
    console.log(file);
  }
}

// Extract command-line arguments
const [,, ,sourceFolder, destinationFolder] = process.argv;


console.log(`Comparing ${sourceFolder} with ${destinationFolder}`)
compareFolders(sourceFolder, destinationFolder);
