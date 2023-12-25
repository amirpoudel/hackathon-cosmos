const mongoose = require('mongoose');

const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;


const connectionURL = process.env.MONGODB_URL;
const mongodbConection = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(connectionURL);

        console.log("mongodb connected");
        console.log(connectionInstance.connection.host);
    } catch (error) {
        console.log(error);
       // console.log(connectionURL)
        // Debugging output
console.log('MONGODB_USERNAME:', MONGODB_USERNAME);
console.log('MONGODB_PASSWORD:', MONGODB_PASSWORD);
        


        process.exit(1);
    }
}


module.exports = mongodbConection;