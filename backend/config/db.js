const mongooese = require("mongoose");


const connectDB = async () => {

    try {
        await mongooese.connect(process.env.MONGO_URI);
        console.log("MongODB Connected SuccessFully")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;