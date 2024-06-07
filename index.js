require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./src/routes/user");
const adminRouter = require("./src/routes/admin");
const cors = require("cors");
const path = require("path");
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.listen(4001, () => {
  console.log(`Server Started at ${4001}`);
});
