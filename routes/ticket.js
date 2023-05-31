const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { BUY_TICKET, ADD_TICKET } = require("../controllers/ticket");

router.post("/buyTicket", authMiddleware, BUY_TICKET);
router.post("/addTicket", ADD_TICKET);

module.exports = router;