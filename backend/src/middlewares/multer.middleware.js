
const multer = require("multer");
const fs = require("fs");
const path = require("path");


// Function to ensure the destination directory exists
const ensureDestinationDirectory = (destination) => {
    const directory = path.dirname(destination);
    if (!fs.existsSync(directory)) {
        console.log(`Creating directory: ${directory}`);
        fs.mkdirSync(directory, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = "./public/temp/images/"; // Relative path for demonstration
        ensureDestinationDirectory(destinationPath);
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


const upload = multer({
    storage: storage,
})

module.exports = upload;
