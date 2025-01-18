const fs = require("fs");
const path = require("path");

const stream = fs.createReadStream(
	path.join(__dirname, "text.txt"), 
	"utf-8",
)

stream.on("data", (chunk) => console.log(chunk));
stream.on("data", (chunk) => console.log(`${chunk.length} - this is the number of chunks in current stream`));
stream.on("error", (error) => console.log("Error", error.message));