const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req,res) => {
    res.send("Travel Trip API is running");
});

const PORT = process.env.PORT || 5000;


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
});