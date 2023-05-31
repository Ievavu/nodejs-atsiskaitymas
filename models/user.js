const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id: { type: String, required: true, min: 8 },
    name: { type: String, required: true, min: 2 },
    email: { type: String, required: true, min: 8 },
    password: { type: String, required: true, min: 6 },
    bought_tickets: { type: Array, required: false },
    money_balance: { type: Number, required: true },
});

module.exports = mongoose.model("User", userSchema);