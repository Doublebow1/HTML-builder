const fs = require("fs");
const path = require("path");

const srcFolder = path.join(__dirname, "styles");
const destFolder = path.join(__dirname, "project-dist");

function mergeFilesWithStreams(inputFiles, outputFile) {
	const writeStream = fs.createWriteStream(outputFile);
	inputFiles.forEach((file, index) => {
		const readStream = fs.createReadStream(file);
		readStream.pipe(writeStream, { end: false });
		readStream.on('end', () => {
			if (index === inputFiles.length - 1) {
				writeStream.end(); // End write sream after last file
				console.log(`The data has been successfully merged into the file: ${outputFile}`);
			}
		});
		readStream.on('error', (error) => {
				console.error(`Error reading file ${file}:`, error);
		});
	});
	writeStream.on('error', (error) => {
			console.error('Error writing to file:', error);
	});
}

function getCssFiles (source, destination, callback) {
	const outputFileName = path.join(destination, "bundle.css");
	fs.writeFile(outputFileName, "", (err) => {
		if (err) throw err;
		fs.readdir(source, (err, files) => {
			if (err) throw err;
			const filesToMerge = files
			.filter(file => file.endsWith('.css')) // Only CSS files
			.map(file => path.join(source, file));
			if (filesToMerge.length > 0) {
				mergeFilesWithStreams(filesToMerge, outputFileName);
				console.log(`Files merged to ${outputFileName}`);
			} else {
				console.log("No files to merge");
			}
		});
	});
}

getCssFiles (srcFolder, destFolder, (err) => {
	if (err) {
		console.error(`Error with copying files: ${err}`);
	} else {
		console.log('All files copyed sucessfully!');
	}
});