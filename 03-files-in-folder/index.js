const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "secret-folder");

fs.readdir(folderPath, (err, files) => {
	if (err) throw err;
	files.forEach(file => {
		const filePath = path.join(folderPath, file);
		const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
		const fileExtName = path.extname(filePath);
		fs.stat(filePath, (err, stats) => {
			if (err) {
				console.error('Error reading file:', err);
				return;
			}
			console.log(`${fileNameWithoutExt} - ${fileExtName.slice(1)} - ${stats.size}kb`);
		});
	});
});