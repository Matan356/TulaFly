const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRoutes = require("./routes/users-routes");
const vacationsRoutes = require("./routes/vacations-routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/users',usersRoutes);
app.use('/vacations',vacationsRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qk4ej.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log("connect to database!");
  })
  .catch((err) => {
    console.log("connection faild!");
    console.log(err);
  });
