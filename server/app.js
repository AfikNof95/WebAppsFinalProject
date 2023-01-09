const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");

require("dotenv").config({ path: path.join(__dirname, "./.env") });

const PORT = process.env.PORT || 2308;
const app = express();
const errorHandler = require("./middlewares/errorHandler");
// Try to connect mongo
try {
  console.log("\nTrying to connect to mongoDB");
  mongoose.connect(process.env.MONGOURI, (err) => {
    if (err) throw err;
  });
  console.log("MongoDB connected successfully");
} catch (ex) {
  console.error(ex.message);
  console.log(ex.stack);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(mongoSanitize());

app.use(logger("combined"));
app.use("/", require("./routes/index"));
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send(createError(404));
});

app.listen(PORT, () => {
  console.log(`\nServer is listening on port: ${PORT} \n`);
});

module.exports = app;
