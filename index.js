console.log("Starting");

const path = require('path');
const fs = require('fs-extra');

const rootFolderPath = path.join(__dirname, 'root');
const destinationFolderPath = path.join(__dirname, 'destination');

// Step 1: Create the destination folder
fs.ensureDir(destinationFolderPath)
  .then(() => {
    console.log("Destination folder created successfully.");

    // Step 2: Read the folders in the "root" directory
    fs.readdir(rootFolderPath, (err, folders) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      // Step 3: Iterate over each folder in "root"
      folders.forEach((folder, index) => {
        const folderPath = path.join(rootFolderPath, folder);

        // Step 4: Read the files in the current folder
        fs.readdir(folderPath, (err, files) => {
          if (err) {
            console.error("Error reading directory:", err);
            return;
          }

          // Sorting files alphabetically
          files.sort();

          // Step 5: Copy files to corresponding folders in "destination" based on index
          files.forEach((file, fileIndex) => {
            const sourceFilePath = path.join(folderPath, file);
            const destinationFolder = path.join(destinationFolderPath, `folder_${fileIndex + 1}`);

            // Create folder if it doesn't exist
            fs.ensureDir(destinationFolder)
              .then(() => {
                const destinationFilePath = path.join(destinationFolder, file);
                fs.copyFile(sourceFilePath, destinationFilePath)
                  .then(() => {
                    console.log(`Copied ${file} to ${destinationFolder}`);
                  })
                  .catch(err => {
                    console.error(`Error copying ${file}:`, err);
                  });
              })
              .catch(err => {
                console.error(`Error creating folder ${destinationFolder}:`, err);
              });
          });
        });
      });
    });
  })
  .catch(err => {
    console.error("Error creating destination folder:", err);
  });
