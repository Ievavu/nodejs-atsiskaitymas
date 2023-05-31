const TicketModel = require("../models/ticket");
const UserModel = require("../models/user");
const uniqid = require("uniqid");


module.exports.ADD_TICKET = async (req, res) => {
    try {
        const ticket = new TicketModel({
            id: uniqid(),
            title: req.body.title,
            ticket_price: req.body.ticket_price,
            from_location: req.body.from_location,
            to_location: req.body.to_location,
            to_location_photo_url: req.body.to_location_photo_url,
        });
        await ticket.save();
        res.status(200).json({ response: "Ticket added successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ response: "Error adding ticket" });
    }
};

module.exports.BUY_TICKET = async (req, res) => {
    try {
        const user_data = await UserModel.findOne({ id: req.body.user_id });
        const ticket_data = await TicketModel.findOne({ id: req.body.ticket_id});
        if(user_data.money_balance - ticket_data.ticket_price > 0) {
            UserModel.updateOne({ id: user_data.id }, { $push: { bought_tickets: req.body.ticket_id } }).exec();
            res.status(200).json({ response: "Ticket added successfully" });
        } else {
            res.status(400).json({ response: "Not enought money" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ response: "Error adding ticket" });
    }
};
