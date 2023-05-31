const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    id: { type: String, required: true, min: 8 },
    title: { type: String, required: true, min: 4 },
    ticket_price: { type: Number, required: true },
    from_location: { type: String, required: true, min: 4 },
    to_location: { type: String, required: true, min: 4 },
    to_location_photo_url: { type: String, required: false },
});

module.exports = mongoose.model("Ticket", ticketSchema);