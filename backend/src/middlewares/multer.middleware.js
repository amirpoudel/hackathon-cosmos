
const multer = require("multer");
const fs = require("fs");
const path = require("path");


// Function to ensure the destination directory exists
const ensureDestinationDirectory = (destination) => {

    if (!fs.existsSync(destination)) {
        console.log(`Creating directory: ${destination}`);
        fs.mkdirSync(destination, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = "./public/temp/images"; // Relative path for demonstration
        ensureDestinationDirectory(destinationPath);
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueFilename = `${file.originalname}_${Date.now()}`;
        cb(null, uniqueFilename);
    },
});


const upload = multer({
    storage: storage,
})

module.exports = upload;
