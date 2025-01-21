const fs = require("fs");
const path = require("path");

function copyFiles(srcDir, destDir, callback) {
   fs.mkdir(destDir, { recursive: true }, (err) => {
      if (err) return callback(err);
      fs.readdir(destDir, (err, destFiles) => {
         if (err) return callback(err);
         fs.readdir(srcDir, (err, srcFiles) => {
            if (err) return callback(err);
            const srcFileSet = new Set(srcFiles);
            const deleteTasks = destFiles
               .filter((file) => !srcFileSet.has(file))
               .map((file) => {
               return new Promise((resolve, reject) => {
                  fs.rm(path.join(destDir, file), { recursive: true, force: true }, (err) => {
                     if (err) reject(err);
                     else resolve();
                  });
               });
            });
         Promise.all(deleteTasks)
            .then(() => {
            let pending = srcFiles.length;
            if (!pending) return callback(null);
            srcFiles.forEach((file) => {
               const srcFile = path.join(srcDir, file);
               const destFile = path.join(destDir, file);
            fs.stat(srcFile, (err, stats) => {
               if (err) return callback(err);
               if (stats.isDirectory()) {
                  copyFiles(srcFile, destFile, (err) => {
                     if (err) return callback(err);
                     pending -= 1;
                     if (!pending) callback(null);
                  });
               } else {
                  fs.copyFile(srcFile, destFile, (err) => {
                     if (err) return callback(err);
                     pending -= 1;
                     if (!pending) callback(null);
                  });
                  }
               });
            });
         })
         .catch(callback);
      });
      });
	});
}

const sourceFolder = path.join(__dirname, "files");
const destinationFolder = path.join(__dirname, "files-copy");

copyFiles(sourceFolder, destinationFolder, (err) => {
	if (err) {
		console.error("Error copying files:", err);
	} else {
		console.log("All files copied successfully!");
	}
});