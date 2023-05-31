const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const ticketRouter = require("./routes/ticket");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRouter);
app.use(ticketRouter);

mongoose
  .connect(
    process.env.MONGO_CONNECT
  )
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.listen(process.env.PORT, () => {
  console.log("Your app is alive!!!!!");
});