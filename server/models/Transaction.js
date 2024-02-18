const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionsSchema=new Schema({
    id : Number,
    title: String,
    price:Number,
    description:String,
    category:String,
    image:String,
    sold:Boolean,
    dateOfSale:String,
});

const Transactions=mongoose.model("Transactions",transactionsSchema);
module.exports=Transactions;