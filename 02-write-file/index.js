const { stdin } = process;
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "note.txt");

fs.writeFile(filePath, "",	(err) => {
	if (err) throw err;
});

console.log("Enter your message: ");
const output = fs.createWriteStream(filePath);
stdin.on("data", (data) => {
	const input = data.toString().trim(); 
	if (input.toLowerCase() === "exit") {
		exitFunction();
	} else {
		output.write(data)
	}
});

process.on('SIGINT', () => {
	exitFunction();
});

const exitFunction = () => {
	console.log('Thank you for writing');
	process.exit();
}