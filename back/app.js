const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRoutes = require("./routes/users-routes");
const vacationsRoutes = require("./routes/vacations-routes");
const cartRoutes = require("./routes/cart-routes");
const adminRoutes = require("./routes/admin-routes");
const socket = require("socket.io");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); 
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.use("/main", usersRoutes);
app.use("/vacations", vacationsRoutes);
app.use("/cart", cartRoutes);
app.use("/panelAdmin", adminRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qk4ej.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connect to database!");
  })
  .catch((err) => {
    console.log("connection faild!");
    console.log(err.massage);
  });

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH"],
  },
});

io.on("connection", (socket) => {
  console.log("socket connection succesful");
  socket.on('add', data => socket.broadcast.emit('add', data));
  socket.on('update', data => socket.broadcast.emit('update', data));
  socket.on('delete', data => socket.broadcast.emit('delete', data));
});
