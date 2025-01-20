const fs = require("fs");
const path = require("path");

function copyFiles(srcDir, destDir, callback) {
	fs.mkdir(destDir, { recursive: true }, (err) => {
		if (err) return callback(err);
		fs.readdir(srcDir, (err, files) => {
			if (err) return callback(err);
			let pending = files.length;
			if (!pending) return callback(null);
			files.forEach((file) => {
				const srcFile = path.join(srcDir, file);
				const destFile = path.join(destDir, file);
				fs.copyFile(srcFile, destFile, (err) => {
					if (err) return callback(err);
					pending -= 1;
					if (!pending) callback(null);
				});
			});
		});
	});
}

const sourceFolder = path.join(__dirname, "files");
const destinationFolder = path.join(__dirname, "files-copy");

copyFiles(sourceFolder, destinationFolder, (err) => {
	if (err) {
		console.error('Error copying files:', err);
	} else {
		console.log('All files copied successfully!');
	}
});