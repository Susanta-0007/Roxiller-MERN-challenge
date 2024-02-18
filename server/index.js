const express = require("express");
const mongoose = require("mongoose");
const Transactions = require("./models/Transaction"); 

const app = express();
const PORT = 8000;
const MONGO_URL = "mongodb://localhost:27017/mern-project";

// Middleware to enable CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); 
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

main()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log("Server Running at PORT:8000");
    });
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// API Routes

app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transactions.find(); 
    res.json(transactions); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


