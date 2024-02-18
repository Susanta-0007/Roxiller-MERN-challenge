const { default: axios } = require("axios");
const mongoose = require("mongoose");
const Transactions = require("../models/Transaction");
const MONGO_URL = "mongodb://localhost:27017/mern-project";
const API = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("DB connected");

        const response = await axios.get(API);
        console.log('Response:', response.data);
        const data = response.data;

        await Transactions.deleteMany({});
        await Transactions.insertMany(data);
        console.log("DB initialized");
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect(); 
    }
}

main();
