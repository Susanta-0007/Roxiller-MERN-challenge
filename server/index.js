const express = require("express");
const mongoose = require("mongoose");
const Transactions = require("./models/Transaction"); 
const Transaction = require("./models/Transaction");

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
app.get("/statistics/:year/:month", async (req, res) => {
  try {
    const { year, month } = req.params;

    const stats = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $toInt: { $substr: ["$dateOfSale", 0, 4] }}, parseInt(year)] }, 
              { $eq: [{ $toInt: { $substr: ["$dateOfSale", 5, 2] }}, parseInt(month)] } 
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
          totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          totalNotSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } }
        }
      }
    ]);

    if (stats.length === 0) {
      
      return res.status(404).json({ message: "No transactions found for the selected month" });
    }

    // Extracting the statistics from the first element of the array
    const { totalSaleAmount, totalSoldItems, totalNotSoldItems } = stats[0];
    
    // Sending the statistics as response
    res.json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});




